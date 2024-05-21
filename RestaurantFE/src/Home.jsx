import React, { useContext } from "react";
import Slidebar from "./component/common/Slidebar";
import Topbar from "./component/common/Topbar";
import Footer from "./component/common/Footer";
import { AuthContext } from "./App";

const Home = () => {
  const { auth, setAuth } = useContext(AuthContext);

  return (
    <div id="wrapper">
      <Slidebar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Topbar />
          <div>{auth.userName}</div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Home;
