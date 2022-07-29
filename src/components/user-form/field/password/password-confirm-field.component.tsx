import React from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '../../input/basic-input/input/input.component';
import styles from '../field.scss';


interface PasswordConfirmFieldProps {
  name: string;
  className?: string;
  required?: boolean;
}

export const PasswordConfirmField: React.FC<PasswordConfirmFieldProps> = ({ name, className, required }) => {
  const { t } = useTranslation();

  return (
    <Input
      className={styles.margin_field}
      type="password"
      id={name}
      name={name}
      labelText={name}
      hideLabel={true}
      light={true}
      placeholder="Password Confirm"
    />
  );
};
