import english from "./english.json";
import hindi from "./hindi.json";
import kannada from "./kannada.json";

const getTranslatedText = (langCode, value) => {
  if (langCode === "hi") {
    return hindi[value];
  } else if (langCode === "en") {
    return english[value];
  } else if (langCode === "kn") {
    return kannada[value];
  }
};

export default getTranslatedText;
