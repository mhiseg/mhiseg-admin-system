import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Locales } from "../../administration-types";
import { SelectInput } from "../../input/basic-input/select/select-input.component";
import styles from '../field.scss';



export const LocaleField: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <SelectInput
        className={styles.margin_field}
        options={Object.values(Locales)}
        label={t("localeLabel")}
        name="userProperties.defaultLocale"
      />
    </>
  );
};
