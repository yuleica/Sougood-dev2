import type { ReactElement } from "react";
import { useState, useEffect, useRef } from "react";
import { CloseButton, Row, Col } from 'react-bootstrap';
import { Button } from "../shared/buttons";
import styles from '../../assets/styles/components/productDetails.module.css';
import Image from 'next/image';
import { useCartItemsContext } from '../../contexts/cartContext';
import Product from '../../types/product';
import { cartItemFromProduct } from '../../utils/cart';
import { AdvancedImage } from '@cloudinary/react';
import { CloudinaryImage } from '@cloudinary/url-gen';
import { CloudService } from "../../config/config";
import { scale } from '@cloudinary/url-gen/actions/resize';

export interface ProductDetailsProps {
  handleClose: () => void,
  product: Product,
}

const ProductDetails = (props: ProductDetailsProps): ReactElement => {
  const [product, setProduct] = useState<Product>();
  // const [image, setImage] = useState<string>("image-default.png");
  const [image, setImage] = useState<CloudinaryImage>();
  const defaultImage = "image-default.png";

  useEffect(() => {
    setProduct(props.product);
    //if (props.product.imageUrl) setImage(props.product.imageUrl);
    if (!props.product) return;
    if (props.product.imageUrl ) {
      const newImage = CloudService.image(props.product.imageUrl);
      newImage.resize(
        scale()
        .width(450)
        .height(490)
      );
      setImage(newImage);
    }
  }, [props.product]);

  const { addToCart } = useCartItemsContext();

  const handleAddToCart = () => {
    console.log("Adding prod:", props.product);
    addToCart(cartItemFromProduct(props.product));
  }

  const closeDetails = async () => {
    props.handleClose();
  }

  return (
    <>
    { product && 
      <div onClick={closeDetails} className={styles.detailsBox}>
        <div className={styles.detailsElementsContainer} >
          <CloseButton className={styles.closeButton} onClick={(e) => { e.stopPropagation(); closeDetails(); }}></CloseButton>
          <Row>
            <Col>
              {/* <Image className={styles.productImage} src={require('../../assets/images/' + image)} width="450px" height="490px"></Image> */}
              {
                image ? <AdvancedImage className={styles.productCardImage} cldImg={image} /> :
                <Image src={require('../../assets/images/' + defaultImage)} className={styles.productCardImage} width="450px" height="490px" /> 
              }  
            </Col>
            <Col className={styles.productDetails}>
              <Row><b className={styles.productName}>{product.name}</b></Row>
              <Row className={styles.productDescription}><p>{product.description}</p></Row>
              <Row className={styles.addToCartButtonContainer}><Button onClick={handleAddToCart} text={"Agregar al carrrito"} /></Row>
            </Col>
          </Row>
        </div>
      </div>
    }
    </>
  );
}

export default ProductDetails;
