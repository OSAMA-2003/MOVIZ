
import { Button } from 'react-bootstrap'
import './footer.css'
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { FaPhoneAlt } from "react-icons/fa";



function Footer() {
  return (
    <footer className='container-fluid p-5 justify-content-between align-items-center d-flex flex-column flex-md-row text-white text-center text-md-start  '>

    <div >
      <h4>GET IN TOUCH</h4>
      <p><SiGmail/>  osos2003ahmd@gmail.com</p>
      <p><FaPhoneAlt /> +20 1029317818</p>
    </div>

    <div className='my-5 my-md-0'>
    <Button>Contact Me</Button>
    </div>

    <div>
      <h4>SOCIAL MEDIA</h4>
      <div className=' d-flex justify-content-between align-items-center px-3 mt-3 '>
        <a href="https://www.facebook.com/osama.hmd.3599" target="_blank">
        <FaFacebook className=' fs-2' />
        </a>
        <a href="https://www.instagram.com/osama_hmd_/" target="_blank">
        <FaInstagram className=' fs-2' />

        </a>
        <a href="https://www.linkedin.com/in/osama-hmd-abdelhamid-35994a176/" target="_blank">
          <FaLinkedin className=' fs-2' />
        </a>

    </div>
    </div>
    </footer>
  )
}

export default Footer