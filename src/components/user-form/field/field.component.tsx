import React from 'react';
import { EmailField } from './email/email-field.component';
// import styles from './field/field.scss';
import { Unknow } from './input/unknow-format-component';
import { FamilyNameField } from './name/familyname-field.component';
import { GivenNameField } from './name/givenname-field.component';
import { PasswordConfirmField } from './password/password-confirm-field.component';
import { PasswordField } from './password/password-field.component';
import { UsernameField } from './username/username-field.component';

const FieldForm = (name: string) => {
  switch (name) {
    case 'person.givenName':
      return <GivenNameField name={name} />;
    case 'person.familyName':
      return <FamilyNameField name={name} />;
    case 'username':
      return <UsernameField name={name} />;
    case 'password':
      return <PasswordField name={name} />;
    case 'email':
      return <EmailField name={name} />;
    case 'passwordConfirm':
      return <PasswordConfirmField name={name} />;
    case 'gender':
    default:
      return <Unknow />;
  }
};

export default FieldForm;
