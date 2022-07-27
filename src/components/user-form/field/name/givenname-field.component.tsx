import React from 'react';
import { Input } from '../input/input.component';

interface GivenNameFieldProps {
  name: string;
  className?: string;
}

export const GivenNameField: React.FC<GivenNameFieldProps> = ({ name }) => {

  return (
    <>
     <Input
        id={name}
        name={name}
        labelText={'givenName'}
        hideLabel={true}
        light={false}
      />
    </>
  );
};
