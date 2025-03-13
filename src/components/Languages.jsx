import languagesArr from "../assets/languages";
import clsx from "clsx";

export default function LanguagesComp(props) {
  const languagesEl = languagesArr.map((language, index) => {
    const styles = {
      backgroundColor: language.backgroundColor,
      color: language.color,
    };
    let isDead = false;
    if (props.wrongGuessCount > index) {
      isDead = true;
    }
    const className = {
      lost: isDead,
    };
    return (
      <span
        key={language.name}
        className={clsx("language", className)}
        style={styles}
      >
        {language.name}
      </span>
    );
  });
  return <section className="containerLanguages">{languagesEl}</section>;
}
