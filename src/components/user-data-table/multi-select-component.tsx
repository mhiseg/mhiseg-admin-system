import React, { useContext, useEffect, useState } from 'react';
import { useField } from 'formik';
import { SelectItem, Select, MultiSelect } from 'carbon-components-react';
import { useTranslation } from 'react-i18next';
import { Plane16 } from '@carbon/icons-react';
import { getAllRoles } from '../user-form/register-form/user-ressource';
import styles from "./user-data-table.scss";

interface InputSelectProps {
    placeholder?: string;
    label?: string;
    onChange?: (value: any) => void;
}

export const MultiSelectField: React.FC<InputSelectProps> = ({ label,onChange, placeholder}) => {
    const { t } = useTranslation();
    const [roles, setRoles] = useState([{ uuid: "", display: "" }]);


    useEffect(() => {
        const userRoles = getAllRoles().then(roles => setRoles(roles.data.results));
        return () => {
            userRoles;
        };
    }, []);


    return (
        <div className={styles.roles}>
            <MultiSelect.Filterable
                light={true}
                placeholder={placeholder}
                label={label}
                hideLabel={true}
                id="role-select"
                titleText="Multiselect title"
                items={roles}
                itemToString={(role) => (role ? role.display : '')}
                selectionFeedback="top-after-reopen"
               onChange={(e) =>onChange(e.selectedItems)}
            />
        </div>
    );
}

export default MultiSelectField;