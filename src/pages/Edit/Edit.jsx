import React, { useState } from "react";
import "./edit.css";
import { useNavigate } from "react-router-dom";
import Api from "../../AxiosInterceptor";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");


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

  return (
    <>
      {" "}
      <ToastContainer />
      <div className="container ">
        <div className="row ">
          <div className="col-sm-4"></div>
          <div className="col-sm-4 pt-5">
            <form className="shadow p-5 mt-5">
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
                <div id="emailHelp" className="form-text">
                  We'll never share your email with anyone else.
                </div>
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
              <button
                onClick={(e) => {
                  handleLogin(e);
                }}
                type="submit"
                className="btn btn-primary w-100 mt-5"
              >
                Login
              </button>
            </form>
          </div>
          <div className="col-sm-4"></div>
        </div>
      </div>
    </>
  );
}
