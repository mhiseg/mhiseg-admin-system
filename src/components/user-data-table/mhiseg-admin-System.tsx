
import React from "react";
import { useTranslation } from "react-i18next";
import UserList from "./userList";


const MhisegadminSystem: React.FC = () => {
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

  ];

  return (
    <>
        <UserList headers={headers} />
    </>

  );
};

export default MhisegadminSystem;``