import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./admin.scss"


const AdminSys: React.FC = () => {
    const { t } = useTranslation();
    return (
        <> 
         <div className={styles["admin-container"]}>
            <h4 className={styles['title-page']}>{t("adminSystem")}</h4>
            <div className={styles['mhiseg-main-content']}>
                mm
            </div>
            </div>
        </>
    );

};
export default AdminSys;


