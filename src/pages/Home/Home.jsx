import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Api from "../../AxiosInterceptor";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import Swal from "sweetalert2";

export default function Home() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [isEdit, setisEdit] = useState(false);
  const [isView, setisView] = useState(false);
  const [isAdd, setisAdd] = useState(false);
  const [userId, setuserId] = useState(null);
  const [email, setemail] = useState("");
  const [name, setname] = useState("");
  const [age, setage] = useState("");

  const fetchUserList = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Authentication token not found.");
        return;
      }
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const userList = await Api.get("/user/list-user", { headers });

      if (userList.status == 200) {
        setUsers(userList.data.data);
      }
    } catch (error) {
      console.log("error while log in ;", error);
      if (error.response) {
        const errorMessage = error.response.data?.message;
        if (error.response.status === 403) {
          navigate("/");
        }
        toast.error(errorMessage);
      } else if (error.request) {
        toast.error("Network error. Please try again.");
      } else {
        toast.error("Error occurred while making the request.");
      }
    }
  };
  const handleDeleteClick = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(id);
      }
    });
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Authentication token not found.");
        return;
      }
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const userDel = await Api.delete(`/user/delete-user/${id}`, {
        headers,
      });

      if (userDel.status == 200) {
        toast.success(userDel.data.message);
        fetchUserList();
      }
    } catch (error) {
      console.log("error while delete user ;", error);
      if (error.response) {
        const errorMessage = error.response.data?.message;
        if (error.response.status === 403) {
          navigate("/");
        }
        toast.error(errorMessage);
      } else if (error.request) {
        toast.error("Network error. Please try again.");
      } else {
        toast.error("Error occurred while making the request.");
      }
    }
  };

  const handleView = async (id) => {
    setisEdit(false);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Authentication token not found.");
        return;
      }
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const userList = await Api.get(`/user/get-user/${id}`, { headers });

      if (userList.status == 200) {
        setemail(userList.data.data.email);
        setname(userList.data.data.name);
        setage(userList.data.data.age);
        setisView(!isView);
      }
    } catch (error) {
      console.log("error while log in ;", error);
      if (error.response) {
        const errorMessage = error.response.data?.message;
        if (error.response.status === 403) {
          navigate("/");
        }
        toast.error(errorMessage);
      } else if (error.request) {
        toast.error("Network error. Please try again.");
      } else {
        toast.error("Error occurred while making the request.");
      }
    }
  };

  const handleUpdate = async (id) => {
    handleView(id);
    setuserId(id);
    setisEdit(!isEdit);
  };
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Authentication token not found.");
        return;
      }
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      let updatedData = {
        email,
        age,
        name,
      };
      const userUpd = await Api.put(`user/update-user/${userId}`, updatedData, {
        headers,
      });

      if (userUpd.status == 200) {
        toast.success(userUpd.data.message);
        fetchUserList();
      }
    } catch (error) {
      console.log("error while update user ;", error);
      if (error.response) {
        const errorMessage = error.response.data?.message;
        if (error.response.status === 403) {
          navigate("/");
        }
        toast.error(errorMessage);
      } else if (error.request) {
        toast.error("Network error. Please try again.");
      } else {
        toast.error("Error occurred while making the request.");
      }
    }
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to log out",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        navigate("/");
      }
    });
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-end pe-5 mt-4">
        <button
          onClick={handleLogout}
          type="button"
          className="btn btn-outline-danger btn-sm"
        >
          Logout
        </button>
      </div>
      <ToastContainer />
      <div className="row p-5">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Sl.No</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Age</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th scope="row">{user.slNo}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>
                  <span
                    onClick={() => {
                      window.location.hash = "#viewArea";
                    }}
                  >
                    <i
                      className="fa-solid fa-trash-can me-4"
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content="Delete user"
                      onClick={() => handleDeleteClick(user._id)}
                    ></i>
                    <i
                      className="fa-solid fa-eye me-4"
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content="View user"
                      onClick={() => handleView(user._id)}
                    ></i>
                    <i
                      className="fa-solid fa-pen"
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content="Update user"
                      onClick={() => handleUpdate(user._id)}
                    ></i>
                  </span>
                  <Tooltip id="my-tooltip" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isEdit || isView || isAdd ? (
        <div className="row" id="viewArea">
          <ToastContainer />
          <div className="container ">
            <div className="row ">
              <div className="col-sm-3"></div>
              <div className="col-sm-6 mb-4">
                <form className="shadow p-5">
                  <div className="mb-3">
                    <label
                      htmlFor="exampleInputname1"
                      className="form-label fw-bold"
                    >
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
                    <label
                      htmlFor="exampleInputEmail1"
                      className="form-label fw-bold"
                    >
                      Email address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      onChange={(e) => {
                        setemail(e.target.value);
                      }}
                      value={email}
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleInputage1"
                      className="form-label fw-bold"
                    >
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
                  {isEdit ? (
                    <button
                      onClick={(e) => {
                        handleUpdateSubmit(e);
                      }}
                      type="submit"
                      className="btn btn-primary w-100 mt-5"
                    >
                      Update
                    </button>
                  ) : null}
                </form>
              </div>
              <div className="col-sm-3"></div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
