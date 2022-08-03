import React, { useContext, useEffect } from 'react';
import { useField } from 'formik';
import { SelectItem, Select } from 'carbon-components-react';
import { useTranslation } from 'react-i18next';

interface InputSelectProps {
  name: string;
  options: Array<any>;
  label: string;
  className?: string;
  required?:boolean;
}

export const SelectCustom: React.FC<InputSelectProps> = ({ name, options, label, className,required }) => {
  const [field, meta] = useField(name);
  const { t } = useTranslation();
  let star = "";
  required == true ? star = " *" : star = "";

  const selectOptions = [
    <SelectItem text={label + star} key="" value={undefined} />,
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
