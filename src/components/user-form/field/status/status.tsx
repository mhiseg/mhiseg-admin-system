import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { SelectCustom } from "../../input/custom-input/custom-select/custom-selected-component";
import styles from '../field.scss';



export const StatusField: React.FC = () => {
  const { t } = useTranslation();
  const options =[{display:t("enable"), value:false}, {display:t("disabled"), value:true}]
  return (
    <>
      <SelectCustom
        className={styles.margin_field}
        options={options}
        label={"statut"}
        name="retired"
      />
    </>
  );
};