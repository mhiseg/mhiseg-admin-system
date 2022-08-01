import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { SelectCustom } from "../../input/custom-input/custom-select/custom-selected-component";
import { profiles } from "../../register-form/user-ressource";
import styles from '../field.scss';




export const ProfileField: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <SelectCustom
        className={styles.margin_field}
        options={profiles}
        label={t("profilLabel")}
        name="profile"
      />
    </>
  );
};