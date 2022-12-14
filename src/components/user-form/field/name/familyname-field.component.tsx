import React from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '../../input/basic-input/input/input.component';
import styles from '../field.scss';

interface FamilyNameFieldProps {
  name: string,
  required?: boolean
}
export const FamilyNameField: React.FC<FamilyNameFieldProps> = ({ name,required }) => {
  const { t } = useTranslation();
  let star = "";
  required == true ? star = " *" : star = "";
  return (
    <>
      <Input
        className={styles.margin_field}
        id={name}
        name={"person.familyName"}
        labelText={t("familyNameLabelText", "Nom") + star}
        light={true}
        placeholder={t("familyNameLabelText", "Nom") + star}
        hideLabel={true}
      />
    </>
  );
};
