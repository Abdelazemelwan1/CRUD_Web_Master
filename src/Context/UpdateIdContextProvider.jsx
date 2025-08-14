import { createContext, useState } from "react";
import React from 'react';


export let upId =  createContext();


export default function UpdateIdContextProvider({children}) {
const [id, setId] = useState()


  return <upId.Provider  value={{setId , id}}>
    {children}
  </upId.Provider>
}
