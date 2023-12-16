import React from "react";
import { AuthProvider, RequireAuth } from "react-auth-kit";
import './styles/main.css';
import './styles/responsive.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutUsPage from './pages/AboutUsPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import DasboardPage from "./pages/DasboardPage";
import SdModulesPage from "./pages/SdModulesPage";
import ProfilePage from './pages/ProfilePage';
import ForumPage from "./pages/ForumPage";
import SdModuleDetailPage from "./pages/SdModuleDetailPage";
import UserPage from "./pages/UserPage";
import ModulePage from "./pages/teacher/ModulePage";
import ModuleDetailPage from "./pages/teacher/ModuleDetailPage";
import ProgressPage from "./pages/teacher/ProgressPage";
import ProgressDetailPage from "./pages/teacher/ProgressDetailPage";
import CoursePage from "./pages/student/CoursePage";
import CourseDetailPage from "./pages/student/CourseDetailPage";

const App = () => {
   return (
     <AuthProvider
       authType={"cookie"}
       authName={"_auth"}
       cookieDomain={window.location.hostname}
       cookieSecure={window.location.protocol === "https:"}
     >
       <Routes>
         <Route path="/" exact element={<HomePage />} />
         <Route path="/about" exact element={<AboutUsPage />} />
         <Route path="/forum" element={<ForumPage />} />
         <Route path="/register" element={<RegisterPage />} />
         <Route path="/login" element={<LoginPage />} />
         <Route
           path="/dasboard"
           element={
             <RequireAuth loginPath={"/login"}>
               <DasboardPage />
             </RequireAuth>
           }
         />
         <Route
           path="/profile"
           element={
             <RequireAuth loginPath={"/login"}>
               <ProfilePage />
             </RequireAuth>
           }
         />
         <Route
           path="/users"
           element={
             <RequireAuth loginPath={"/login"}>
               <UserPage />
             </RequireAuth>
           }
         />
         <Route
           path="/modules"
           element={
             <RequireAuth loginPath={"/login"}>
               <ModulePage />
             </RequireAuth>
           }
         />
         <Route
           path="/modules/:id"
           element={
             <RequireAuth loginPath={"/login"}>
               <ModuleDetailPage />
             </RequireAuth>
           }
         />
         <Route
           path="/progress"
           element={
             <RequireAuth loginPath={"/login"}>
               <ProgressPage />
             </RequireAuth>
           }
         />
         <Route
           path="/progress/:id"
           element={
             <RequireAuth loginPath={"/login"}>
               <ProgressDetailPage />
             </RequireAuth>
           }
         />
         <Route
           path="/courses"
           element={
             <RequireAuth loginPath={"/login"}>
               <CoursePage />
             </RequireAuth>
           }
         />
         <Route
           path="/courses/:id"
           element={
             <RequireAuth loginPath={"/login"}>
               <CourseDetailPage />
             </RequireAuth>
           }
         />
         <Route path="/sd/modules" element={<SdModulesPage />} />
         <Route path="/sd/module/:moduleId" element={<SdModuleDetailPage />} />
       </Routes>
     </AuthProvider>
   );
  }

export default App;
