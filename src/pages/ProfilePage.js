import React from 'react';
import { useAuthUser } from "react-auth-kit";
import { AdminProfile } from './admin/Profile';

const ProfilePage = () => {
    const auth = useAuthUser();

    if (auth().role === "admin") {
      return <AdminProfile />;
    } else if (auth().role === "teacher") {
      return <h1>Guru</h1>;
    } else {
      return <h1>Siswa</h1>;
    }
}

export default ProfilePage;
