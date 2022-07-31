import { Button, Column, Grid, Row } from "carbon-components-react";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { validateIdentifier } from "../validation/validation-utils";
import * as Yup from 'yup';
import styles from "./form.scss"
import { Form, Formik, validateYupSchema } from "formik";
import FieldForm from "../field/field.component";
import { uuidPhoneNumber } from "../constante";
import { User } from "../administration-types";
import { changeUserStatus, formatUser, getPerson, geUserByUuid, saveUser } from "./user-ressource";
import { showToast } from "@openmrs/esm-framework";
import { UserRegistrationContext } from "../../../user-context";
import { Icon } from "@iconify/react";
interface UserRegisterFormuser {
  user?: User;
  uuid?: string;
  refresh?: any;
}

const UserRegisterForm: React.FC<UserRegisterFormuser> = ({ user, uuid, refresh }) => {
  const { t } = useTranslation();
  const abortController = new AbortController();
  const { colSize, setRefresh } = useContext(UserRegistrationContext);
  const [initialV, setInitialV] = useState(formatUser(user));


  useEffect(() => {
    let user;
    if (uuid) {
      user = geUserByUuid(uuid)
        .then(async user => {
          const person = await getPerson(user.data.person.uuid);
          setInitialV(formatUser(user.data, person.data))
        })
    } else {
      setInitialV(formatUser(undefined))
    }
    return () => {
      user;
    };
  }, [uuid, refresh]);

  const userSchema = Yup.object().shape({
    username: Yup.string()
      .required('messageErrorUsername')
      .lowercase("minuscule")
      .test('search exist user', (value, { createError, parent }) => {
        return validateIdentifier(value, createError, parent);
      }),
    person: Yup.object().shape({
      givenName: Yup.string().required('messageErrorGivenName'),
      familyName: Yup.string().required('messageErrorFamilyName'),
      gender: Yup.string().required("messageErrorPhoneNumber"),
      phone: Yup.string().min(9, ("messageErrorPhoneNumber")),
    }),
    userProperties: Yup.object({
      defaultLocale: Yup.string(),
    }),
    status: Yup.string().required("messageErrorprofile"),
    profile: Yup.string().required("messageErrorprofile"),
    roles: Yup.array()
      .of(Yup.object()
      ).min(1)
    ,
  });

  const save = (values, resetForm) => {
    const systemId = values.systemId && values.systemId?.split("-")[0] == values.profile ? values.systemId : values.profile + "-" + new Date().getTime();
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
    if (!values.uuid) {
      user.password = values.username + "A123"
    }
    console.log(user,'to save');
    saveUser(abortController, user, values.uuid).then(async (user) => {
        await changeUserStatus(abortController, user.data.uuid, values.status);
      showToast({
        title: t('successfullyAdded', 'Successfully added'),
        kind: 'success',
        description: 'Patient save succesfully',
      })
      // resetForm();
      setRefresh(user.data.systemId + new Date().getTime())
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
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        setSubmitting(false);
        save(values, resetForm)
      }}>
      {(formik) => {
        const { handleSubmit, isValid, dirty, values, resetForm } = formik;
        return (
          <Form name="form" className={styles.cardForm} onSubmit={handleSubmit}>
            <Icon type="reset" className={styles.closeButton} icon="carbon:close-outline" onClick={() => {
              resetForm();
              colSize([12, 0])
            }} />
            <Grid fullWidth={true} className={styles.p0}>
              <div id={styles.person}>
                <h5>Info personne</h5>
                <Row>
                  <Column className={styles.firstColSyle} lg={6}>
                    {FieldForm('givenName')}
                  </Column>
                  <Column className={styles.secondColStyle} lg={6}>
                    {FieldForm('familyName')}
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
              </div>
              <div id={styles.access}>
                <h5>{t("fieldset2Label", "Gestion d'accès")}</h5>
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
                    {FieldForm('status')}
                  </Column>
                  <Column className={styles.secondColStyle} lg={6}>
                    {FieldForm('profile')}
                  </Column>
                </Row>
                <Row>
                  <Column className={styles.firstColSyle} lg={12}>
                    {FieldForm('roles')}
                  </Column>
                </Row>
              </div>
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
                        onClick={() => colSize([12, 0])}                      >

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


