/** @format */


import "./footer.css";
import logo2 from "../../assets/logo2.gif";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="container-fluid footer-section position-relative bottom-0  ">
      <div className=" footer_content d-column d-sm-flex flex-wrap justify-content-between align-items-center py-3  border-top">
      <ul className="nav col-md-4 justify-content-center align-items-center  list-unstyled d-flex">
          <strong className="text-white fs-3">Follow us</strong>
          <li className="ms-3 ">
            <a className="text-white" href="#" >
              <FaFacebook className="fs-4 face" />
            </a>
          </li>
          <li className="ms-3">
            <a className="text-white" href="#" >
              <FaInstagram className="fs-4 insta" />
            </a>
          </li>
          <li className="ms-3">
            <a className="text-white" href="#" >
              <FaTwitter className="fs-4 twiter" />
            </a>
          </li>
        </ul>

        <div className="d-flex justify-content-center" >
          <img src={logo2} className="w-25" />
        </div>

        <div className="col-md-4   ">
          <p className="text-white">&copy; 2024 MOVIZ CINEMA</p>
        </div>
       
      </div>
      
  
       <div className=" copyright py-1 text-center  text-secondary  position-absolute start-0 end-0 bottom-0 ">
          <p >
            <a href="https://www.linkedin.com/in/osama-ahmed-250648245/" target=" _blank">Made By Eng</a> : <a href="https://www.linkedin.com/in/osama-ahmed-250648245/" target="_blank" >Osama Ahmed</a>
          </p>
  
      </div>

    </footer>
  );
};

export default Footer;
