import { Provider } from "react-redux"
import Router from "./router"
import { store } from "@/redux/index"
import { ToastContainer } from 'react-toastify';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

const App = () => {
  return (
    <Provider store={store}>
      <Router />
      <ToastContainer />
    </Provider>
  )
}

export default App
