import { CTable, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react';

interface TableProps {
  headers: Header[];
  children: JSX.Element;
}

interface Header {
  title: string;
}

const index = ({ headers, children }: TableProps) => {
  return (
    <CTable hover>
      <CTableHead>
        <CTableRow>
          {headers.map((header) => (
            <CTableHeaderCell scope="col" key={header.title}>
              {header.title}
            </CTableHeaderCell>
          ))}
        </CTableRow>
      </CTableHead>
      {children}
    </CTable>
  );
};

export default index;
