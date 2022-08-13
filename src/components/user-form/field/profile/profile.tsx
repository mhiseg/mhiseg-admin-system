import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Profiles } from "../../administration-types";
import { SelectInput } from "../../input/basic-input/select/select-input.component";
import { SelectCustom } from "../../input/custom-input/custom-select/custom-selected-component";
import styles from '../field.scss';




export const ProfileField: React.FC = () => {

  return (
    <>
      <SelectInput
        className={styles.margin_field}
        options={Object.values(Profiles)}
        label={"profileLabel"}
        name="profile"
      />
    </>
  );
};