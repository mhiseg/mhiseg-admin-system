import React from 'react';
import { Input } from '../input/input.component';

interface UsernameFieldProps {
  name: string;
  required?: boolean;
}

export const UsernameField: React.FC<UsernameFieldProps> = ({ name }) => {
  return (
    <>
      <Input
        id={name}
        name={name}
        labelText={name}
        hideLabel={true}
        light={false}
      />
    </>
  );
};
