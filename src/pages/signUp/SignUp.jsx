/** @format */


import logo from "../../assets/logo.png";
// import "../login/login.css";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

function SignUp() {

    const {register , handleSubmit , formState:{errors} ,watch} = useForm()
    const password = watch("password"); // Watch the password field
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
                  {/* <h2 className="text-center  text-black mt-4">Project</h2> */}
                </div>
              </div>
              <div className="card-body p-4 p-sm-5">
                <h3 className="card-title text-center mb-5 ">Sign Up</h3>
                <form onSubmit={handleSubmit(onSubmit)}>

                  <div className="form-floating mb-3">
                    <input
                     type="text"
                      className="form-control"
                      id="floatingInputUserName"
                      placeholder="name"
                      name="name"
                      {...register ("name",{required: true ,minLength:3, pattern:/^[A-Za-z]+$/i })}
                    />
                    <label>User name</label>
                  </div>
                  {errors.name?.type==="required" && <p className=" text-danger">This field is required</p>}
                  {errors.name?.type==="minLength" && <p className=" text-danger">Three letters min</p>}
                  {errors.name?.type==="pattern" && <p className=" text-danger">Letters only</p>}
                  


                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingInputEmail"
                      placeholder="name@example.com"
                     name="email" 

                      {...register ("email",{required: true ,pattern:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i})}
                      
                    />
                    <label >Email address</label>
                  </div>
                  {errors.email?.type==="required" && <p className=" text-danger">This field is required</p>}
                  {errors.email?.type==="pattern" && <p className=" text-danger">Invalid email</p>}

                  <hr />

                  <div className="form-floating mb-3">
        <input
          type="password"
          className="form-control"
          id="floatingPassword"
          placeholder="Password"
          name="password"
          {...register("password", { required: true, minLength: 8 })}
        />
        <label>Password</label>
      </div>
      {errors.password?.type === "required" && <p className="text-danger">This field is required</p>}
      {errors.password?.type === "minLength" && <p className="text-danger">8 characters minimum</p>}

      <div className="form-floating mb-3">
        <input
          type="password"
          className="form-control"
          id="floatingConfirmPassword"
          placeholder="Confirm Password"
          name="confirmPassword"
          {...register("confirmPassword", {
            required: true,
            validate: (value) => value === password || "Passwords do not match"
          })}
        />
        <label htmlFor="floatingConfirmPassword">Confirm Password</label>
      </div>
      {errors.confirmPassword?.type === "required" && <p className="text-danger">This field is required</p>}
      {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword.message}</p>}

                 
                    <div className="d-grid mb-2">
                      <button
                        className="btn btn-lg btn-primary btn-login fw-bold text-uppercase"
                        type="submit"
                      >
                        Sign Up
                      </button>
                    </div>
                  

                  <Link to="/login" class="d-block text-black text-center mt-2 small">
                    Have an account? Login
                  </Link>

                  <hr className="my-4" />

                  <div className="d-grid mb-2">
                    <button
                      className="btn btn-lg btn-google btn-login fw-bold text-uppercase d-flex"
                      type="submit"
                    >
                      <FcGoogle className="mx-3 fs-4" /> Sign up with Google
                    </button>
                  </div>

                  <div className="d-grid">
                    <button
                      className="btn btn-lg btn-facebook btn-login fw-bold text-uppercase d-flex"
                      type="submit"
                    >
                      <FaFacebook className="mx-3 fs-4" />
                      Sign up with Facebook
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

export default SignUp;
