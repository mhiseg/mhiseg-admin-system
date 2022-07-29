import { createContext } from "react";




export interface UserRegistrationContextProps {
    colSize: any;
  }
  
  export const UserRegistrationContext = createContext<UserRegistrationContextProps | undefined>(undefined);