import Subcategory from "./subcategory";

export default interface Category {
  _id: string;
  name: string;
  subcategories: Subcategory[];
};