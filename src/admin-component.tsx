import { navigate, NavigateOptions } from "@openmrs/esm-framework";
import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

const AdminSys: React.FC = () => {
    const { t } = useTranslation();
        return (
            <>
                <h4 className={`title-page`}>{t('declareDeathTitle', 'Declare a death')}</h4>
                <div className={`mhiseg-main-content `}>
                    {/* <DeathFormRegistry patient={patientSearch?.data} /> */}
                </div>
            </>
        );

};
export default AdminSys;


