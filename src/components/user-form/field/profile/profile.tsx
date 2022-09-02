import React from "react";
import { Profiles } from "../../administration-types";
import { SelectInput } from "../../input/basic-input/select/select-input.component";
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