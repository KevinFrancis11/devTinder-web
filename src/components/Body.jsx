import { Outlet, useLocation, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { useEffect, useState } from "react";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    if (userData) {
      return;
    }
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });

      dispatch(addUser(res.data));
    } catch (err) {
      if (err?.response?.status === 401) {
        dispatch(removeUser());
        navigate("/login", { replace: true });
      } else {
        console.log(
          "Error fetching user: ",
          err?.response?.data?.message || err.message,
        );
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // useEffect(() => {
  //   // Don't fetch the profile on public authentication pages
  //   if (["/login", "/signup"].includes(location.pathname)) {
  //     return;
  //   }

  //   // Skip the request if the user is already in Redux
  //   if (userData) {
  //     return;
  //   }

  //   let cancelled = false;

  //   const fetchUser = async () => {
  //     try {
  //       const res = await axios.get(BASE_URL + "/profile/view", {
  //         withCredentials: true,
  //       });

  //       if (!cancelled) {
  //         dispatch(addUser(res.data));
  //       }
  //     } catch (err) {
  //       if(cancelled) return;

  //       if (err.response?.status === 401) {
  //         dispatch(removeUser());
  //         navigate("/login", { replace: true });
  //         return;
  //       }

  //       console.error(
  //         "Error fetching user:",
  //         err.response?.data?.message || err.message,
  //       );
  //     }
  //   };

  //   fetchUser();
  //   return()=>{
  //     cancelled = true;
  //   }
  // }, [location.pathname, userData, dispatch, navigate]);

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Body;
