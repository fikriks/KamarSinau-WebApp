import React, { useState, useEffect } from "react";
import { WrapperTeacher } from "../../layout/teacher";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";

const ModulePage = () => {
  const [courses, setCourses] = useState([]);

  // Fetch courses when component mounts
  useEffect(() => {
    fetchCourses();
  }, []);

  // Function to fetch courses
  const fetchCourses = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/course-instructors"
      );
      const data = await response.json();

      let courses = data.data.filter((course) => {
        return course.userId === 2;
      })

      let resultCourses = [];

      courses.forEach((course, index) => {
        resultCourses[index] = course.Course;
      })

      setCourses(resultCourses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

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
