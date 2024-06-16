import "@/assets/app/index.css";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useForm } from "react-hook-form";
import ILogin from "./type/Login.type";
import { Link } from "react-router-dom";
import { login } from "@/redux/slicers/userSlice";
import { useAppDispatch } from "@/redux/redux-hook";

function App() {
  const { register, handleSubmit } = useForm<ILogin>({})
  const dispatch = useAppDispatch()
  const onSubmit = (data: ILogin) => {
    // IF login success -> save to local storage
    dispatch(login(data))
  }

  return (
    <MDBContainer fluid>
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol col="12">
          <MDBCard
            className="bg-dark text-white my-5 mx-auto"
            style={{ borderRadius: "1rem", maxWidth: "400px" }}
          >
            <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
              <h2 className="fw-bold mb-2 text-uppercase">
                Login
              </h2>
              <p className="text-white-50 mb-5">
                Please enter your login and password!
              </p>
              <form
                className="w-100"
                onSubmit={handleSubmit(onSubmit)}
              >
                <MDBInput
                  wrapperClass="mb-4 mx-1 w-100"
                  labelClass="text-white"
                  label="User name"
                  id="userName"
                  type="text"
                  size="lg"
                  {...register("userName", {
                    required: true
                  })}
                />
                <MDBInput
                  wrapperClass="mb-4 mx-1 w-100"
                  labelClass="text-white"
                  label="Password"
                  id="password"
                  type="password"
                  size="lg"
                  {...register("password", {
                    required: true
                  })}
                />

                <p className="small mb-3 pb-lg-2">
                  <a className="text-white-50" href="#!">
                    Forgot password?
                  </a>
                </p>
                <MDBBtn outline className="mx-1 px-5" color="white" size="lg">
                  Login
                </MDBBtn>
              </form>
              <div className="d-flex flex-row mt-3 mb-5">
                <MDBBtn
                  tag="a"
                  color="none"
                  className="m-3"
                  style={{ color: "white" }}
                >
                  <MDBIcon fab icon="facebook-f" size="lg" />
                </MDBBtn>

                <MDBBtn
                  tag="a"
                  color="none"
                  className="m-3"
                  style={{ color: "white" }}
                >
                  <MDBIcon fab icon="twitter" size="lg" />
                </MDBBtn>

                <MDBBtn
                  tag="a"
                  color="none"
                  className="m-3"
                  style={{ color: "white" }}
                >
                  <MDBIcon fab icon="google" size="lg" />
                </MDBBtn>
              </div>

              <div>
                <p className="mb-0">
                  Don't have an account?{" "}
                  <Link to="/signup" className="text-white-50 fw-bold">
                    Sign Up
                  </Link>
                </p>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default App;
