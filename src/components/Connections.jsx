import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection);
  //   console.log("My connections:",connections);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connection", {
        withCredentials: true,
      });

      dispatch(addConnections(res?.data?.data));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0) return <h1>No connections found!!!</h1>;

  return (
    <div className="my-10">
      <h1 className=" text-center text-2xl font-bold mb-20">Connections</h1>
      {connections.map((connection) => {
        const { firstName, secondName, age, about, photoURL, gender } =
          connection;
        const fullName = [firstName, secondName].filter(Boolean).join(" ");
        const ageAndGender = [age, gender].filter(Boolean).join(", ");

        return (
          <ul className="list bg-base-300 rounded-box shadow-md mb-10 w-1/2 mx-auto">
            <li className="list-row">
              <div className="self-center">
                <img
                  className="size-14 rounded-full"
                  alt="Connection Image"
                  src={photoURL}
                />
              </div>
              <div className="flex flex-col justify-center gap-1">
                <div className="font-bold text-xl">{fullName}</div>
                <p>{ageAndGender}</p>
                <p className="list-col-wrap text-sm ">{about}</p>
              </div>
            </li>
          </ul>
        );
      })}
    </div>
  );
};

export default Connections;
