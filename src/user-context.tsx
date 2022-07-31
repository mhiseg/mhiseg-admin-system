import { createContext } from "react";




export interface UserRegistrationContextProps {
    colSize: any;
    userUuid: any;
    setRefresh: any;
  }
  
  export const UserRegistrationContext = createContext<UserRegistrationContextProps | undefined>(undefined);