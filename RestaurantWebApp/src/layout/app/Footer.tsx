import { CFooter, CLink } from '@coreui/react';

const Footer = () => {
  return (
    <CFooter>
      <div>
        Restaurant admin
        <span> &copy; 2024 creativeLabs.</span>
      </div>
      <div>
        <span>Powered by </span>
        <CLink href="#">TuanNVQ</CLink>
      </div>
    </CFooter>
  );
};

export default Footer;
