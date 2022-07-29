import React, { useContext, useEffect, useState } from 'react';
import { useField } from 'formik';
import { SelectItem, Select, MultiSelect } from 'carbon-components-react';
import { useTranslation } from 'react-i18next';
import { getAllRoles } from '../../../register-form/user-ressource';
import styles from '../../../field/field.scss';
import { Plane16 } from '@carbon/icons-react';

interface InputSelectProps {
    name: string;
    placeholder?: string;
    label?: string;
    options: any[];
}

export const MultiSelectField: React.FC<InputSelectProps> = ({ name, label,options, placeholder}) => {
    const [field, meta, helpers] = useField(name);
    const { setValue } = helpers;
    const { t } = useTranslation();
    return (
        <div className={styles.margin_field}>
            <MultiSelect.Filterable
                light={true} {...field}
                initialSelectedItems={meta.value}
                placeholder={placeholder}
                label={label}
                hideLabel={true}
                id={name}
                titleText="Multiselect title"
                items={options}
                itemToString={(role) => (role ? role.display : '')}
                selectionFeedback="top-after-reopen"
               onChange={(e) => { setValue(e.selectedItems) }}
            />
        </div>
    );
}

export default MultiSelectField;