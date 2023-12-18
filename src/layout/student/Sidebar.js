import React, { useState, useEffect } from "react";
import {useSignOut} from "react-auth-kit";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import userPic from "../../assets/images/profile.png";
import { FaUserAlt, FaHome } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import { useAuthUser } from "react-auth-kit";
import { MdOutlineForum } from 'react-icons/md';
const apiUrl = process.env.REACT_APP_API_BASE_URL;

const Sidebar = () => {
  const [user, setUser] = useState([]);
  const auth = useAuthUser();
  const signOut = useSignOut();

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line
  }, []);

  const fetchUser = async () => {
    try {
      const response = await fetch(`${apiUrl}/users/teacher/${auth().level}`);
      const data = await response.json(); 
      setUser(data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

    return (
      <>
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
          <a
            href={"https://wa.me/" + user.phoneNumber}
            target="_blank"
            rel="noreferrer"
            className="nav-link-forum fw-bold"
          >
            <MdOutlineForum className="ms-3 me-3" />
            FAQ
          </a>
          <Link to="/courses" className="nav-link-dasboard fw-bold">
            <RiAdminFill className="ms-3 me-3" />
            Kursus
          </Link>
          <Link onClick={() => signOut()} className="nav-link-dasboard fw-bold">
            <FiLogOut className="ms-3 me-3" />
            Log Out
          </Link>
        </Nav>
      </>
    );
}

export default Sidebar;
