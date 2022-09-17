import React, {  } from "react";
import { useTranslation } from "react-i18next";
import { SelectInput } from "../../input/basic-input/select/select-input.component";
import styles from '../field.scss';

interface LocaleFieldProps {
  values: Array<string>;
}

export const LocaleField: React.FC<LocaleFieldProps> = ({ values }) => {
  const { t } = useTranslation();
  return (
    <>
      <SelectInput
        className={styles.margin_field}
        options={values}
        label={t("localeLabel")}
        name="userProperties.defaultLocale"
      />
    </>
  );
};
