import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { SelectInput } from "../../input/basic-input/select/select-input.component";
import MultiSelectField from "../../input/custom-input/custom-select/multi-select-component";
import styles from '../field.scss';



export const ModuleField: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <MultiSelectField
        placeholder="Droit d'accès"
        // label="Droit d'accès"
        name="roles"
      />
    </>
  );
};