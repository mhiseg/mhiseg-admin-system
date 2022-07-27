import React from "react";
import { useTranslation } from "react-i18next";
import { BasicModal } from "./basic-modal/basic-modal";


export interface ConfirmationModalProps {
    confirmModal: any;
    closeModal: any;
    modalState: boolean;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ confirmModal, closeModal,modalState }) => {
    const { t } = useTranslation();

    return (
        <>
            <BasicModal
                onConfirmModal={confirmModal}
                state={modalState}
                onClose={closeModal}
                title={t("declarationModalTitle", "Déclaration de décès")}
                body={t("messageModalDeclaration", "Attention! Vous êtes sur le point de déclarer cette personne comme étant mort. Voulez-vous continuer?")}
                primaryButtonName={t("confirmModalButton", "Confirmer")}
                secondaryButtonName={t("cancelButton", "Annuler")}
                modalType="confirmation"
            />
        </>
    );
}