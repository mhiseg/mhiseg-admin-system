import React, { useContext, useEffect, useState } from 'react';
import TextInput from 'carbon-components-react/es/components/TextInput';
import { useField } from 'formik';
import styles from "../../../input/input.scss";
import { useTranslation } from 'react-i18next';

interface InputProps {
  id: string;
  name: string;
  labelText: string;
  light: boolean;
  disabled?: boolean;
  placeholder?: string;
  hideLabel?: boolean;
  className?: string;
  type?: string;
}


export const Input: React.FC<InputProps> = props => {
  const [field, meta, helpers] = useField(props.name);
  const { t } = useTranslation();


  return (
    <div>
      <TextInput
        type={props.type}
        {...props}
        {...field}
        invalid={!!(meta.error)}
        invalidText={t(meta.error)}
        size="lg"
      />
    </div>
  );
};
