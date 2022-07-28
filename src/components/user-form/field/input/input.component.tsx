import React from 'react';
import TextInput from 'carbon-components-react/es/components/TextInput';
import { useField } from 'formik';
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
  value?: string;
  classNameBlock?: string;
  classNameInput?: string;
  hidden?: boolean;
  type?: string;
  onSuggestionSelected?: () => void;


}

export const Input: React.FC<InputProps> = (props) => {
  const name = props.name;
  const [field, meta] = useField(props.name);
  const { t } = useTranslation();
  
  return (
    <div className={props.classNameBlock}>
      <label>{t(props.labelText)}</label>
      <TextInput
        {...props}
        {...field}
        className={props.classNameInput}
        invalid={!!meta.error}
        invalidText={t(meta.error)}
      />
    </div>
  );
};
