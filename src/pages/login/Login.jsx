/** @format */


import "./login.css";
import logo from "../../assets/logo.png";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
function Login() {

    const {register , handleSubmit , formState:{errors}} = useForm()
    const onSubmit = data => console.log(data)

  return (
    <>
      <section className="container">
        <div className="row">
          <div className="col-lg-10 col-xl-9 mx-auto h-100">
            <div className="card flex-row my-5 border-0 shadow rounded-3 overflow-hidden">
              <div className="card-img-left gradient__bg  d-flex  ">
                <div className="flex justify-center items-center">
                  <img src={logo} className="w-50" />
                  {/* <h2 className="text-center text-black mt-4">Project</h2> */}
                </div>
              </div>
              <div className="card-body p-4 p-sm-5">
                <h3 className="card-title text-center mb-5 ">Login</h3>

                <form onSubmit={handleSubmit(onSubmit)} > 
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInputUserName"
                      placeholder="name"
                      name="name"
                      {...register ("name",{required:true ,minLength:3,pattern: /^[A-Za-z]+$/i })}
                    />
                    <label >User name</label>
                  </div>
                  {errors.name?.type==="required" && <p className=" text-danger">This field is required</p>}
                  {errors.name?.type==="minLength" && <p className=" text-danger">Three letters min</p>}
                  {errors.name?.type==="pattern" && <p className=" text-danger">Letters only</p>}
                  


                  <hr />

                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="floatingPassword"
                      placeholder="Password"
                      name="password"
                      {...register ("password",{required:true , minLength:8}) }
                    />
                    <label>Password</label>
                  </div>
                  {errors.password?.type=="required" && <p className=" text-danger">This field is required</p>}
                  {errors.password?.type=="minLength" && <p className=" text-danger">8 characters minimum</p>}

                  
                    <div className="d-grid mb-2">
                      <button
                        className="btn btn-lg btn-primary btn-login fw-bold text-uppercase"
                        type="submit"
                      >
                        Login
                      </button>
                    </div>
                  
                  <Link
                    to="/signup"
                    className="d-block text-black text-center mt-2 small"
                    href="#"
                  >
                    Don`t have account? Sign Up
                  </Link>

                  <hr className="my-4" />

                  <div className="d-grid mb-2">
                    <button
                      className="btn btn-lg btn-google btn-login fw-bold text-uppercase d-flex"
                      type="submit"
                    >
                      <FcGoogle className="mx-3 fs-4" /> Sign in with Google
                    </button>
                  </div>

                  <div className="d-grid">
                    <button
                      className="btn btn-lg btn-facebook btn-login fw-bold text-uppercase d-flex"
                      type="submit"
                    >
                      <FaFacebook className="mx-3 fs-4" />
                      Sign in with Facebook
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
