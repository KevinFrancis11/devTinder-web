import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState(" ");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    try {
      const res = await axios.post(
        BASE_URL + "/login",
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

      // console.log(err?.response?.data?.message);
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          secondName,
          emailId,
          password,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res?.data?.data));
      return navigate("/profile");
    } catch (err) {
      // console.log(err.message);
      setError(err?.response?.data?.message || "Something went wrong!!!");
    }
  };

  return (
    <div className="grow p-4 flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl">
            {isLoginForm ? "Login" : "Sign Up"}
          </h2>
          <div>
            {!isLoginForm && (
              <>
                <fieldset className="fieldset my-3">
                  <legend className="fieldset-legend">First name</legend>
                  <input
                    type="text"
                    value={firstName}
                    className="input input-primary"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset my-3">
                  <legend className="fieldset-legend">Second Name</legend>
                  <input
                    type="text"
                    value={secondName}
                    className="input input-primary"
                    onChange={(e) => setSecondName(e.target.value)}
                  />
                </fieldset>
              </>
            )}
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
            <button
              className="btn btn-primary"
              onClick={isLoginForm ? handleLogin : handleSignUp}
            >
              {isLoginForm ? "Login" : "Sign Up"}
            </button>
          </div>
          <p
            className="flex justify-center text-purple-800 cursor-pointer my-4"
            onClick={() => setIsLoginForm((value) => !value)}
          >
            {isLoginForm
              ? "New user? SignUp here"
              : "Already have an account? Login here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
