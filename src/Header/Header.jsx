import React from 'react';
import './Header.css';
import Logo from './Logo/Logo';
import LanguageChoice from './LanguageChoice/LanguageChoice';

function Header({ selectedLanguage, onLanguageChange }) {
   return (
      <header>
         <Logo />
         Mon header
         <LanguageChoice selectedLanguage={selectedLanguage} onLanguageChange={onLanguageChange} />
      </header>
   );
}

export default Header;
