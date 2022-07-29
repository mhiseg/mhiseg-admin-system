
import { ExtensionSlot } from "@openmrs/esm-framework";
import { Column, Grid, Row } from "carbon-components-react";
import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./admin.scss"
import UserDataTable from "./components/user-data-table/user-data-table";
import UserRegisterForm from "./components/user-form/register-form/register-form";
import { UserRegistrationContext } from "./user-context";


const AdminSys: React.FC = () => {
    const { t } = useTranslation();
    const [lgValue,setLgValue]=useState([7,5]);

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
                <UserRegistrationContext.Provider value={{ colSize:setLgValue}}>
                    <Grid fullWidth={true} className={styles.p0}>
                        <Row>
                            <Column sm={lgValue[1]} lg={lgValue[0]} className={lgValue[0] < 12 ? styles.pr0 : ''}>
                            <UserDataTable headers={headers} />

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


