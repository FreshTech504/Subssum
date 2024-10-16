import React, { createContext, useState } from 'react';

export const LanguageContext = createContext();

export const LanguageContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <LanguageContext.Provider value={{ user, setUser }}>
      {children}
    </LanguageContext.Provider>
  );
};