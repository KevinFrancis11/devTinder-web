import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = (user) => {
  const [firstName, setFirstName] = useState(user?.user?.firstName);
  const [secondName, setSecondName] = useState(user?.user?.secondName);
  const [photoURL, setPhotoURL] = useState(user?.user?.photoURL || "");
  const [age, setAge] = useState(user?.user?.age || "");
  const [about, setAbout] = useState(user?.user?.about || "");
  const [gender, setGender] = useState(user?.user?.gender || "");
  const [error, setError] = useState(" ");
  const dispatch = useDispatch();

  const saveProfile = async () => {
    //clear the errors
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          secondName,
          photoURL,
          age,
          about,
          gender,
        },
        { withCredentials: true },
      );

      dispatch(addUser(res?.data?.data));
    } catch (err) {
      setError(err?.response?.data || "Something went wrong!!!");
      console.log(err);
    }
  };

  const handleProfileSave = () => {
    saveProfile();
    notify();
  };

  
  const notify = () => toast("Profile Updated");

  return (
    <div className="flex justify-center my-10">
      <div className=" flex justify-center mx-10">
        <div className="card bg-base-300 w-96 shadow-sm">
          <div className="card-body">
            <h2 className="card-title justify-center text-2xl">Edit Profile</h2>
            <div>
              <fieldset className="fieldset my-3">
                <legend className="fieldset-legend">First Name</legend>
                <input
                  type="text"
                  value={firstName}
                  className="input input-primary"
                  placeholder="First Name"
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

              <fieldset className="fieldset my-3">
                <legend className="fieldset-legend">Age:</legend>
                <input
                  type="text"
                  value={age}
                  className="input input-primary"
                  onChange={(e) => setAge(e.target.value)}
                />
              </fieldset>

              <fieldset className="fieldset my-3">
                <legend className="fieldset-legend">Gender:</legend>
                <select
                  value={gender}
                  className="select select-primary"
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="" disabled>
                    Select gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="others">Others</option>
                </select>
              </fieldset>

              <fieldset className="fieldset my-3">
                <legend className="fieldset-legend">About</legend>
                <textarea
                  value={about}
                  className="textarea textarea-primary h-24 w-full resize-none"
                  placeholder="tell us about yourself"
                  maxLength={300}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </fieldset>

              <fieldset className="fieldset my-3">
                <legend className="fieldset-legend">Photo URL</legend>
                <input
                  type="text"
                  value={photoURL}
                  className="input input-primary"
                  onChange={(e) => setPhotoURL(e.target.value)}
                />
              </fieldset>
            </div>
            <p className="text-red-500">{error}</p>
            <div className="card-actions justify-center">
              <button className="btn btn-primary" onClick={handleProfileSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-20">
        <UserCard
          user={{ firstName, secondName, age, photoURL, gender, about }}
        />
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="dark"
        transition={Bounce}
      />
    </div>
  );
};

export default EditProfile;
