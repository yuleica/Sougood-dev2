import React, { useState, useEffect} from 'react';
import { Form, Container, Row} from 'react-bootstrap';
import { getCategories } from '../../../lib/categories';
import Category from '../../../types/category';
import Subcategory from '../../../types/subcategory';
import { CreateProduct } from '../../../types/product';
import { PRIORITY_VALUES } from '../../../config/constants';
import { addProduct } from '../../../lib/product';
import { useUserContext } from '../../../contexts/userContext';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { uploadImage } from '../../../lib/images';

const Input = styled('input')({
  display: 'none',
});

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffff'
    }
  }
});

interface ICategory extends Category {
  subcategories: Subcategory[];
}

const AddProduct = () => {
  const defaultProduct = {
    "name": "",
    "description": "",
    "category": "",
    "subcategory": "",
    "seller": "",
    "price": 0,
    "stock": 0,
    "size": "small",
    "tags": []
  };
  
  const { token } = useUserContext();
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [product, setProduct] = useState<CreateProduct>(defaultProduct);
  const [image, setImage] = useState<File>();

  useEffect(() => {
    if (categories.length > 0) setSubcategories(getSubcategory(product.category));
  }, [product, categories]);

  useEffect(() => {
    getCategories()
      .then(cats => {
        setCategories(cats); 
        setProduct({
          ...product,
          category: cats[0]._id, 
          subcategory: cats[0].subcategories[0]._id
        });
      }).catch(e => setError(true));
  }, []);

  
  const getSubcategory = (categoryId: string): Subcategory[] => {
    let currCategory: ICategory = categories[0];
    categories.forEach(((category: ICategory) => {
      if (categoryId == category._id) currCategory = category;
    }))
    return categories[categories.indexOf(currCategory)].subcategories;
  }
  
  const handleOnChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const images = event.target.files;
    if (images) setImage(images[0]);
  }

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({...product, [event.target.name]: event.target.value});
  }

  const handleSubmit = () => {
    if (image) {
      uploadImage(image)
        .then(imageUrl => {console.log(imageUrl);addProduct(product, token, imageUrl);})
        .then(response => {
          setError(false);
          setSuccess(true);
          setProduct(defaultProduct);
          window.scrollTo(0,0);
        })
        .catch((error) => {
          setSuccess(false);
          setError(true);
          window.scrollTo(0,0);
        });
    }
    else setError(true);
  }
  
  return (
    <Container fluid>
      <Row xl={3} lg={2} md={2}>
        <Form className={`border p-4 m-5 mx-auto`} onSubmit={(e: React.ChangeEvent<HTMLFormElement>) => {e.preventDefault();handleSubmit();}}>
            <h1 className='text-center m-3'>Crear Producto</h1>
            { error && <div className="alert alert-danger" role="alert"> Datos del producto inválidos</div>}
            { success && <div className="alert alert-success">Producto añadido exitósamente</div>}
            <div className='mt-2'>
              <Form.Label>Nombre</Form.Label>
              <Form.Control name="name" onChange={(e: any) => handleOnChange(e)} type="text" required={true} value={product.name}/>
            </div>

            <div className='mt-2'>
              <Form.Label>Descripción</Form.Label>
              <Form.Control name="description" onChange={(e: any) => handleOnChange(e)} type="text" required={true} value={product.description}/>
            </div>

            <div className='mt-2'>
              <Form.Label>Precio</Form.Label>
              <Form.Control name="price" onChange={(e: any) => handleOnChange(e)} type="number" placeholder="5000" required={true} value={product.price}/>
            </div>

            <div className='mt-2'>
              <Form.Label>Stock</Form.Label>
              <Form.Control name="stock" onChange={(e: any) => handleOnChange(e)} type="number" placeholder="10" required={true} value={product.stock}/>
            </div>

            <div className='mt-2'>
              <Form.Label>Mail Proveedor</Form.Label>
              <Form.Control name="seller" onChange={(e: any) => handleOnChange(e)} type="email" placeholder="proveedor@gmail.com" required={true} value={product.seller}/>
            </div>

            <div className='mt-2'>
              <Form.Label>Categoría</Form.Label>
              <Form.Select name="category" onChange={(e: any) => handleOnChange(e)} required={true}>
                {categories.map((category, index) => <option key={index} value={category._id}>{category.name}</option>)}
              </Form.Select>
            </div>

            <div className='mt-2'>
              <Form.Label>Subcategoría</Form.Label>
              <Form.Select name="subcategory" onChange={(e: any) => handleOnChange(e)} required={true}>
                {subcategories && subcategories.map((subcategory, index) => <option key={index} value={subcategory._id}>{subcategory.name}</option>)}
              </Form.Select>
            </div>

            <div className='mt-2'>
              <Form.Label>Relevancia en el catálogo</Form.Label>
              <Form.Select name="size" onChange={(e: any) => handleOnChange(e)} required={true}>
                {PRIORITY_VALUES && PRIORITY_VALUES.map((size, index) => <option key={index} value={size.value}>{size.priority}</option>)}
              </Form.Select>
            </div>

            <div className='mt-2 align-items-center'>
              <Form.Label>Imagen del producto:</Form.Label>
              <label htmlFor="contained-button-file">
                <Input onChange={handleOnChangeImage} accept="image/*" id="contained-button-file" multiple type="file" />
                <ThemeProvider theme={theme}>
                  <Button color="primary" variant="contained" component="span">
                    Upload
                  </Button>
                  <span>{image && image.name}</span>
                </ThemeProvider>
              </label>
            </div>

          <div className={`text-center mt-3`}>
            <button className={`btn btn-outline-success`}style={{marginTop: 10}} type="submit">
              Añadir producto
            </button>
          </div>
        </Form>
      </Row>
    </Container>
  );
}

export default AddProduct;