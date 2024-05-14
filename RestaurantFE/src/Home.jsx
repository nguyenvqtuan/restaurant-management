import React, { useContext } from "react";
import Slidebar from "./common/Slidebar";
import Topbar from "./common/Topbar";
import Footer from "./common/Footer";
import { AuthContext } from "./App";

const Home = () => {
  const auth = useContext(AuthContext);
  return (
    <div id="wrapper">
      <Slidebar />
      <div id="content">
        <Topbar />
        <div>{JSON.stringify(auth)}</div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
