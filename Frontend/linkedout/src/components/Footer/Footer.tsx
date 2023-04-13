import React from "react";
import "./Footer.css"

export const Footer = () => {

    return(
    <div className={`footer`}>
        <div className="footer-left-content" style={{display:"flex", marginLeft:"5vw", height:"60px", alignItems: "center"}}>
            <h1 style = {{color:"white"}}>LinkedOut</h1>
            <h4 style = {{color:"#c8c8c8", marginLeft: "0.5em", marginTop: "1.5em" }}>by Macrohard</h4>
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