import React from "react";
import "./Footer.css"

export const Footer : React.FC = () => {

    return(
    <div style={{backgroundColor: "#0073b1", display:"flex", justifyContent:"space-between"}}>
        <div className="footer-left-content" style={{display:"flex", marginLeft:"5vw", height:"60px"}}>
            <h1 style = {{color:"white"}}>LinkedOut</h1>
            <h4 style = {{color:"#c8c8c8", paddingTop:"20px" }}>by Macrohard</h4>
        </div>
        <div className="footer-middle-content" style={{display:"flex", height:"60px"}}>
          <h5 style = {{color:"#c8c8c8", margin:"auto"}}>Contact us: info@linkedout.com | (514) 846-5800</h5>
        </div>
        <div className="footer-right-content" style={{display:"flex", marginRight:"5vw", height:"60px"}}>
            <h5 style = {{color:"#c8c8c8", margin:"auto"}}>Copyright © 2023 LinkedOut, a subsidiary of Macrohard. All rights reserved.</h5>
        </div>
    </div>
    );
    
}

export default Footer