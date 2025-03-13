import react from "react";
import clsx from "clsx";
export default function StatusComp(props) {
  const className = clsx("status", {
    green: props.isGameWon,
    red: props.isGameLost,
    blue: props.message,
  });
  return (
    <div className={`status ${className}`}>
      {props.isGameOver ? (
        props.isGameWon ? (
          <>
            <h2>You win!</h2>
            <p>Well done!🎉</p>
          </>
        ) : (
          <>
            <h2>You lose!</h2>
            <p>Better start learning Assembly!</p>
          </>
        )
      ) : (
        <>
          <h2>{props.message}</h2>
          {props.message && <p>Keep going!</p>}
        </>
      )}
    </div>
  );
}
