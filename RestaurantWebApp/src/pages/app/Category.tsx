import { useEffect, useState } from 'react';
import {
  CTableBody,
  CTableDataCell,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';
import Table from '@/components/Table/TableControl';
import TableLoader from '@/components/Table/TableLoader';
import usePrivateApi from '@/hooks/usePrivateApi';
import { ICategoryItem } from './type/Category.type';

const URI_CATEGORY = '/category';

const Category = () => {
  const [categories, setCategories] = useState<ICategoryItem[]>();
  const [loading, setLoading] = useState(true);
  const headers = [
    {
      title: 'No',
    },
    {
      title: 'Name',
    },
    {
      title: 'Description',
    },
  ];

  const getCategory = async () => {
    const data = await usePrivateApi.get(URI_CATEGORY).then((data) => {
      setLoading(false);
      return data;
    });

    setCategories(data.data);
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <Table headers={headers}>
      <CTableBody>
        {loading && <TableLoader colSpan={3} />}
        {!loading &&
          categories?.map((item: ICategoryItem, index: number) => (
            <CTableRow key={item.id}>
              <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
              <CTableDataCell>{item.name}</CTableDataCell>
              <CTableDataCell>{item.description}</CTableDataCell>
            </CTableRow>
          ))}
      </CTableBody>
    </Table>
  );
};

export default Category;
