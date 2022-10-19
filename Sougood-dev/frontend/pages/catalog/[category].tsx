import type { ReactElement } from "react";
import { useRouter } from 'next/router';
import CatalogLayout from '../../components/catalog/catalogLayout';

const CategoryCatalog = (): ReactElement => {
  const router = useRouter();
  const category= router.query.category as string;

  return <CatalogLayout category={category} />
}

export default CategoryCatalog;
