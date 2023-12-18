import React, { useState, useEffect, useCallback } from "react";
import { WrapperTeacher } from "../../layout/teacher";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { useAuthUser } from "react-auth-kit";
const apiUrl = process.env.REACT_APP_API_BASE_URL;

const ModulePage = () => {
  const [courses, setCourses] = useState([]);
  const auth = useAuthUser();

  const fetchCourses = useCallback(async () => {
    try {
      const response = await fetch(
        `${apiUrl}/course-instructors`
      );
      const data = await response.json();

      let courses = data.data.filter((course) => {
        return course.userId === auth().id;
      })

      let resultCourses = [];

      courses.forEach((course, index) => {
        resultCourses[index] = course.Course;
      })

      setCourses(resultCourses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  }, [auth]);
  
  useEffect(() => {
    fetchCourses();
    // eslint-disable-next-line
  }, []);

  const columns = [
    {
      name: "Nama Kursus",
      selector: (row) => row.courseName,
    },
    {
      name: "Deskripsi",
      selector: (row) => row.description,
    },
    {
      name: "Action",
      cell: (row) => (
        <Link
          to={`/modules/${row.id}`}
          className="btn btn-danger text-white"
        >
          Detail
        </Link>
      ),
    },
  ];

  return (
    <WrapperTeacher>
      <div className="col-md-10">
        <div className="dasboard-right">
          <div>
            <h2>Data Kursus</h2>
            <DataTable columns={columns} data={courses} />
          </div>
        </div>
      </div>
    </WrapperTeacher>
  );
};

export default ModulePage;
