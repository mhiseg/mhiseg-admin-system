import { Button, Column, Grid, Row } from "carbon-components-react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useCurrentUser } from "../CurrentUserContext";
import { validateIdentifier } from "../validation/validation-utils";
import * as Yup from 'yup';
import styles from "./form.scss"
import { Form, Formik } from "formik";
import FieldForm from "../field/field.component";
import { uuidPhoneNumber } from "../constante";
import { User } from "../administration-types";
interface  UserRegisterFormuser {
  user: User;
}

const UserRegisterForm: React.FC<UserRegisterFormuser> = ({user}) => {
  const { t } = useTranslation();

  // const user: LoggedInUser = useCurrentUser();

  const [initialV, setInitialV] = useState({
    uuid: user?.uuid || "",
    username: user?.username || "",
    userProperties: user?.userProperties || null,
    person: {
      givenName: user?.person?.names[0]?.givenName  || "" ,
      familyName: user?.person?.names[0]?.familyName || "",
    },
    retired: user?.retired,
    locale: user?.locale,
    gender: user?.person?.gender,
    phone: user?.person?.attributes.find((attribute) => attribute.attributeType.uuid == uuidPhoneNumber)?.value || "",
    // status: '',
    roles: user?.roles,
    profil: user?.systemId?.split("-")[0],
  });

  const userSchema = Yup.object().shape({
    username: Yup.string()
      .required('messageErrorUsername')
      .test('search exist user', (value, { createError }) => {
        return validateIdentifier(value, createError);
      }),
    // userProperties: Yup.object(),
    person: Yup.object({
      givenName: Yup.string().required('messageErrorGivenName'),
      familyName: Yup.string().required('messageErrorFamilyName'),
    }),
    phone: Yup.string().min(9, ("messageErrorPhoneNumber")),
    gender: Yup.string().required("messageErrorPhoneNumber"),
    profil: Yup.string().required("messageErrorPhoneNumber"),
    roles: Yup.array(),
    locale: Yup.string(),
    retired: Yup.boolean(),
  });


  return (

    <Formik
      enableReinitialize
      initialValues={initialV}
      validationSchema={userSchema}
      onSubmit={async (values, { setSubmitting }) => {
        console.log('setSubmitting', values);
        setSubmitting(false);
      }}>
      {(formik) => {
        const { values, handleSubmit, errors, touched, isValid, dirty } = formik;
        return (
          <Form name="form" className={styles.cardForm} onSubmit={handleSubmit}>
            <Grid fullWidth={true} className={styles.p0}>
               <Row>
                <Column className={styles.firstColSyle} lg={6}>
                  {FieldForm('person.givenName')}
                </Column>
                <Column className={styles.secondColStyle} lg={6}>
                  {FieldForm('person.familyName')}
                </Column>
              </Row>
              <Row>
                <Column className={styles.firstColSyle} lg={6}>
                  {FieldForm('gender')}
                </Column>
                <Column className={styles.secondColStyle} lg={6}>
                  {FieldForm('phone')}
                </Column>
              </Row> 
              <Row>
                <Column className={styles.firstColSyle} lg={6}>
                  {FieldForm('username')}
                </Column>
                <Column className={styles.secondColStyle} lg={6}>
                  {FieldForm('locale')}
                </Column> 
              </Row>
               <Row>
                <Column className={styles.firstColSyle} lg={6}>
                  {FieldForm('retired')}
                </Column>
                <Column className={styles.secondColStyle} lg={6}>
                  {FieldForm('roles')}
                </Column>
              </Row>
               
              <Row>
                <Column className={styles.firstColSyle} lg={6}>
                  {FieldForm('profil')}
                </Column>
              </Row> 
            </Grid>
            <Row>
              <Column>
                <Row>
                  <Column className={styles.marginTop} lg={12} >
                    <div className={styles.flexEnd}>
                      <Button
                        className={styles.buttonStyle}
                        kind="danger--tertiary"
                        type="reset"
                        size="sm"
                        isSelected={true}
                      >

                        {t("cancelButton", "Annuler")}
                      </Button>
                      <Button
                        className={styles.buttonStyle1}
                        kind="tertiary"
                        type="submit"
                        size="sm"
                        isSelected={true}
                        disabled={!(dirty && isValid)}
                      >
                        {t("confirmButton", "Enregistrer")}
                      </Button>
                    </div>
                  </Column>
                </Row>
              </Column>
            </Row>
          </Form>
        );
      }}
    </Formik>

  );

};
export default UserRegisterForm;


