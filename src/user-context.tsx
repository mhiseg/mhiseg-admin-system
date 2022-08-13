import { createContext } from "react";




export interface UserRegistrationContextProps {
    colSize: any;
    userUuid: any;
    uuid: any;
    setRefresh: any;
  }
  
  export const UserRegistrationContext = createContext<UserRegistrationContextProps | undefined>(undefined);