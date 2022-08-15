import React, { useContext, useEffect, useState } from 'react';
import { useField } from 'formik';
import { SelectItem, Select, MultiSelect, TableToolbarMenu, Button, Column, Row } from 'carbon-components-react';
import { useTranslation } from 'react-i18next';
import { Plane16 } from '@carbon/icons-react';
import { getAllRoles, updateUserRoles } from '../user-form/register-form/user-ressource';
import styles from "./user-data-table.scss";
import { CheckmarkOutline32 } from "@carbon/icons-react"

interface RolesProps {
    placeholder?: string;
    label?: string;
    onChange?: (value: any) => void;
    updateRoles: ()=> void;
}

export const Roles: React.FC<RolesProps> = ({ label, onChange, placeholder,updateRoles }) => {
    const { t } = useTranslation();
    const [roles, setRoles] = useState([{ uuid: "", display: "" }]);
    const [roleSelected, setRoleSelected] = useState([]);
    const abortController = new AbortController();



    useEffect(() => {
        const getRoles = getAllRoles().then(roles => setRoles(roles.data.results));
        return () => {
            getRoles
        };
    }, []);


    return (
        <div className={styles.roles}>
            <Row className={styles.p0}>
                <Column className={styles.p0} lg={11}>
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
                        }}
                    />
                </Column>
                <Column className={styles.p0} lg={1}>
                    <CheckmarkOutline32
                        onClick={() => {updateRoles}}
                        className={styles.colIcon} />
                </Column>
            </Row>
        </div>
    );
}

export default Roles;