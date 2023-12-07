import translations from './translations.json'; // Adjust the path to where your JSON file is located

const translate = (key, language) => {
    if (translations[language] && translations[language][key]) {
        return translations[language][key];
    } else if (translations['en'] && translations['en'][key]) {
        return translations['en'][key];
    }
    return key;
};

export default translate;
