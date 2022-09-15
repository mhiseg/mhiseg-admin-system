import { useField } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { UserRegistrationContext } from "../../../../user-context";
import { SelectInput } from "../../input/basic-input/select/select-input.component";
import MultiSelectField from "../../input/custom-input/custom-select/multi-select-component";
import { formatRole, getAllRoles } from "../../register-form/user-ressource";
import styles from '../field.scss';


interface ModuleFieldProps {
  value: any;
}

export const ModuleField: React.FC <ModuleFieldProps> = (props) => {
  const { t } = useTranslation();
  const { profile } = useContext(UserRegistrationContext);

  return (
    <>
      <MultiSelectField
        placeholder={t("roles")}
        label={t("roles")}
        name="roles" 
        disabled={profile}
        className={styles.margin_field}
        items={props.value}
        itemToString={(role) => (role ? role?.display?.split(":")[1] : '')}
      />
    </>
  );
};