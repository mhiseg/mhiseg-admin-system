import { createErrorHandler, getCurrentUser, getLoggedInUser, LoggedInUser } from "@openmrs/esm-framework";
import { Column, Grid, Row } from "carbon-components-react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./admin.scss"
import UserDataTable from "./components/user-data-table/user-data-table";
import UserRegisterForm from "./components/user-form/register-form/register-form";
import { getSynchronizedCurrentUser } from "./components/user-form/register-form/user-ressource";
import { UserRegistrationContext } from "./user-context";


const AdminSys: React.FC = () => {
    const { t } = useTranslation();
    const [lgValue, setLgValue] = useState([12, 0, 12, 0]);
    const [userUuid, setUserUuid] = useState(undefined);
    const [refreshTable, setRefreshTable] = useState();
    const [currentUser, setCurrentUser] = useState<LoggedInUser | boolean>();
    const [allowedLocales, setAllowedLocales] = useState<Array<string>>();


    React.useEffect(() => {
        const currentUserSub = getSynchronizedCurrentUser({
          includeAuthStatus: true,
        }).subscribe((response) => {
          if (response.authenticated) {
            setCurrentUser(response.user);
            setAllowedLocales(response["allowedLocales"]);
          } else {
            setCurrentUser(false);
          }
          createErrorHandler();
        });
        return () => {
          currentUserSub.unsubscribe();
        };
      }, []);

    return (
        <>
            <h4 className={styles['title-page']}>{t("adminSystem")}</h4>
            <div className={styles['mhiseg-main-content']}>
                <UserRegistrationContext.Provider value={{ colSize: setLgValue, userUuid: setUserUuid, setRefresh: setRefreshTable, uuid: userUuid, profile: false}}>
                    <Grid fullWidth={true} className={styles.pm0}>
                        <Row className={styles.pm0}>
                            <Column sm={lgValue[2]} lg={lgValue[0]} className={lgValue[0] < 12 ? styles.pl0 : styles.pm0 }>
                                {currentUser &&
                                    <UserDataTable
                                        refresh={refreshTable}
                                        lg={lgValue}
                                        currentUser={currentUser}
                                        uuid={userUuid}
                                    />}
                            </Column>
                            <Column sm={lgValue[3]} lg={lgValue[1]} className={styles.pm0}>
                                { allowedLocales && <UserRegisterForm user={undefined} uuid={userUuid} refresh={refreshTable} allowedLocales={allowedLocales}/>}
                            </Column>
                        </Row>
                    </Grid>
                </UserRegistrationContext.Provider>
            </div>
        </>
    );

};
export default AdminSys;


