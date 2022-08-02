import React from 'react';
import { Unknow } from '../input/custom-input/unknow-format-component';
import { EmailField } from './email/email-field.component';
import { ForcePasswordField } from './force-change-password /force-change-password';
import { GenderField } from './gender/gender';
import { LocaleField } from './locale/locale';
import { ModuleField } from './modules-access/module-access-overlay';
import { FamilyNameField } from './name/familyname-field.component';
import { GivenNameField } from './name/givenname-field.component';
import { PasswordConfirmField } from './password/password-confirm-field.component';
import { PasswordField } from './password/password-field.component';
import { PhoneField } from './phone/phone-field.component';
import { ProfileField } from './profile/profile';
import { StatusField } from './status/status';
import { UsernameField } from './username/username-field.component';

const FieldForm = (name: string) => {
  switch (name) {
    case 'givenName':
      return <GivenNameField name={name} required={true}/>;
    case 'familyName':
      return <FamilyNameField name={name} required={true}/>;
    case 'username':
      return <UsernameField name={name} required={true}/>;
    case 'password':
      return <PasswordField name={name} />;
    case 'email':
      return <EmailField name={name} />;
    case 'passwordConfirm':
      return <PasswordConfirmField name={name} />;
    case 'gender':
      return <GenderField />;
    case 'phone':
      return <PhoneField name={name} />;
    case 'status':
      return <StatusField />;
    case 'locale':
      return <LocaleField />;
    case 'roles':
      return <ModuleField />;
    case 'profile':
      return <ProfileField />;
    case 'forcePassword':
      return <ForcePasswordField />;
    default:
      return <Unknow />;
  }
};

export default FieldForm;
