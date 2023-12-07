// TranslationContext.js
import React, { createContext, useState, useContext } from 'react';
import translations from '../translation/Translation';

const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
    const [language, setLanguage] = useState('en');

    const translate = key => translations[language][key] || key;

    return (
        <TranslationContext.Provider value={{ setLanguage, translate }}>
            {children}
        </TranslationContext.Provider>
    );
};

export const useTranslation = () => useContext(TranslationContext);
