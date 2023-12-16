import React from "react";
import { useAuthUser } from "react-auth-kit";
import {AdminDashboard} from "./admin/Dashboard";

const DasboardPage = () => {
  const auth = useAuthUser();
  
  if(auth().role === "admin"){
     return (
       <AdminDashboard />
     );
  }else if(auth().role === "teacher"){
      return <h1>Guru</h1>;
  }else{
      return <h1>Siswa</h1>;
  }
};

export default DasboardPage;
