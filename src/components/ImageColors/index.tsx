import "./index.css";

const ImageColors = () => {

  return (
    <div className="container h-96">
      <div className="image-container flex">
        <img
          src="https://d1tgh8fmlzexmh.cloudfront.net/ccbp-dynamic-webapps/white-puppy-img.png"
          alt="Your Image"
          className={`sepia-[0.50 ] box-decoration-slice bg-gradient-to-r h-[40%] w-[40%] m-auto`}
        />
        <img
          src="https://d1tgh8fmlzexmh.cloudfront.net/ccbp-dynamic-webapps/white-puppy-img.png"
          alt="Your Image"
          className={`box-decoration-slice bg-gradient-to-r h-[40%] w-[40%] m-auto`}
        />
      </div>
    </div>
  );
};

export default ImageColors;
