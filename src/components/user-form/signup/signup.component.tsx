import { ExtensionSlot, LoggedInUser } from "@openmrs/esm-framework";
import { Button, Grid, Row } from "carbon-components-react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useCurrentUser } from "../CurrentUserContext";
import { validateIdentifier } from "../validation/validation-utils";
import * as Yup from 'yup';
import styles from "./admin.scss"
import { Form, Formik } from "formik";
import FieldForm from "../field/field.component";

const SignUp: React.FC = () => {
  const { t } = useTranslation();

  const user: LoggedInUser = useCurrentUser();

  const [initialV, setInitialV] = useState({
    uuid: '',
    username: '',
    systemId: '',
    userProperties: undefined,
    person: { givenName: '', familyName: '' },
    retired: undefined,
    locale: '',
  });

  const userSchema = Yup.object().shape({
    username: Yup.string()
      .required('messageErrorUsername')
      .test('search exist user', (value, { createError }) => {
        return validateIdentifier(value, createError);
      }),
    email: Yup.string().email('messageErrorEmailInvalid').required('messageErrorEmail'),
    systemId: Yup.string(),
    userProperties: Yup.object(),
    person: Yup.object({
      givenName: Yup.string().required('messageErrorGivenName'),
      familyName: Yup.string().required('messageErrorFamilyName'),
    }),
    password: Yup.string()
      .required('messageErrorPassword')
      .min(8, 'messageErrorPasswordMin')
      .max(50, 'messageErrorPasswordMax')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/, 'messageErrorPasswordFormat'),
    passwordConfirm: Yup.string()
      .required('messageErrorPasswordConfirm')
      .oneOf([Yup.ref('password'), null], 'messageErrorIdentiticPassword'),
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
          <Form name="form" onSubmit={handleSubmit}>
            {FieldForm('person.givenName')}
            {FieldForm('person.familyName')}
            {FieldForm('email')}
            {FieldForm('username')}
            {FieldForm('password')}
            {FieldForm('passwordConfirm')}
            <Button
              kind="tertiary"
              type="submit"
              isSelected={true}
              disabled={!(dirty && isValid)}>
              {t('signUp', 'Sign Up')}
            </Button>

          </Form>
        );
      }}
    </Formik>

  );

};
export default SignUp;


