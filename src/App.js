import React from "react";
import { AuthProvider, RequireAuth } from "react-auth-kit";
import './styles/main.css';
import './styles/responsive.css';
import 'bootstrap/dist/css/bootstrap.min.css';
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
           <Route path="/sd/modules" element={<SdModulesPage />} />
           <Route
             path="/sd/module/:moduleId"
             element={<SdModuleDetailPage />}
           />
         </Routes>
       </AuthProvider>
     );
  }

export default App;
