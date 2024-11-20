import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import Api from "../../AxiosInterceptor";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setname] = useState("");
  const [age, setage] = useState("");
  const [isLogin, setisLogin] = useState(true);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const loginRes = await Api.post("/auth/user-login", {
        email,
        password: pass,
      });

      if (loginRes.status == 200) {
        localStorage.setItem("token", loginRes.data.data.accessToken);
        navigate("/home");
      }
    } catch (error) {
      console.log("error while log in ;", error);
      if (error.response) {
        const errorMessage = error.response.data?.message;
        toast.error(errorMessage);
      } else if (error.request) {
        toast.error("Network error. Please try again.");
      } else {
        toast.error("Error occurred while making the request.");
      }
    }
  };

  const handleSignup = async (event) => {
    try {
      const signupRes = await Api.post("/user/add-user", {
        email,
        password: pass,
        age,
        name,
      });

      if (signupRes.status == 201) {
        toast.success(signupRes.data.message);
        window.location.reload();
      }
    } catch (error) {
      console.log("error while log in ;", error);
      if (error.response) {
        const errorMessage = error.response.data?.message;
        toast.error(errorMessage);
      } else if (error.request) {
        toast.error("Network error. Please try again.");
      } else {
        toast.error("Error occurred while making the request.");
      }
    }
  };

  return (
    <>
      {" "}
      <ToastContainer />
      <div className="container ">
        <div className="row ">
          <div className="col-sm-2 col-md-3 col-lg-4  "></div>
          <div className="col-sm-8 col-md-6 col-lg-4  pt-5">
            <form className="shadow p-5 mt-5">
              {!isLogin ? (
                <>
                  <div className="mb-3">
                    <label htmlFor="exampleInputname1" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputname1"
                      onChange={(e) => {
                        setname(e.target.value);
                      }}
                      value={name}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputage1" className="form-label">
                      Age
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputage1"
                      aria-describedby="ageHelp"
                      onChange={(e) => {
                        setage(e.target.value);
                      }}
                      value={age}
                    />
                  </div>
                </>
              ) : null}
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  value={email}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  onChange={(e) => {
                    setPass(e.target.value);
                  }}
                  value={pass}
                />
              </div>
              {isLogin ? (
                <>
                  <button
                    onClick={(e) => {
                      handleLogin(e);
                    }}
                    type="submit"
                    className="btn btn-primary w-100 mt-5"
                  >
                    Login
                  </button>
                  <p className="mt-3 text-center">
                    Not a user !{" "}
                    <span
                      onClick={() => {
                        setisLogin(false);
                      }}
                      className="text-primary"
                    >
                      signup
                    </span>
                  </p>
                </>
              ) : (
                <button
                  onClick={(e) => {
                    handleSignup(e);
                  }}
                  type="submit"
                  className="btn btn-primary w-100 mt-5"
                >
                  Signup
                </button>
              )}
            </form>
          </div>
          <div className="col-sm-2 col-md-3 col-lg-4 "></div>
        </div>
      </div>
    </>
  );
}
