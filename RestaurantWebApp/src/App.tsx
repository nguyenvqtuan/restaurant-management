import { Provider } from "react-redux"
import Router from "./router"
import { store } from "@/redux/index"
import { ToastContainer } from 'react-toastify';
import "@fortawesome/fontawesome-free/css/all.min.css";
import './scss/style.scss'

const App = () => {
  return (
    <Provider store={store}>
      <Router />
      <ToastContainer />
    </Provider>
  )
}

export default App
