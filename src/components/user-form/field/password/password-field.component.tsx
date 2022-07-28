import React from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '../input/input.component';

interface PasswordFieldProps {
  name: string;
  required?: boolean;
}

export const PasswordField: React.FC<PasswordFieldProps> = ({ name, required }) => {
  const { t } = useTranslation();

  return (
    <Input
      type="password"
      id={name}
      name={name}
      labelText={name}
      hideLabel={true}
      light={false}
    />
  );
};
