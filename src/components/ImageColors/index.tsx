import React, { useState, useEffect } from "react";
import "./index.css";

const ImageColors = () => {
  const [showText, setShowText] = useState(""); // State to control showing of text
  var colors = [
    "from-[#E69900] to-[#FFE6B3]",
    "from-[#CCCC00] to-[#FFFFB3]",
    "from-[#4D9900] to-[#BFFF80]",
    "from-[#009980] to-[#99FFEE]",
    "from-[#003399] to-[#99DDFF]",
    "from-[#660099] to-[#DD99FF]",
  ];

  return (
    <div className="container h-96">
      <div className="image-container flex">
        <img
          src="https://d1tgh8fmlzexmh.cloudfront.net/ccbp-dynamic-webapps/white-puppy-img.png"
          alt="Your Image"
          className={`sepia-[0.50 ] box-decoration-slice bg-gradient-to-r ${showText} h-[40%] w-[40%] m-auto`}
        />
        <img
          src="https://d1tgh8fmlzexmh.cloudfront.net/ccbp-dynamic-webapps/white-puppy-img.png"
          alt="Your Image"
          className={`box-decoration-slice bg-gradient-to-r ${showText} h-[40%] w-[40%] m-auto`}
        />
      </div>
    </div>
  );
};

export default ImageColors;
