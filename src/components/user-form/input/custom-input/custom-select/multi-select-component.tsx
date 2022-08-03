import React, { useEffect, useState } from 'react';
import { useField } from 'formik';
import { MultiSelect } from 'carbon-components-react';
import { useTranslation } from 'react-i18next';

interface InputSelectProps {
    name: string;
    placeholder?: string;
    label?: string;
    options: any[];
    hideLabel?: boolean;
    id?: string;
    titleText?: string;
    items?: any[];
    light?: boolean;
    itemToString(item: any): string;
    className?: string;
    classNameError?: string;
    classNameField?: string;
}

export const MultiSelectField: React.FC<InputSelectProps> = (props) => {
    const [field, meta, helpers] = useField(props.name);
    const { setValue } = helpers;
    const { t } = useTranslation();

    return (
        <div >
            <MultiSelect.Filterable
                {...field}
                {...props}
                label="test label"
                
                placeholder="test placeholder"
                items={props.items}
                id={props.name}
                initialSelectedItems={meta.value}
                // placeholder={props.placeholder}
                onChange={(e) => { setValue(e.selectedItems) }}
                invalidText={t(meta.error)}
                invalid={!!(meta.error)}
                light={true}
                locale="en"
                hideLabel={false}
                // onMenuChange={(e) => { alert(0)}}
                useTitleInItem={false}
                // useTitleInItem={true}
                // selectionFeedback="fixed"
                downshiftProps={["11","333"]}
                sortItems={meta.value}
                // onInput={(e) => {alert(20) }}
                // mousedown={false}
                // onBlur={(e) => { alert(20) }}
                // translateWithId={translateWithId}
                // setIsOpen={true}

            />
               
        </div>
    );
}

export default MultiSelectField;