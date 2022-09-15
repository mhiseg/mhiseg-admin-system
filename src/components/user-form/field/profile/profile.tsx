import React, { useContext } from "react";
import { UserRegistrationContext } from "../../../../user-context";
import { Profiles } from "../../administration-types";
import { SelectInput } from "../../input/basic-input/select/select-input.component";
import styles from '../field.scss';

export const ProfileField: React.FC = () => {
  const { profile } = useContext(UserRegistrationContext);


  return (
    <>
      <SelectInput
        disabled={profile}
        className={styles.margin_field}
        options={Object.values(Profiles)}
        label={"profileLabel"}
        name="profile"
      />
    </>
  );
};