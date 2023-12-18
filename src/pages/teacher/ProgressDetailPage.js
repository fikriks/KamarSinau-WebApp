import React, { useState, useEffect, useCallback } from "react";
import { WrapperTeacher } from "../../layout/teacher";
import DataTable from "react-data-table-component";
import { useParams } from "react-router-dom";
const apiUrl = process.env.REACT_APP_API_BASE_URL;

const ModuleDetailPage = () => {
    const { id } = useParams();
    const [students, setStudents] = useState([]);

     const fetchStudents = useCallback(async () => {
       try {
         const response = await fetch(
           `${apiUrl}/progress/course/${id}`
         );
         const data = await response.json();

          let resultStudents = [];

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
      fetchStudents();
      // eslint-disable-next-line
    }, []);

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
