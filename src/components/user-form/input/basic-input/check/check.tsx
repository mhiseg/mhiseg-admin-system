
import React, { useContext, useEffect, useState } from 'react';
import TextInput from 'carbon-components-react/es/components/TextInput';
import { useField } from 'formik';
import styles from "../../../input/input.scss";
import { useTranslation } from 'react-i18next';
import Checkbox, { CheckboxOnChangeDataVariant, CheckboxOnChangeDefaultVariant } from 'carbon-components-react/lib/components/Checkbox/Checkbox';

interface CheckProps {
    id: string;
    defaultChecked?: boolean | undefined,
    hideLabel?: boolean | undefined,
    className?: string,
    indeterminate?: boolean | undefined,
    labelText: string,
    onChange?: CheckboxOnChangeDataVariant | CheckboxOnChangeDefaultVariant | undefined;
    onClick?(evt: React.MouseEvent<HTMLDivElement>): void;
}


export const Check: React.FC<CheckProps> = props => {
    const [field, meta, helpers] = useField(props.id);
    const { setValue } = helpers;
    const { t } = useTranslation();
    const [isChecked, setIsChecked] = useState<boolean>(meta.initialValue == "true");


    useEffect(() => {
        setIsChecked(meta.value == "true");
    }, [meta.value])

    return (
        <div>
            <Checkbox
                {...props}
                {...field}
                labelText={t(props.labelText)}
                onClick={(e) => setIsChecked(!isChecked)}
                onChange={(e) => setValue(isChecked)}
                checked={isChecked}
            />
        </div>
    );
};
