import React, { useContext, useEffect, useState } from 'react';
import { useField } from 'formik';
import { SelectItem, Select, MultiSelect } from 'carbon-components-react';
import { useTranslation } from 'react-i18next';
import { Plane16 } from '@carbon/icons-react';
import { getAllRoles } from '../user-form/register-form/user-ressource';
import styles from "./user-data-table.scss";

interface RolesProps {
    placeholder?: string;
    label?: string;
    onChange?: (value: any) => void;
}

export const Roles: React.FC<RolesProps> = ({ label, onChange, placeholder }) => {
    const { t } = useTranslation();
    const [roles, setRoles] = useState([{ uuid: "", display: "" }]);
    const [roleSelected, setRoleSelected] = useState([]);

    useEffect(() => {
        const getRoles =  getAllRoles().then(roles => setRoles(roles.data.results));
        return () => {
            getRoles
        };
    }, []);


    return (
        <div className={styles.roles}>
            <MultiSelect.Filterable
                light={true}
                placeholder={placeholder}
                label={label}
                initialSelectedItems={roleSelected}
                hideLabel={true}
                id="role-select"
                titleText="Multiselect title"
                items={roles}
                itemToString={(role) => (role ? role.display : '')}
                selectionFeedback="top-after-reopen"
                onChange={(e) => {
                    onChange(e.selectedItems)
                    
                    setRoleSelected([])
                    alert(0)
                    // this.forceUpdate();
                }}
            />
        </div>
    );
}

export default Roles;