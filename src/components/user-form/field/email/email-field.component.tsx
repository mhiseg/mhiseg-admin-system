import { TextInput } from 'carbon-components-react';
import { useField } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '../input/input.component';

interface EmailFieldProps {
  name: string;
  className?: string;
  required?: boolean;
}

export const EmailField: React.FC<EmailFieldProps> = ({ name, required }) => {
  const { t } = useTranslation();
  const [field, meta] = useField(name);

  return (
    <Input
      type="email"
      id={name}
      name={name}
      labelText={name}
      hideLabel={true}
      light={false}
    />
  );
};
