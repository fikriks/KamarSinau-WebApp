import React, { useState, useEffect, useCallback } from "react";
import { WrapperTeacher } from "../../layout/teacher";
import DataTable from "react-data-table-component";
import { useParams } from "react-router-dom";

const ModuleDetailPage = () => {
    const { id } = useParams();
    const [progressDetail, setProgressDetail] = useState([]);
    const [students, setStudents] = useState([]);
  
     const fetchProgressDetail = useCallback(async () => {
       try {
         const response = await fetch(
           `http://localhost:3000/api/v1/progress/course/${id}/`
         );
         const data = await response.json();
         setProgressDetail(data.data);
       } catch (error) {
         console.error("Error fetching courses:", error);
       }
     }, [id]);

     const fetchStudents = useCallback(async () => {
       try {
         const response = await fetch(
           `http://localhost:3000/api/v1/progress/course/${id}/`
         );
         const data = await response.json();

          let resultStudents = [];
          let countModules = 0;
          let countProgress = 0;

          data.data.forEach((student, index) => {
            resultStudents[index] = {
              user: student.User,
              countModules: student.Course.Modules.length,
              countProgress: student.Course.Progresses.length,
            };
          });

          console.log(resultStudents);
          setStudents(resultStudents);
       } catch (error) {
         console.error("Error fetching students:", error);
       }
     }, [id]);

    useEffect(() => {
    //   fetchProgressDetail();
      fetchStudents();
    }, [fetchStudents]);

  const columns = [
    {
      name: "Nama Siswa",
      selector: (row) => row.user.name,
    },
    {
      name: "Progress",
      cell: (row) => (
        <p>
          Telah mempelajari {row.countProgress} dari {row.countModules} Modul
        </p>
      ),
    },
  ];

  return (
    <WrapperTeacher>
      <div className="col-md-10">
        <div className="dasboard-right">
          <div>
            <h2>Data Progress</h2>
            <DataTable columns={columns} data={students} />
          </div>
        </div>
      </div>
    </WrapperTeacher>
  );
};

export default ModuleDetailPage;
