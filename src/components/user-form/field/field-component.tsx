import React from 'react';
import { Unknow } from '../input/custom-input/unknow-format-component';
import { FamilyNameField } from './name/familyname-field.component';
import { GivenNameField } from './name/givenname-field.component';


const FieldForm = (name: string, value?) => {
  switch (name) {
    case 'givenName':
      return <GivenNameField name={name} />;
    case 'familyName':
      return <FamilyNameField name={name} />;
    default:
      return <Unknow />;
  }
}

export default FieldForm;
