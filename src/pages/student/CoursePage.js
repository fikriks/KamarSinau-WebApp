import React, { useState, useEffect, useCallback } from "react";
import { WrapperStudent } from "../../layout/student";
import { useAuthUser } from "react-auth-kit";
import CourseList from "../../components/CourseList";

const CoursePage = () => {
  const [courses, setCourses] = useState([]);
  const auth = useAuthUser();

  const fetchCourses = useCallback(async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/course-students"
      );
      const data = await response.json();

      let courses = data.data.filter((course) => {
        return course.userId === auth().id;
      });

      let resultCourses = [];

      courses.forEach((course, index) => {
        resultCourses[index] = course.Course;
      });

      setCourses(resultCourses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  }, [auth]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return (
    <WrapperStudent>
      <div className="col-md-10">
        <div className="dasboard-right">
          <div>
            <h2>Data Kursus</h2>
            <CourseList Courses={courses} />
          </div>
        </div>
      </div>
    </WrapperStudent>
  );
};

export default CoursePage;
