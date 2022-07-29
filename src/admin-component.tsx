
import { ExtensionSlot } from "@openmrs/esm-framework";
import { Grid, Row, Column } from 'carbon-components-react';
import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./admin.scss"
import UserDataTable from "./components/user-data-table/user-data-table";
import UserRegisterForm from "./components/user-form/register-form/register-form";


const AdminSys: React.FC = () => {
    const { t } = useTranslation();

    let headers = [
      {
        key: 'Username',
        header: t('Username')
      },
      {
        key: 'fullName',
        header: t('fullName')
      },
  
      {
        key: 'phone',
        header: t('phone')
  
      },
      {
        key: 'gender',
        header: t('gender')
      },
      {
        key: 'profil',
        header: t('profil')
      },
      {
        key: 'statut',
        header: t('statut')
      }
      ,
      {
        key: "uuid",
        header: "uuid"
      }
  
    ];
  
    return (
        <>
            <h4 className={styles['title-page']}>{t("adminSystem")}</h4>
            <div className={styles['mhiseg-main-content']}>
                <Row>
                    <Column className={styles['mhiseg-main-column']}>
                    <UserDataTable headers={headers} />
                    </Column >
                    <Column className={styles['mhiseg-main-column']}>
                        <UserRegisterForm user={undefined} />
                    </Column>
                </Row>
            </div>
        </>
    );

};
export default AdminSys;


