import React from "react";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import userPic from "../../assets/images/profile.png";
import { FaUserAlt, FaHome } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import { useAuthUser } from "react-auth-kit";

const Sidebar = () => {
  const auth = useAuthUser();

    return (
      <Nav className="flex-column cc">
        <div className="user-dasboard d-flex">
          <div className="img-dasboard">
            <img src={userPic} alt="img-profile" />
          </div>
          <div className="ms-3">
            <h1 className="fw-bold">{auth().name}</h1>
          </div>
        </div>
        <Link to="/dasboard" className="nav-link-dasboard fw-bold">
          <FaHome className="ms-3 me-3" />
          Dashboard
        </Link>
        <Link to="/profile" className="nav-link-dasboard fw-bold">
          <FaUserAlt className="ms-3 me-3" />
          Akun Saya
        </Link>
        <Link to="/users" className="nav-link-dasboard fw-bold">
          <RiAdminFill className="ms-3 me-3" />
          Data Pengguna
        </Link>
        <Link to="/login" className="nav-link-dasboard fw-bold">
          <FiLogOut className="ms-3 me-3" />
          Log Out
        </Link>
      </Nav>
    );
}

export default Sidebar;
