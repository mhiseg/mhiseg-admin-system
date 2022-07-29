import { Button, Column, Grid, Row } from "carbon-components-react";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useCurrentUser } from "../CurrentUserContext";
import { validateIdentifier } from "../validation/validation-utils";
import * as Yup from 'yup';
import styles from "./form.scss"
import { Form, Formik, validateYupSchema } from "formik";
import FieldForm from "../field/field.component";
import { uuidPhoneNumber } from "../constante";
import { User } from "../administration-types";
import { disabledUser, formatUser, geUserByEmailOrUsername, saveUser } from "./user-ressource";
import { showToast } from "@openmrs/esm-framework";
import { format } from "prettier";
interface UserRegisterFormuser {
  user: User;
}

const UserRegisterForm: React.FC<UserRegisterFormuser> = ({ user }) => {
  const { t } = useTranslation();
  const abortController = new AbortController();


  const [initialV, setInitialV] = useState({
    uuid: user?.uuid,
    username: user?.username,
    userProperties: user?.userProperties === undefined ? { defaultLocale: "", forcePassword: "false" } : user?.userProperties,
    person: {
      givenName: user?.person?.names[0]?.givenName,
      familyName: user?.person?.names[0]?.familyName,
      gender: user?.person?.gender,
      phone: ""

    },
    retired: user?.retired || false,
    roles: user?.roles,
    profil: user?.systemId?.split("-")[0],
    systemId: user?.systemId
  });

  useEffect(() => {
    const userRoles = geUserByEmailOrUsername("meme").then(user =>
      formatUser(user.data.results[0]).then(result => setInitialV(result)));
    return () => {
      userRoles;

    };
  }, []);

  const userSchema = Yup.object().shape({
    username: Yup.string()
      .required('messageErrorUsername')
      .test('search exist user', (value, { createError }) => {
        return validateIdentifier(value, createError);
      }),
    person: Yup.object().shape({
      givenName: Yup.string().required('messageErrorGivenName'),
      familyName: Yup.string().required('messageErrorFamilyName'),
      gender: Yup.string().required("messageErrorPhoneNumber"),
      phone: Yup.string().min(9, ("messageErrorPhoneNumber")),
    }),
    userProperties: Yup.object({
      defaultLocale: Yup.string(),
      forcePassword: Yup.string(),
    }),
    profil: Yup.string().required("messageErrorPhoneNumber"),
    roles: Yup.array(),
    retired: Yup.boolean(),
  });

  const save = (values) => {
    console.log("data saved", values);
    const systemId = values.systemId && values.systemId?.split("-")[0] == values.profil ? values.systemId : values.profil + "-" + new Date().getTime();
    let user: User = {
      username: values.username,
      systemId: systemId,
      person: {
        names: [{
          givenName: values.person.givenName,
          familyName: values.person.familyName
        }],
        gender: values.person.gender
      },
      roles: values.roles,
    }
    user.person.attributes = [];
    if (values.person.phone) {
      user.person.attributes.push({ attributeType: uuidPhoneNumber, value: values.person.phone, })
    }
    if (values.userProperties.defaultLocale) {
      user.userProperties = values.userProperties;
    }
    if (values.retired == "false") {
      user.retired = false;
    }
    if (!values.uuid) {
      user.password = values.username + "A123"
    }

    console.log(user, 'To save changes');

    saveUser(abortController, user, values.uuid).then(async (user) => {
      if (values.retired == "true")
        await disabledUser(user.data.uuid)
      showToast({
        title: t('successfullyAdded', 'Successfully added'),
        kind: 'success',
        description: 'Patient save succesfully',
      })
    }
    ).catch(
      error => {
        showToast({ description: error.message })
      }
    )
  }

  return (

    <Formik
      enableReinitialize
      initialValues={initialV}
      validationSchema={userSchema}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(false);
        save(values)
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
                  {FieldForm('profil')}
                </Column>
                <Column className={styles.secondColStyle} lg={6}>
                  {FieldForm('forcePassword')}
                </Column>
                {!values.uuid &&
                  <Column className={styles.secondColStyle} lg={6}>
                    {FieldForm('roles')}
                  </Column>
                }
              </Row>
              {values.uuid && <Row>
                <Column className={styles.firstColSyle} lg={6}>
                  {FieldForm('retired')}
                </Column>

                <Column className={styles.secondColStyle} lg={values.uuid ? 6 : 12}>
                  {FieldForm('roles')}
                </Column>
              </Row>
              }
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


