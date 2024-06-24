"use client";

import BodyLayout from "../components/BodyLayout";
import getUsersData from "../api/getUsersData";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUsersData } from "@/app/redux/usersData";

const UsersPage: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUsersData({
          condition: "All Users",
          inputValue: "",
        });
        console.log("response111:", response);
        dispatch(setUsersData(response?.data?.message ?? []));
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [dispatch]);

  return <BodyLayout />;
};

export default UsersPage;
