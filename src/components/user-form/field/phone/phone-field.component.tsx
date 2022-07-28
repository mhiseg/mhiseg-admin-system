import React, { useContext } from 'react';
import { PhoneInput } from '../../input/custom-input/phone/phone-field.component';
import { useTranslation } from 'react-i18next';
import styles from '../field.scss';


interface PhoneFieldProps {
  name: string;
}

export const PhoneField: React.FC<PhoneFieldProps> = ({ name }) => {
  const { t } = useTranslation();
  const prefix = "+(509)"

  return (
    <div>
      <PhoneInput id={name} prefix={prefix}
        name={name}
        placeholder={t('phoneNumberInputLabelText', 'Phone')}
        className={styles.margin_field}
        />
    </div>
  );
};
