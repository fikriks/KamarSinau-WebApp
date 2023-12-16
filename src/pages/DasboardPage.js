import React from "react";
import { useAuthUser } from "react-auth-kit";
import {AdminDashboard} from "./admin/Dashboard";
import { TeacherDashboard } from "./teacher/Dashboard";

const DasboardPage = () => {
  const auth = useAuthUser();
  
  if(auth().role === "admin"){
     return (
       <AdminDashboard />
     );
  }else if(auth().role === "pengajar"){
      return (
        <TeacherDashboard/>
      );
  }else{
      return <h1>Siswa</h1>;
  }
};

export default DasboardPage;
