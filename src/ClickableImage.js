import React, { useState, useEffect, useRef } from "react";
import "./ClickableImage.css"; // Import CSS file

const ClickableImage = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL || "";
  // const [clickedPOI, setClickedPOI] = useState(null);
  const imageRef = useRef(null);

  // Original image size and coordinates
  const originalWidth = 1920; // Replace with your original image width
  const originalHeight = 1080; // Replace with your original image height
  const originalCoords = {
    // 500, 470, 720, 580
    poi1: [268, 837, 540, 1006],
    townSquare: [785, 734, 1110, 898],
    poi3: [1435, 842, 1748, 1014],
  };

  const [coords, setCoords] = useState(originalCoords);

  // const handleClick = (section) => {
  //   alert(`Clicked section: ${section}`);
  // };

  const handleImageClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    console.log(x, y);
  };

  const updateCoords = () => {
    if (imageRef.current) {
      const widthRatio = imageRef.current.clientWidth / originalWidth;
      const heightRatio = imageRef.current.clientHeight / originalHeight;

      const newCoords = {
        poi1: originalCoords.poi1.map((coord, index) =>
          index % 2 === 0 ? coord * widthRatio : coord * heightRatio
        ),
        townSquare: originalCoords.townSquare.map((coord, index) =>
          index % 2 === 0 ? coord * widthRatio : coord * heightRatio
        ),
        poi3: originalCoords.poi3.map((coord, index) =>
          index % 2 === 0 ? coord * widthRatio : coord * heightRatio
        ),
      };

      console.log(newCoords);

      setCoords(newCoords);
    }
  };

  useEffect(() => {
    updateCoords();

    window.addEventListener("resize", updateCoords);
    return () => window.removeEventListener("resize", updateCoords);
  }, []);
  const generateRandomPosition = () => {
    return {
      top: `${Math.random() * 25}%`,
      left: `${Math.random() * 50}%`, // Start clouds slightly off-screen to the left
    };
  };

  const cloudStyles = [
    generateRandomPosition(),
    generateRandomPosition(),
    generateRandomPosition(),
    generateRandomPosition(),
  ];

  useEffect(() => {
    const clouds = document.querySelectorAll(".cloud");

    clouds.forEach((cloud, index) => {
      cloud.addEventListener("animationiteration", () => {
        const newPosition = generateRandomPosition();
        cloud.style.top = newPosition.top;
        cloud.style.left = newPosition.left;
      });
    });
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        background:
          "linear-gradient(90deg, rgba(61,129,199,1) 43%, rgba(18,30,73,1) 60%)",
      }}
    >
      <div style={{ width: "100vw", height: "100vh", overflow: "auto" }}>
        <img
          ref={imageRef}
          src={`${baseUrl}/map_new.png`}
          alt="Clickable"
          useMap="#image-map"
          style={{ width: "100%", height: "100%" }} // Adjust based on your image size
          onClick={handleImageClick}
          onLoad={updateCoords} // Ensure coordinates are updated after image loads
        />
        {cloudStyles.map((style, index) => (
          <img
            key={index}
            src={`${baseUrl}/Cloud${index + 1}.png`}
            alt="Cloud"
            className="cloud"
            style={{
              ...style,
              position: "absolute",
              width: "20%",
              opacity: 0.9,
              animation: `moveCloud ${90 + index * 50}s linear infinite`, // Stagger animation duration for each cloud
              zIndex: 0,
            }}
          />
        ))}
        <map name="image-map">
          <area
            alt="POI 1"
            title="POI 1"
            coords={coords.poi1.join(",")}
            shape="rect"
            // onClick={() => handleClick("POI 1")}
            href="https://www.modd.io/play/HfLpkHDtq/"
            target="_blank"
          />
          <area
            alt="Town Square"
            title="Town Square"
            coords={coords.townSquare.join(",")}
            shape="rect"
            // onClick={() => handleClick("Town Square")}
            href="https://www.modd.io/play/OHzsGe0QG/"
            target="_blank"
          />
          <area
            alt="POI 3"
            title="POI 3"
            coords={coords.poi3.join(",")}
            shape="rect"
            // onClick={() => handleClick("POI 3")}
            href=" https://www.modd.io/play/ijhXyI9ji/"
            target="_blank"
          />
        </map>
      </div>
    </div>
  );
};

export default ClickableImage;
