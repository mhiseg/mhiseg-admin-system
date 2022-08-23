import { createContext } from "react";




export interface UserRegistrationContextProps {
    colSize: any;
    userUuid: any;
    uuid: any;
    setRefresh: any;
    // selectedRow: any;
  }
  
  export const UserRegistrationContext = createContext<UserRegistrationContextProps | undefined>(undefined);