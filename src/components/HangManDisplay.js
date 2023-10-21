import { useState } from "react";
import hangManStart from "../assets/hagnman_no_body.png";
import hangManHead from "../assets/hagnman_head_only.png";
import hangManBody from "../assets/hagnman_head_body.png";
import hangManRightArm from "../assets/hagnman_right_arm.png";
import hangManLeftArm from "../assets/hagnman_left_arm.png";
import hangManRightLeg from "../assets/hagnman_right_leg.png";
import hangManLeftLeg from "../assets/hagnman_left_leg.png";

function HangManDisplay({ gameWord, displayWord, userGuess, playAgain }) {
  const [hangCounter, setHangCounter] = useState(0);
  const [guessLetter, setGuessLetter] = useState("");

  const handleChange = (e) => {
    setGuessLetter(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const check = userGuess(guessLetter, setHangCounter);
    if (check === false) {
      setHangCounter(hangCounter + 1);
      console.log("hangcounter: " + hangCounter);
    }
    setGuessLetter("");
  };

  const restart = () => {
    setHangCounter(0);
    playAgain();
  };

  // Different images of hangman that will be displayed based on the number of lives left
  const hangManPhotos = [
    hangManStart,
    hangManHead,
    hangManBody,
    hangManRightArm,
    hangManLeftArm,
    hangManRightLeg,
    hangManLeftLeg,
  ];

  return (
    <div className="container">
      <h1 className="title">HANGMAN</h1>
      <img
        alt="hangman"
        className="hangManDisp"
        src={hangManPhotos[hangCounter]}
      />
      <h3 className="gameWord">{displayWord.join("")}</h3>

      <form onSubmit={handleSubmit}>
        <input
          className="input"
          type="text"
          onChange={handleChange}
          value={guessLetter}
        />
        <button className="btn">Guess</button>
      </form>
      {hangCounter === 6 ? (
        <>
          <p className="p">He died! The word was "{gameWord}"... Play again?</p>
          <button className="btn" onClick={restart}>
            YES
          </button>
        </>
      ) : (
        <p className="p">lives left: {6 - hangCounter}</p>
      )}

      {gameWord === displayWord.join("") && (
        <div className="container">
          <p className="p">
            You have won! The word was "{gameWord}". Play again?
          </p>
          <button className="btn" onClick={restart}>
            yes
          </button>
        </div>
      )}
    </div>
  );
}

export default HangManDisplay;
