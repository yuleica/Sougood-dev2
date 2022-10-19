import React, {useEffect} from 'react'
import { NavDropdown } from 'react-bootstrap';
import Category from '../../../types/category';
import Subcategory from '../../../types/subcategory';

interface Props {
    category: Category,
    subcategories: Subcategory[],
    componentStyle: string,
}

function CategoryItem({ category, subcategories, componentStyle }: Props) {

  const listSubcategories = subcategories.map((subcategory, index) => <NavDropdown.Item key={index} href={"/catalog/category/" + subcategory.name}>{subcategory.name}</NavDropdown.Item>);
   
  return (
    <NavDropdown title={<span className={componentStyle}>{category.name}</span>}>
        {listSubcategories}
    </NavDropdown>
  )
}

export default CategoryItem
