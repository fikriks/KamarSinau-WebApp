import React, { useState } from "react";
import { useIsAuthenticated } from "react-auth-kit";
import { Link } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import logo from "../../assets/images/logo.png";

const Header = () => {
  const [show, setShow] = useState(true);
  const isAuthenticated = useIsAuthenticated();

  return (
    <div className="container-fluid">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand text-info" to="/">
            <img
              alt=""
              src={logo}
              width="35"
              className="d-inline-block align-top"
            />{" "}
            <span className="kamar">Kamar</span>
            <span className="sinau">Sinau</span>
          </Link>
          <button
            className="navbar-toggler border border-info text-info"
            onClick={() => {
              setShow(false);
            }}
          >
            {show ? <AiOutlineMenu /> : <AiOutlineClose />}
          </button>
          <div
            className={
              show
                ? "collapse navbar-collapse"
                : "collapse navbar-collapse active"
            }
          >
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link text-light" to="/">
                  HOME
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/about">
                  ABOUT US
                </Link>
              </li>
              {isAuthenticated ? (
                <li className="nav-item">
                  <Link className="nav-link text-light ms-2" to="/dasboard">
                    {" "}
                    DASHBOARD{" "}
                  </Link>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link text-light ms-5" to="/register">
                      REGISTER <span className="ms-2"> | </span>{" "}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-light ms-2" to="/login">
                      {" "}
                      LOGIN{" "}
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
