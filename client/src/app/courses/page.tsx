"use client";
import BodyLayout from "../components/BodyLayout";
import getCourses from "../api/getCourses";
import { setCoursesData } from "@/app/redux/coursesData";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const CoursesPage: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getCoursesData = async () => {
      try {
        const response = await getCourses("");
        dispatch(setCoursesData(response || []));
      } catch (err) {
        console.error(err);
      }
    };
    getCoursesData();
  }, []);

  return <BodyLayout />;
};

export default CoursesPage;
