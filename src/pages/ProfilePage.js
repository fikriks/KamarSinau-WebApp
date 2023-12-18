import React from 'react';
import { useAuthUser } from "react-auth-kit";
import { AdminProfile } from './admin/Profile';
import { TeacherProfile } from './teacher/Profile';
import { StudentProfile } from './student/Profile';

const ProfilePage = () => {
    const auth = useAuthUser();

    if (auth().role === "admin") {
      return <AdminProfile />;
    } else if (auth().role === "pengajar") {
      return <TeacherProfile />;
    } else {
      return <StudentProfile />;
    }
}

export default ProfilePage;
