import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("kevin@gmail.com");
  const [password, setPassword] = useState("Kevin@123");
  const [error, setError] = useState(" ");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError("");
    try {
      const res = await axios.post(
        BASE_URL+"/login",
        {
          emailId,
          password,
        },
        { withCredentials: true },
      );
 
      dispatch(addUser(res.data.user));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong!!!");
      
      console.log(err?.response?.data?.message);
    }
  };

  return (
    <div className="grow p-4 flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl">Login</h2>
          <div>
            <fieldset className="fieldset my-3">
              <legend className="fieldset-legend">Email ID</legend>
              <input
                type="text"
                value={emailId}
                className="input input-primary"
                placeholder="example@email.com"
                onChange={(e) => setEmailId(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset my-3">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="text"
                value={password}
                className="input input-primary"
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
          </div>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleSubmit}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
