import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

const WrapperAdmin = ({ children }) => {
  return (
    <>
      <Header />
      <div className="dasboard-page mx-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2">
             <Sidebar />
            </div>
            {children}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default WrapperAdmin;
