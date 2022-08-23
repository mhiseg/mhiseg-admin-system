import { useField } from "formik";
import React, { useEffect } from "react";
import { pageDefaults, Profiles } from "../../administration-types";
import { SelectCustom } from "../../input/custom-input/custom-select/custom-selected-component";
import styles from '../field.scss';




export const DefautPageField: React.FC = () => {
  const [fieldProfile, metaProfile] = useField("profile");
  const [field, meta, helpers] = useField("userProperties.defaultPage");
  const { setValue, setTouched } = helpers;

  const getPage = (): string => {
    if (metaProfile.value == Profiles.ADMIN)
      return pageDefaults.find(page => page.display == 'adminPage').value;
    else if (metaProfile.value == Profiles.ARCHIVIST)
      return pageDefaults.find(page => page.display == 'archivistPage').value;
    return meta.initialValue
  }

  
  useEffect(() => {
      setValue(getPage())
  }, [metaProfile.value]);

  return (
    <>
      <SelectCustom
        className={styles.margin_field}
        options={pageDefaults}
        disabled={metaProfile.value == Profiles.ADMIN || metaProfile.value == Profiles.ARCHIVIST }
        label={"pageLabel"}
        name="userProperties.defaultPage"
        required={true}
      />
    </>
  );
};