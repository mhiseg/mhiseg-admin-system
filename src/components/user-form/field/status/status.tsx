import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { SelectCustom } from "../../input/custom-input/custom-select/custom-selected-component";
import styles from '../field.scss';
import { status } from "../../register-form/user-ressource";


export const StatusField: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <SelectCustom
        className={styles.margin_field}
        options={status}
        label={t("statusLabel")}
        name="status"
        required={true}
      />
    </>
  );
};