import { useState, useEffect } from "react";
import HangManDisplay from "./components/HangManDisplay";
import words from "./words.json";
const App = () => {
  const [displayedWord, setDisplayedWord] = useState([]); // Word that will be show like this -> w_o_ (word)
  const [screenLetters, setScreenLetters] = useState([]); // Letters that are visible to the player
  const [gameWord, setGameWord] = useState(
    words.words[Math.floor(Math.random() * 1000)]
  );

  const updateDisplay = (w) => {
    let wordList = Array.from(w);
    let randomIndex = Math.floor(Math.random() * (wordList.length - 1 - 0) + 0);
    let currIndex = 0;
    // Need to hide certain letters within word list
    while (currIndex < wordList.length) {
      let letterToHide = wordList[randomIndex];
      wordList[randomIndex] = " _ ";
      // Need to hide all instances of the current letter
      // (can't have a case like this: gameWord = desert, displayedWord = de__rt)
      if (wordList.includes(letterToHide)) {
        wordList = wordList.map((letter) => {
          if (letter === letterToHide) {
            return " _ ";
          }
          return letter;
        });
      }
      currIndex++;
      randomIndex = Math.floor(Math.random() * (wordList.length - 1 - 0) + 0);
    }

    // NICE TO HAVE: Make sure that atleast one letter is visible

    console.log("Word to Hide: " + w);
    // Need to keep track of letters that are already shown to the screen
    const shownWords = wordList.filter((char) => {
      if (char !== " _ ") {
        return char;
      }
    });
    console.log("Letters already shown  to the screen: " + shownWords);
    setScreenLetters(shownWords);
    setDisplayedWord(wordList);
  };

  const userGuess = (guess, setHangCounter) => {
    // Need to reveal all the instances of the guess within the game word
    if (gameWord.includes(guess) && !screenLetters.includes(guess)) {
      // Updated screen letters
      const updatedScreenLetters = [...screenLetters, guess];
      const updatedDisplay = displayedWord.map((letter, index) => {
        if (guess === gameWord[index] && letter === " _ ") {
          return guess;
        } else if (guess !== gameWord[index] && letter !== " _ ") {
          return letter;
        }

        return " _ ";
      });

      setDisplayedWord(updatedDisplay);
      setScreenLetters(updatedScreenLetters);

      /*
      if (updatedDisplay.join("") === gameWord) {
        alert("You have Won! The game will now reset");
        setGameWord(words.words[Math.floor(Math.random() * 1000)]);
      }*/

      return true;
    } else if (!gameWord.includes(guess)) {
      return false;
    } else if (gameWord.includes(guess) && screenLetters.includes(guess)) {
      return true;
    }

    return false;
  };

  const playAgain = () => {
    setGameWord(words.words[Math.floor(Math.random() * 1000)]);
  };

  useEffect(() => {
    updateDisplay(gameWord);
  }, [gameWord]);

  return (
    <div>
      <HangManDisplay
        gameWord={gameWord}
        displayWord={displayedWord}
        userGuess={userGuess}
        playAgain={playAgain}
      />
    </div>
  );
};

export default App;
