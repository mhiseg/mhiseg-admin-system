import React from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '../input/input.component';

interface PasswordConfirmFieldProps {
  name: string;
  className?: string;
  required?: boolean;
}

export const PasswordConfirmField: React.FC<PasswordConfirmFieldProps> = ({ name, className, required }) => {
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
