import React, { useContext, useEffect, useState } from 'react';
import { useField } from 'formik';
import { MultiSelect } from 'carbon-components-react';
import { useTranslation } from 'react-i18next';
import { UserRegistrationContext } from '../../../../../user-context';

interface InputSelectProps {
    name: string;
    placeholder?: string;
    label?: string;
    // hideLabel?: boolean;
    id?: string;
    titleText?: string;
    items?: any[];
    light?: boolean;
    itemToString(item: any): string;
    className?: string;
    disabled?: boolean;
}

export const MultiSelectField: React.FC<InputSelectProps> = (props) => {
    const [field, meta, helpers] = useField(props.name);
    const { setValue } = helpers;
    const { t } = useTranslation();
    const { profile } = useContext(UserRegistrationContext);


    return (
        <>
            <MultiSelect.Filterable
                {...field}
                {...props}
                placeholder={props.placeholder}
                items={props.items}
                id={props.name}
                initialSelectedItems={meta.initialValue}
                onChange={(e) => {
                        setValue(e.selectedItems)
                }}
                invalidText={t(meta.error)}
                invalid={!!(meta.error)}
                light={true}
                label={props.name + "b"}
            />
        </>
    );
}

export default MultiSelectField;