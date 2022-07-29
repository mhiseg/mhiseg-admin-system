
import { ExtensionSlot } from "@openmrs/esm-framework";
import { Grid, Row, Column } from 'carbon-components-react';
import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./admin.scss"
import MhisegadminSystem from "./components/user-data-table/mhiseg-admin-System";
import UserRegisterForm from "./components/user-form/register-form/register-form";


const AdminSys: React.FC = () => {
    const { t } = useTranslation();

    return (
        <>
            <h4 className={styles['title-page']}>{t("adminSystem")}</h4>
            <div className={styles['mhiseg-main-content']}>
                <Row>
                <Column>
               <MhisegadminSystem />
               </Column>
               <Column>
                <UserRegisterForm user={undefined} />
                </Column>
                </Row>
            </div>
        </>
    );

};
export default AdminSys;


