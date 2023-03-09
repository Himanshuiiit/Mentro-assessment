import "./App.css";
import { BsArrowDown } from "react-icons/bs";
import "bootstrap/dist/css/bootstrap.min.css";
import Rating from "@mui/material/Rating";
import { useState } from "react";
import mentorInfo from "./Data.js";

function App() {
  const [rotations, setRotations] = useState(new Array(mentorInfo.length).fill(200).map((item, index) => item + index * 35));
  console.log(rotations);
  const [selected, setSelected] = useState(0);
  const bgColors = ["#c5f8c7", "#7abd87"];
  const primaryColor = ["#4caf50", "#609b6c"];
  const [color, setColor] = useState(0);

  const handleNextAnimation = () => {
    const mentor = document.querySelectorAll(".mentor");
    mentor.forEach((item, index) => {
      item.style.transform = `rotate(+${
        rotations[(index + 1) % mentorInfo.length]
      }deg) translateX(300px)`;
    });
    const rotationOfZero = rotations[0];
    rotations.shift();
    rotations.push(rotationOfZero);
    setRotations(rotations);
  };

  const handlePrevAnimation = () => {
    const mentor = document.querySelectorAll(".mentor");
    mentor.forEach((item, index) => {
      item.style.transform = `rotate(+${
        rotations[(index - 1 + mentorInfo.length) % mentorInfo.length]
      }deg) translateX(300px)`;
    });
    const rotationOfEnd = rotations[rotations.length - 1];
    for (let i = rotations.length - 1; i > 0; i--) {
      rotations[i] = rotations[i - 1];
    }
    rotations[0] = rotationOfEnd;
    setRotations(rotations);
  };

  const nextAnimation = () => {
    const mainImage = document.querySelector(".circle-image");
    mainImage.style.transition = "all 0.5s ease-in-out";
    mainImage.style.transform = "translate(-50%, 50%) rotate(50deg) scale(0.7)";
    mainImage.classList.add("fade");
    setTimeout(() => {
      mainImage.style.transform = "translate(-50%, 50%) rotate(0deg) scale(1)";
      mainImage.classList.remove("fade");
    }, 500);
  };

  const imgAnimation = () => {
    const mainImage = document.querySelector(".circle-image");
    mainImage.style.transition = "all 0.5s ease-in-out";
    mainImage.style.transform =
      "translate(-50%, 50%) rotate(-50deg) scale(0.7)";
    mainImage.classList.add("fade");
    setTimeout(() => {
      mainImage.style.transform = "translate(-50%, 50%) rotate(0deg) scale(1)";
      mainImage.classList.remove("fade");
    }, 500);
  };

  const slideAnimation = () => {
    const nameBox = document.querySelector(".name-container");
    nameBox.style.transition = "all 0.5s ease-in-out";
    nameBox.style.transform = "translate(-50%, 270%) translateX(100%)";
    nameBox.classList.add("fade");
    setTimeout(() => {
      nameBox.style.transform = "translate(-50%, 270%) translateX(0%)";
      nameBox.classList.remove("fade");
    }, 500);
  };


  const handleDown = () => {
    handlePrevAnimation();
    imgAnimation();
    slideAnimation();
    setSelected((selected + 1) % mentorInfo.length);
    setColor((color + 1) % bgColors.length);
  };

  const handleUp = () => {
    handleNextAnimation();
    nextAnimation();
    slideAnimation();
    setSelected((selected - 1 + mentorInfo.length) % mentorInfo.length);
    setColor((color + 1) % bgColors.length);
  };

  return (
    <div className="App">
      <div className="details d-flex flex-column justify-content-center align-items-start">
        <h2
          className="ratings"
          style={{
            color: primaryColor[color],
          }}
        >
          {mentorInfo[selected]?.ratings}
        </h2>
        <Rating
          name="mentor-rating"
          value={mentorInfo[selected]?.roundedRatings}
          precision={0.5}
          readOnly
          style={{
            color: primaryColor[color],
          }}
        />
        <h4 className="mentor-name">{mentorInfo[selected]?.name}</h4>
        <h5 className="mentor-title">{mentorInfo[selected]?.title}</h5>
        <p className="mentor-bio">{mentorInfo[selected]?.bio}</p>
        <button
          className="book-session"
          style={{
            backgroundColor: primaryColor[color],
          }}
        >
          Book a session
        </button>
      </div>
      <div
        className="circle"
        style={{
          backgroundColor: bgColors[color],
        }}
      >
        <div className="circle-image d-flex flex-row justify-content-center align-items-center">
          <img
            src={mentorInfo[selected]?.imgUrl}
            alt={mentorInfo[selected]?.name}
            className="selected-image"
          />
        </div>
        <div className="d-flex flex-row justify-content-center align-items-center name-container">
          <h2 className="selected-mentor-name">{mentorInfo[selected]?.name}</h2>
        </div>
      </div>
      <div
        className="circle-overlay"
        style={{
          backgroundColor: bgColors[color],
        }}
      >
        <div className="circle-border">
          <div className="mentor">
            <img
              src={mentorInfo[3].imgUrl}
              alt={mentorInfo[3].name}
              className="mentor-image mimg-3"
            />
          </div>
          <div className="mentor">
            <img
              src={mentorInfo[4].imgUrl}
              alt={mentorInfo[4].name}
              className="mentor-image mimg-4"
            />
          </div>
          <div className="mentor">
            <img
              src={mentorInfo[0].imgUrl}
              alt={mentorInfo[0].name}
              className="mentor-image mimg-0"
            />
          </div>
          <div className="mentor">
            <img
              src={mentorInfo[1].imgUrl}
              alt={mentorInfo[1].name}
              className="mentor-image mimg-1"
            />
          </div>
          <div className="mentor">
            <img
              src={mentorInfo[2].imgUrl}
              alt={mentorInfo[2].name}
              className="mentor-image mimg-2"
            />
          </div>
        </div>
      </div>
      <div className="circle">
        <div className="circle-border-overlay">
          <div
            className="d-flex flex-row justify-content-center align-items-center  circle-border-inner-left"
            style={{
              backgroundColor: primaryColor[color],
            }}
            onClick={handleDown}
          >
            <BsArrowDown
              style={{
                color: "white",
                width: "50%",
                height: "50%",
              }}
            />
          </div>
          <div
            className="d-flex flex-row justify-content-center align-items-center circle-border-inner-right"
            style={{
              backgroundColor: primaryColor[color],
            }}
            onClick={handleUp}
          >
            <BsArrowDown
              style={{
                color: "white",
                width: "50%",
                height: "50%",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
