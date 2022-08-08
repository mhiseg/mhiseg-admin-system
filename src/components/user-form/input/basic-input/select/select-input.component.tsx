import React from 'react';
import { useField } from 'formik';
import { SelectItem, Select } from 'carbon-components-react';
import { useTranslation } from 'react-i18next';

interface SelectInputProps {
  name: string;
  options: Array<string>;
  label: string;
  className?: string;
  disabled?: boolean;
}

export const SelectInput: React.FC<SelectInputProps> = ({ name, options, label, className, disabled }) => {
  const [field, meta] = useField(name);
  const { t } = useTranslation();

  const selectOptions = [
    <SelectItem disabled hidden text={`${t(label)}`} key="" value="" />,
    ...options.map((currentOption, index) => <SelectItem text={t(currentOption)} value={currentOption} key={index} />),
  ];

  return (
    <div>
      <Select
        id={name}
        {...field}
        labelText={label}
        light={true} size="md"
        className={className}
        hideLabel={true}
        invalid={!!(meta.error)}
        invalidText={t(meta.error)}
        disabled={disabled}
      >
        {selectOptions}
      </Select>
    </div>
  );
};
