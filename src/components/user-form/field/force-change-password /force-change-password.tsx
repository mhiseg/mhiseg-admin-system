import React from 'react';
import { useTranslation } from 'react-i18next';
import { Check } from '../../input/basic-input/check/check';
import { Input } from '../../input/basic-input/input/input.component';
import styles from '../field.scss';


interface ForcePasswordFieldProps {
  name?: string;
  required?: boolean;
}

export const ForcePasswordField: React.FC<ForcePasswordFieldProps> = ({ name, required }) => {
  const { t } = useTranslation();

  return (
    <Check
      className={styles.margin_field}
      id="userProperties.forcePassword"
      hideLabel={false}
      labelText="messageForcePassword"
    />
  );
};
