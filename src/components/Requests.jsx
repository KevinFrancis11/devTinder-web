import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);
  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true },
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.log(err.message.status);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/recieved", {
        withCredentials: true,
      });
      dispatch(addRequest(res?.data?.connectionRequests || []));
    } catch (err) {
      if (err.response?.status === 404) {
        //No connection requests found
        dispatch(addRequest([]));
      } else {
        console.log("Error fetching requests: ", err.message);
      }
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0)
    return (
      <h1 className="flex justify-center my-10">
        No Connection Requests found!!!
      </h1>
    );

  return (
    <div className="my-10">
      <h1 className=" text-center text-2xl font-bold mb-20">
        Connection Requests
      </h1>
      {requests.map((request) => {
        const { _id, firstName, secondName, age, about, photoURL, gender } =
          request.fromUserId;
        const fullName = [firstName, secondName].filter(Boolean).join(" ");
        const ageAndGender = [age, gender].filter(Boolean).join(", ");

        return (
          <ul
            key={_id}
            className="list bg-base-300 rounded-box shadow-md mb-10 w-1/2 mx-auto"
          >
            <li className="flex-col items-center list-row">
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
              <div className="card-actions justify-center my-4 gap-8">
                <div
                  className="tooltip tooltip-left tooltip-error custom-tooltip"
                  data-tip="Reject"
                >
                  <button
                    className="btn btn-primary"
                    onClick={() => reviewRequest("rejected", request._id)}
                  >
                    ❌
                  </button>
                </div>
                <div
                  className="tooltip tooltip-right tooltip-success custom-tooltip"
                  data-tip="Accept"
                >
                  <button
                    className="btn btn-primary"
                    onClick={() => reviewRequest("accepted", request._id)}
                  >
                    💚
                  </button>
                </div>
              </div>
            </li>
          </ul>
        );
      })}
    </div>
  );
};

export default Requests;
