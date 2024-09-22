import { CContainer, CRow, CCol } from '@coreui/react';
import { Spin } from 'antd';

const PageLoader = () => {
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer fluid>
        <CRow className="justify-content-center text-center">
          <CCol>
            <Spin size="large" />
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};
export default PageLoader;
