import React, { useState, useEffect, useRef } from "react";
import "./ClickableImage.css"; // Import CSS file

const ClickableImage = () => {
  // const [clickedPOI, setClickedPOI] = useState(null);
  const imageRef = useRef(null);

  // Original image size and coordinates
  const originalWidth = 1920; // Replace with your original image width
  const originalHeight = 1080; // Replace with your original image height
  const originalCoords = {
    poi1: [332, 747, 680, 903],
    townSquare: [862, 637, 1138, 821],
    poi3: [1364, 805, 1654, 1009],
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

  useEffect(() => {
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

    updateCoords();

    window.addEventListener("resize", updateCoords);
    return () => window.removeEventListener("resize", updateCoords);
  }, []);
  const generateRandomPosition = () => {
    return {
      top: `${Math.random() * 50}%`,
      left: `${Math.random() * 50}%`, // Start clouds slightly off-screen to the left
    };
  };

  const cloudStyles = [
    generateRandomPosition(),
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
    <div>
      <img
        ref={imageRef}
        src="/map.png"
        alt="Clickable"
        useMap="#image-map"
        style={{ width: "80%" }} // Adjust based on your image size
        onClick={handleImageClick}
      />
      {cloudStyles.map((style, index) => (
        <img
          key={index}
          src="/cloud.png"
          alt="Cloud"
          className="cloud"
          style={{
            ...style,
            position: "absolute",
            width: "10%",
            opacity: 0.8,
            animation: `moveCloud ${90 + index * 50}s linear infinite`, // Stagger animation duration for each cloud
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
          href="https://www.modd.io/play/OYdzYZYZe/"
          target="_blank"
        />
        <area
          alt="Town Square"
          title="Town Square"
          coords={coords.townSquare.join(",")}
          shape="rect"
          // onClick={() => handleClick("Town Square")}
          href="https://www.modd.io/play/eHasa8Agh/"
          target="_blank"
        />
        <area
          alt="POI 3"
          title="POI 3"
          coords={coords.poi3.join(",")}
          shape="rect"
          // onClick={() => handleClick("POI 3")}
          href="https://www.modd.io/play/gnSXV23J2/"
          target="_blank"
        />
      </map>
    </div>
  );
};

export default ClickableImage;
