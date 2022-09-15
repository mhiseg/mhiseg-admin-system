import { createContext } from "react";




export interface UserRegistrationContextProps {
    colSize: any;
    userUuid: any;
    uuid: any;
    setRefresh: any;
    profile: boolean;
  }
  
  export const UserRegistrationContext = createContext<UserRegistrationContextProps | undefined>(undefined);