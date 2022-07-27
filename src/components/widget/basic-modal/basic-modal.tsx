import React, { useState } from "react";
import { Button, ComposedModal, ModalBody, ModalFooter, ModalHeader, SecondaryButton } from "carbon-components-react";
import { useTranslation } from "react-i18next";
import styles from "./basic-modal.scss";
import { CustomButton } from "../custom-button";



export interface basicModalProps {
    onConfirmModal: any;
    state: boolean;
    onClose: any;
    title: string;
    body: any;
    primaryButtonName?: string;
    secondaryButtonName?: string;
    modalType: string;
}

const showButton = (name, primaryButtonName, secondaryButtonName,onClose,onConfirmModal) => {
    switch (name) {
        case 'danger':
            return (
                <>
                    <CustomButton onClick={onConfirmModal} kind="danger--tertiary" buttonName={primaryButtonName} className={styles.deleteButton}/>
                    <CustomButton onClick={onClose} kind="tertiary" buttonName={secondaryButtonName} className={styles.cancelButton}/>
                </>
            );
        case 'info':
            return <CustomButton onClick={onClose} kind="primary" buttonName={primaryButtonName}className={styles.infoButton}/>
        case 'confirmation':
            return (
                <>
                    <CustomButton onClick={onClose} kind="tertiary" buttonName={secondaryButtonName} className={styles.cancelButton}/>
                    <CustomButton onClick={onConfirmModal} kind="primary" buttonName={primaryButtonName} className={styles.confimButton}/>
                </>
            );
        default:
            return '';
    }
}

const containerClass = (name) => {
    switch (name) {
        case 'danger':
            return `${styles.nodeDanger}`
        case 'info':
            return `${styles.nodeInfo}`
        case 'confirmation':
            return `${styles.nodeConfirmation}`
        default:
            return '';
    }
}

export const BasicModal: React.FC<basicModalProps> = ({
    onConfirmModal,
    state,
    onClose,
    title,
    body,
    primaryButtonName,
    secondaryButtonName,
    modalType,
}) => {
    const { t } = useTranslation();

    return (
        <>
            <div>
                <ComposedModal open={state} onClose={() => onClose(false)} className={styles.modal} containerClassName={containerClass(modalType)} size='xs'>
                    <ModalHeader title={title} className={styles.header} />
                    <ModalBody className={styles.body} >
                        {body}
                    </ModalBody>
                    <ModalFooter className={styles.footer}>
                        {showButton(modalType, primaryButtonName, secondaryButtonName,onClose,onConfirmModal)}
                    </ModalFooter>
                </ComposedModal>
            </div>
        </>
    );
}
