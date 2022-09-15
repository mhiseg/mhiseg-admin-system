import React from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '../../input/basic-input/input/input.component';
import { Password } from '../../input/custom-input/password-input';
import styles from '../field.scss';


interface PasswordFieldProps {
  name: string;
  required?: boolean;
}

export const PasswordField: React.FC<PasswordFieldProps> = ({ name, required }) => {
  const { t } = useTranslation();

  return (
    <Password
      className={styles.margin_field}
      type="password"
      id={name}
      name={name}
      labelText={name}
      hideLabel={true}
      light={true}
      placeholder={t(name)}
    />
  );
};
