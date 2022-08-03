import React, { useEffect, useState } from 'react';
import { useField } from 'formik';
import { MultiSelect } from 'carbon-components-react';
import { useTranslation } from 'react-i18next';

interface InputSelectProps {
    name: string;
    placeholder?: string;
    label?: string;
    options: any[];
    hideLabel?: boolean;
    id?: string;
    titleText?: string;
    items?: any[];
    light?: boolean;
    itemToString(item: any): string;
    className?: string;
    classNameError?: string;
    classNameField?: string;
}

export const MultiSelectField: React.FC<InputSelectProps> = (props) => {
    const [field, meta, helpers] = useField(props.name);
    const { setValue } = helpers;
    const { t } = useTranslation();

    return (
        <div >
            <MultiSelect.Filterable
                {...field}
                {...props}
                placeholder={props.placeholder}
                items={props.items}
                id={props.name}
                initialSelectedItems={meta.value}
                onChange={(e) => { setValue(e.selectedItems) }}
                invalidText={t(meta.error)}
                invalid={!!(meta.error)}
                light={true}
            />
               
        </div>
    );
}

export default MultiSelectField;