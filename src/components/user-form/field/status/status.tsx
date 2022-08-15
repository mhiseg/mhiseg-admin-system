import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from '../field.scss';
import { SelectInput } from "../../input/basic-input/select/select-input.component";
import { Status } from "../../administration-types";
import { UserRegistrationContext } from "../../../../user-context";
import { useField } from "formik";


export const StatusField: React.FC = () => {
  const { uuid } = useContext(UserRegistrationContext); 
  const [field, meta] = useField("userProperties.status");

  return (
    <>
      <SelectInput
        className={styles.margin_field}
        options={Object.values(Status)}
        label="statusLabel"
        name="userProperties.status"
        disabled={uuid == undefined || meta.initialValue == Status.WAITING}
      />
    </>
  );
};