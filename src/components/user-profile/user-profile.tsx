import { createErrorHandler, LoggedInUser } from "@openmrs/esm-framework";
import React, { useContext, useState } from "react";
import UserRegisterForm from "../user-form/register-form/register-form";
import { getSynchronizedCurrentUser } from "../user-form/register-form/user-ressource";
import { getCurrentSession } from "./user-profile-resource";
import styles from "../../admin.scss"
import { useTranslation } from "react-i18next";
import { UserRegistrationContext } from "../../user-context";

const UserProfile: React.FC = () => {
  const [user, setUser] = React.useState<LoggedInUser | null | false>(null);
  const { t } = useTranslation();
  const [refreshTable, setRefreshTable] = useState();
  const [allowedLocales, setAllowedLocales] = useState<Array<string>>();


  React.useEffect(() => {
    const currentUserSub = getSynchronizedCurrentUser({
      includeAuthStatus: true,
    }).subscribe((response) => {
      if (response.authenticated) {
        setUser(response.user);
        setAllowedLocales(response["allowedLocales"]);
      } else {
        setUser(false);
      }
      createErrorHandler();
    });
    return () => {
      currentUserSub.unsubscribe();
    };
  }, []);

  return (
    user &&
    <>
      <h4 className={styles['title-page']}>{t("profileLabel")}</h4>
      <div className={styles['mhiseg-main-content']}>
        <UserRegistrationContext.Provider value={{ colSize: [12, 0], userUuid: null, setRefresh: setRefreshTable, uuid: user.uuid, profile: true }}>
          {allowedLocales && <UserRegisterForm user={undefined} uuid={user.uuid} allowedLocales={allowedLocales} />}
        </UserRegistrationContext.Provider>
      </div>
    </>
  )
};

export default UserProfile;
