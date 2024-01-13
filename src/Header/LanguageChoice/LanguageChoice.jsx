import React from 'react';

function LanguageChoice({ selectedLanguage, onLanguageChange }) {
    const handleLanguageChange = (event) => {
        const language = event.target.value;
        onLanguageChange(language);
    };

    return (
        <div>
            <p id="language">LanguageChoice</p>
            <select name="language" id="language-select" onChange={handleLanguageChange} value={selectedLanguage}>
                <option value="fr">Fr</option>
                <option value="de">De</option>
                <option value="en">En</option>
                <option value="es">Es</option>
                <option value="ja">Ja</option>
            </select>
        </div>
    );
}

export default LanguageChoice;
