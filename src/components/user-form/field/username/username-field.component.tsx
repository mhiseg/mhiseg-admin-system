import React from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '../../input/basic-input/input/input.component';
import styles from '../field.scss';


interface UsernameFieldProps {
  name: string;
  required?: boolean;
}

export const UsernameField: React.FC<UsernameFieldProps> = ({ name }) => {
  const { t } = useTranslation();

  return (
    <>
      <Input
        className={styles.margin_field}
        id={name}
        name={name}
        labelText={name}
        hideLabel={true}
        light={true}
        placeholder={t("Username")}
      />
    </>
  );
};
