import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { SelectCustom } from "../../input/custom-input/custom-select/custom-selected-component";
import styles from '../field.scss';



export const LocaleField: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <SelectCustom
        className={styles.margin_field}
        options={[{display:t("french"), value:"fr"},{display:t("english"), value:"en"},{display:t("creole"), value:"ht"}]}

        label={"Langue"}
        name="userProperties.defaultLocale"
      />
    </>
  );
};