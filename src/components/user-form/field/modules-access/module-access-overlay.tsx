import { useField } from "formik";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { SelectInput } from "../../input/basic-input/select/select-input.component";
import MultiSelectField from "../../input/custom-input/custom-select/multi-select-component";
import { formatRole, getAllRoles } from "../../register-form/user-ressource";
import styles from '../field.scss';



export const ModuleField: React.FC = (props) => {
  const { t } = useTranslation();
  const [roles, setRoles] = useState([{ uuid: "", display: "" }]);
  const [field,meta] = useField("roles");

  useEffect(() => {
    const userRoles = getAllRoles().then(roles => setRoles(formatRole(roles.data.results)));
    return () => {
      userRoles;
    };
  }, []);


  return (
    <>
      <MultiSelectField
        options={roles}
        placeholder={t("roles")}
        label={t("roles")}
        name="roles" 
        classNameField={styles.margin_field}
        className={meta.error ? styles.roles:""}
        classNameError={styles.error}
        items={roles}
        itemToString={(role) => (role ? role.display : '')}
      />
    </>
  );
};