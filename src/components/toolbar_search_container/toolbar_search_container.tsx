import React, { useContext, useState } from "react";
import styles from "./toolbar_search_container.scss";
import SearchIcon from "@carbon/icons-react/es/search/20";
import { UserFollow32 } from "@carbon/icons-react"
import { useRef } from "react";
import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";
import { Button } from "carbon-components-react";
import { UserRegistrationContext } from "../../user-context";


export function SearchInput({ onChange, className }) {

    const [isActiveSearchIcon, setActiveSearchIcon] = useState(false);
    const [isActiveRemoveIcon, setActiveRemoveIcon] = useState(true);
    const [isClearInput, setActiveClearInput] = useState(true);
    const input = useRef(null)
    const { t } = useTranslation();


    const toggleClass = (e) => {

        if (e.currentTarget.id == styles.removeIcon) {
            setActiveRemoveIcon(!isActiveRemoveIcon);
            setActiveSearchIcon(!isActiveSearchIcon);
            setActiveClearInput(!isClearInput);
            input.current.value = "";
        }
        if (e.currentTarget.id == "searchIcon") {
            input.current.focus();
        }
    };
    const onInputChange = (e) => {
        if (input.current.value.trim().length == 0) {
            setActiveRemoveIcon(true);
            setActiveSearchIcon(false);
            setActiveClearInput(false);
        } else {
            setActiveRemoveIcon(false);
            setActiveSearchIcon(true);
            setActiveClearInput(false);
        }
    }

    return <>
        <i className={styles.SearchIcon} >

            <SearchIcon
                id="searchIcon"
                className={isActiveSearchIcon ? styles["SearchIconChild"] : ''}
                onClick={toggleClass}
            />
            <Icon
                icon="gridicons:cross-small"
                id={styles.removeIcon}
                className={isActiveRemoveIcon ? styles["SearchIconChild"] : ""}
                onClick={toggleClass}
            />
        </i>
        <input ref={input} type="text" className={className} name="search" autoComplete="off"
            onChange={onChange} onInput={onInputChange}
            placeholder={t("Search", "Search...")} />
    </>

}

export function Toolbar_Button() {
    const {colSize} = useContext(UserRegistrationContext);


    return <>
        <Button
            hasIconOnly
            renderIcon={UserFollow32}
            onClick={() => {
                colSize([7,5])
              }}
            className={styles.Button}
        />
    </>

}
