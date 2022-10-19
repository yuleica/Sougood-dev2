import React, { useEffect, useRef, useState, useCallback } from 'react';
import styles from '../../assets/styles/components/productCard.module.css';
import Image from 'next/image';
import Router from 'next/router';
import { Row, Col } from 'react-bootstrap';
import Product from '../../types/product';
import { AdvancedImage } from '@cloudinary/react';
import { CloudinaryImage } from '@cloudinary/url-gen';
import { CloudService } from "../../config/config";
import { scale } from '@cloudinary/url-gen/actions/resize';

interface ProductCardProps {
  product: Product;
  showDetails: (product: Product) => void,
};

const ProductCard: React.FC<ProductCardProps> = (props: ProductCardProps) => {
  const [product, setProduct] = useState<Product>();
  const [image, setImage] = useState<CloudinaryImage>();
  const imageRef = useRef<HTMLInputElement>(null);
  const defaultImage = "image-default.png";

  useEffect(() => {
    setProduct(props.product);
  }, [props.product, props.product.imageUrl]);

  useEffect(() => {
    if (!product || !imageRef) return;
    if (product.imageUrl && imageRef.current) {
      const newImage = CloudService.image(props.product.imageUrl);
      newImage.resize(
        scale()
        .width(imageRef.current.clientWidth)
        .height(imageRef.current.clientHeight)
      );
      setImage(newImage);
    }
  }, [product]);

  const styleOptions = {
    'small': styles.small,
    'medium': styles.medium,
    'large': styles.large,
  };

  const showDetails = () => {
    if (product) props.showDetails(product);
  };

  return (
    <>
    { product &&
      <div className={styles.productCard + " " + styleOptions[product.size as keyof typeof styleOptions]} onClick={showDetails}>
        <div ref={imageRef ? imageRef : null} className={styles.productCardImageContainer}>
          {
            image ? <AdvancedImage className={styles.productCardImage} cldImg={image} /> :
            <Image src={require('../../assets/images/' + defaultImage)} className={styles.productCardImage} layout="fill" /> 
          }  
        </div>
        <Row>
          <Col className={styles.productName + " " + styles.productText}><span>{product.name}</span></Col>
          <Col className={styles.productCategory + " " + styles.productText} onClick={(e) => { e.stopPropagation(); Router.push('/catalog/' + product.category.name) }}><span>{product.category.name}</span></Col>
        </Row>

        <div className={styles.productCardTags + " " + styles.productText}>
          {product.tags.length > 0 && product.tags.reduce((prevTag, currTag) => "#" + prevTag + " #" + currTag)}
        </div>
      </div>
    }
    </>
  );
}

export default ProductCard;
