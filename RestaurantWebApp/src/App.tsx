// import React, { useEffect, useState, Suspense } from 'react';
// import { Router as RouterHistory } from "react-router-dom";
// import { Button, Result } from 'antd';
// import { Provider } from "react-redux";
// import Router from "@router";
// import Login from "@/pages/Login";

import { Provider } from "react-redux";
// import { Layout } from "antd";
import Router from "./router";
// import AuthRouter from "@/router/AuthRouter";
import store from "@/redux/store";

const App = () =>{
  return (
    <Provider store={store}>
        <Router />
    </Provider>
  )
}

export default App
