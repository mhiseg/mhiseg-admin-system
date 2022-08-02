import { Column, Grid, Row } from "carbon-components-react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./admin.scss"
import UserDataTable from "./components/user-data-table/user-data-table";
import UserRegisterForm from "./components/user-form/register-form/register-form";
import { UserRegistrationContext } from "./user-context";


const AdminSys: React.FC = () => {
    const { t } = useTranslation();
    const [lgValue,setLgValue]=useState([12,0]);
    const [ userUuid, setUserUuid ] = useState(undefined);
    const [refreshTable, setRefreshTable] = useState();
  
    return (
        <>
            <h4 className={styles['title-page']}>{t("adminSystem")}</h4>
            <div className={styles['mhiseg-main-content']}>
                <UserRegistrationContext.Provider value={{ colSize:setLgValue, userUuid: setUserUuid,setRefresh: setRefreshTable }}>
                    <Grid fullWidth={true} className={styles.p0}>
                        <Row>
                            <Column sm={lgValue[1]} lg={lgValue[0]} className={lgValue[0] < 12 ? styles.pr0 : ''}>
                            <UserDataTable refresh={refreshTable} lg={lgValue}  uuid={userUuid}/>

                            </Column>
                            <Column sm={lgValue[0]} lg={lgValue[1]}>
                                <UserRegisterForm user={undefined} uuid={userUuid} refresh={refreshTable}/>
                            </Column>
                        </Row>
                    </Grid>
                </UserRegistrationContext.Provider>
            </div>
        </>
    );

};
export default AdminSys;


