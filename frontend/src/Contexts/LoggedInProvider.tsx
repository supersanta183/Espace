'use client'
import React from 'react'
import { createContext, useContext, useState } from 'react'

interface ILoggedInContext {
  loggedIn: boolean
  setLoggedIn: (value: boolean) => void
}

export const LoggedInContext = createContext<ILoggedInContext | undefined>(undefined);

interface ILoggedInProviderProps {
  children: React.ReactNode
}

//create provider component
export const LoggedInProvider = ({children} : ILoggedInProviderProps) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  return (
    <LoggedInContext.Provider value={{loggedIn, setLoggedIn}}>
      {children}
    </LoggedInContext.Provider>
  )
}

export const useLoggedInContext = () : ILoggedInContext => {
  const context = useContext(LoggedInContext);
  if (context === undefined) {
    throw new Error('useLoggedInContext must be used within a LoggedInProvider');
  }
  return context;
}

export default LoggedInProvider;