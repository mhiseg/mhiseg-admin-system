import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { SelectCustom } from "../../input/custom-input/custom-select/custom-selected-component";
import { locales } from "../../register-form/user-ressource";
import styles from '../field.scss';



export const LocaleField: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <SelectCustom
        className={styles.margin_field}
        options={locales}
        label={t("localeLabel")}
        name="defaultLocale"
        required= {true}
      />
    </>
  );
};
