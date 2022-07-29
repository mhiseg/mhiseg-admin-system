import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { SelectCustom } from "../../input/custom-input/custom-select/custom-selected-component";
import styles from '../field.scss';




export const ProfilField: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <SelectCustom
        className={styles.margin_field}
        options={[{display:t("doctor"), value:"doctor"},{display:t("nurse"), value:"nurse"}]}
        label={"profil"}
        name="profil"
      />
    </>
  );
};