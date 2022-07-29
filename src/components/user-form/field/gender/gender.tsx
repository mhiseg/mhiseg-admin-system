import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { SelectCustom } from "../../input/custom-input/custom-select/custom-selected-component";
import styles from '../field.scss';



export const GenderField: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <SelectCustom
        className={styles.margin_field}
        options={[{display:t("maleLabel","Masculin"), value:"M"},{display:t("femaleLabel","Feminin"), value:"F"}]}
        label={t("gender","Sexe")}
        name="person.gender"
      />
    </>
  );
};