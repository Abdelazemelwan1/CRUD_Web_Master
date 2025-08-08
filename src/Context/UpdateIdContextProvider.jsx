import { createContext } from "react";


export let UpdateIdContext =  createContext();


export default function UpdateIdContextProvider({children}) {



  return <UpdateIdContext.Provider  value={{}}>
    {children}
  </UpdateIdContext.Provider>
}
