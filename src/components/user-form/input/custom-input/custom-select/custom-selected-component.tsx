import React, { useContext, useEffect } from 'react';
import { useField } from 'formik';
import { SelectItem, Select } from 'carbon-components-react';
import { useTranslation } from 'react-i18next';
import { Profiles } from '../../../administration-types';

interface InputSelectProps {
  name: string;
  options: Array<any>;
  label: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  value?: any;
}

export const SelectCustom: React.FC<InputSelectProps> = ({ name, options, label, className, required, disabled, value }) => {
  const [field, meta] = useField(name);
  const { t } = useTranslation();
  let star = "";
  required == true ? star = " *" : star = "";

  const selectOptions = [
    <SelectItem text={t(label) + star} key="" value={undefined} />,
    ...options.map((currentOption, index) => <SelectItem text={t(currentOption.display)} value={currentOption.value} key={index} />
    ),
  ];

  return (
    <div>
      <Select
        id="identifierType"
        {...field}
        labelText={label}
        light={true}
        size="md"
        disabled={disabled}
        className={className}
        hideLabel={true}
        invalid={!!(meta.error)}
        invalidText={t(meta.error)}
      >
        {selectOptions}
      </Select>
    </div>
  );
};
