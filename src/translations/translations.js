import english from "./english.json";
import hindi from "./hindi.json";

const getTranslatedText = (langCode, value) => {
    if(langCode === "hi"){
        return hindi[value];
    } else if(langCode === "en"){
        return english[value];
    }
}

export default getTranslatedText;