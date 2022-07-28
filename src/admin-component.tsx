
import { ExtensionSlot } from "@openmrs/esm-framework";
import { Grid, Row } from "carbon-components-react";
import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./admin.scss"
import UserRegisterForm from "./components/user-form/register-form/register-form";


const AdminSys: React.FC = () => {
    const { t } = useTranslation();

    return (
        <>
            <div className={styles["admin-container"]}>
                <ExtensionSlot
                    className={styles["admin-extension-module"]}
                    extensionSlotName={"breadcrumbs-slot"}
                />
                <div className={styles.formatPage}>
                    <h4 className={styles['title-page']}>{t("adminSystem")}</h4>
                    <div className={styles['mhiseg-main-content']}>
                    <UserRegisterForm user={undefined} /> 
                    </div>
                </div>
            </div>
        </>
    );

};
export default AdminSys;


