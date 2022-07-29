
import { ExtensionSlot } from "@openmrs/esm-framework";
import { Column, Grid, Row } from "carbon-components-react";
import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./admin.scss"
import MhisegadminSystem from "./components/user-data-table/mhiseg-admin-System";
import UserRegisterForm from "./components/user-form/register-form/register-form";
import { UserRegistrationContext } from "./user-context";


const AdminSys: React.FC = () => {
    const { t } = useTranslation();
    const [lgValue,setLgValue]=useState([7,5]);

    return (
        <>
            <h4 className={styles['title-page']}>{t("adminSystem")}</h4>
            <div className={styles['mhiseg-main-content']}>
                <UserRegistrationContext.Provider value={{ colSize:setLgValue}}>
                    <Grid fullWidth={true} className={styles.p0}>
                        <Row>
                            <Column sm={lgValue[1]} lg={lgValue[0]} className={lgValue[0] < 12 ? styles.pr0 : ''}>
                                <MhisegadminSystem />

                            </Column>
                            <Column sm={lgValue[0]} lg={lgValue[1]}>
                                <UserRegisterForm user={undefined} />
                            </Column>
                        </Row>
                    </Grid>
                </UserRegistrationContext.Provider>
            </div>
        </>
    );

};
export default AdminSys;


