import { useState, useEffect } from "react";
import "./styleApp.css";
import HeaderComp from "./components/Header";
import StatusComp from "./components/Status";
import LanguagesComp from "./components/Languages";
import languagesArr from "./assets/languages";
import clsx from "clsx";
import getByeText from "./assets/message";
import wordsArr from "./assets/words";
import Confetti from "react-confetti";

export default function App() {
  //state
  const [word, setWord] = useState(() => getWord());
  const [pressedLet, setPressedLet] = useState([]);
  const [index, setIndex] = useState(0);
  const [message, setMessage] = useState("");

  console.log(word);
  //derived variables
  const wrongGuessCount = pressedLet.filter((letter) => {
    return !word.includes(letter);
  }).length;

  const isGameWon = word
    .split("")
    .every((letter) => pressedLet.includes(letter));
  const isGameLost = wrongGuessCount >= languagesArr.length - 1 ? true : false;
  const isGameOver = isGameWon || isGameLost;

  //function that returns a word
  function getWord() {
    const randomNr = Math.floor(Math.random() * wordsArr.length);
    return wordsArr[randomNr];
  }

  //function that adds the pressed letters in state
  function addPressedLetters(letter) {
    setPressedLet((prevValue) =>
      prevValue.includes(letter) ? prevValue : [...prevValue, letter]
    );

    if (wrongGuessCount >= index && !word.includes(letter)) {
      setMessage(getByeText(languagesArr[index].name));
      setIndex((prevValue) => prevValue + 1);
    }
  }

  //word section
  const lettersEl = word.split("").map((letter, index) => {
    const isNotShown = isGameLost && !pressedLet.includes(letter);
    return (
      <span key={index} className={`letter ${isNotShown ? "shown" : ""}`}>
        {pressedLet.includes(letter) && letter.toUpperCase()}
        {isNotShown && letter.toUpperCase()}
      </span>
    );
  });

  //keyboard section
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const btnsEl = alphabet.split("").map((btn) => {
    //variables that lead to the btn className (green/red)
    const isPressed = pressedLet.includes(btn);
    const isCorrect = isPressed && word.includes(btn);
    const isWrong = isPressed && !word.includes(btn);

    return (
      <button
        key={btn}
        onClick={() => addPressedLetters(btn)}
        className={clsx("btnKey", { green: isCorrect, red: isWrong })}
      >
        {btn.toUpperCase()}
      </button>
    );
  });

  //function that resets the game
  function resetGame() {
    setWord(getWord());
    setPressedLet([]);
    setIndex(0);
    setMessage("");
  }

  //event that allows to use keyboard
  useEffect(() => {
    function handleKeyDown(event) {
      const key = event.key.toLowerCase();
      const alfabet = "abcdefghijklmnopqrstuvwxyz";
      if (alfabet.includes(key)) {
        addPressedLetters(key);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [pressedLet]);

  return (
    <main>
      {isGameWon && (
        <div className="containerCofetti">
          {" "}
          <Confetti recycle={false} />
        </div>
      )}
      <HeaderComp />
      <StatusComp
        isGameWon={isGameWon}
        isGameLost={isGameLost}
        isGameOver={isGameOver}
        message={message}
      />
      <LanguagesComp wrongGuessCount={wrongGuessCount} />

      <section className="containerWord">{lettersEl}</section>
      <section className={`containerBtns ${isGameOver ? "disabled" : ""}`}>
        {btnsEl}
      </section>
      {isGameOver && (
        <button className="newGame" onClick={resetGame}>
          New Game
        </button>
      )}
    </main>
  );
}
