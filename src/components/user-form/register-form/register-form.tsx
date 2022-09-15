import { Button, Column, Grid, Row } from "carbon-components-react";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { validateIdentifier } from "../validation/validation-utils";
import * as Yup from 'yup';
import styles from "./form.scss"
import { Form, Formik, validateYupSchema } from "formik";
import FieldForm from "../field/field.component";
import { adminModuleUuid, outPtientModuleUuid, uuidPhoneNumber } from "../constante";
import { Profiles, User } from "../administration-types";
import { changeUserStatus, formatRole, formatUser, getAllRoles, getPerson, geUserByUuid, saveUser, updatePassword } from "./user-ressource";
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
  const { colSize, setRefresh, userUuid, profile } = useContext(UserRegistrationContext);
  const [initialV, setInitialV] = useState(formatUser(user));
  const [roles, setRoles] = useState([{ uuid: "", display: "" }]);


  useEffect(() => {
    setInitialV(formatUser(undefined))
    if (uuid) {
      geUserByUuid(uuid)
        .then(async user => {
          const person = await getPerson(user.data.person.uuid);
          setInitialV(formatUser(user.data, person.data))
        })
    }
  }, [uuid, refresh]);

  useEffect(() => {
    const userRoles = getAllRoles().then(roles => setRoles(formatRole(roles.data.results)));
    return () => {
      userRoles;
    };
  }, []);

  const userSchema = Yup.object().shape({
    username: Yup.string()
      .required('messageErrorUsername')
      .lowercase("minuscule")
      .min(5, ("messageErrorUsernameMinVal"))
      .test('search exist user', (value, { createError, parent }) => {
        return validateIdentifier(value, createError, parent);
      }),
    person: Yup.object().shape({
      givenName: Yup.string().required('messageErrorGivenName'),
      familyName: Yup.string().required('messageErrorFamilyName'),
      gender: Yup.string().required("messageErrorGender"),
      phone: Yup.string().min(9, ("messageErrorPhoneNumber")),
    }),
    userProperties: Yup.object({
      status: Yup.string().required("messageErrorStatus"),
      defaultLocale: Yup.string().required("messageErrorLocale"),
      defaultPage: Yup.string().required("messageErrorPage"),
    }),
    profile: Yup.string().required("messageErrorProfile"),
    roles: Yup.array()
      .of(Yup.object()
      ).min(1, "rolesError"),
    oldPassword: Yup.string(),
    newPassword: Yup.string()
      .min(8, t('messageErrorPasswordMin'))
      .max(50, 'messageErrorPasswordMax')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/, t('messageErrorPasswordFormat'))
  }).test("valide form with password ", (value, { createError }) => {
    if (value.newPassword && !value.oldPassword)
      return createError({
        path: 'oldPassword',
        message: ("messageErrorOldPassword"),
      });
    else if (!value.newPassword && value.oldPassword)
      return createError({
        path: 'newPassword',
        message: ("messageErrorNewPassword"),
      });
    else if (value.newPassword && value.oldPassword && value.newPassword == value.oldPassword)
      return createError({
        path: 'newPassword',
        message: ("messageErrorIdentic"),
      });
    else
      return true;
  });

  const save = (values) => {
    const systemId = values.systemId && values.systemId?.split("-")[0] == values.profile ? values.systemId : values.profile + "-" + new Date().getTime();
    let user: User = {
      username: values.username,
      systemId: systemId,
      person: {
        names: [{
          givenName: values.person.givenName,
          familyName: values.person.familyName
        }],
        gender: values.person.gender,
      },
      roles: values.roles,
      userProperties: values.userProperties
    }
    if (!values.uuid) {
      user.password = user.username.charAt(0).toUpperCase() + user.username.substring(1) + "123"
    }
    if (values?.roles?.length > 0) {
      user.roles = values.roles.map(r => r.uuid);
    }
    if (values.person.phone) {
      user.person.attributes = [];
      user.person.attributes.push({ attributeType: uuidPhoneNumber, value: values.person.phone, })
    }
    if (Profiles.ADMIN == values.profile) {
      user.roles = [...user.roles, roles.find(r => r.uuid == adminModuleUuid)]
    } else if (Profiles.ARCHIVIST == values.profile) {
      user.roles = [...user.roles, roles.find(r => r.uuid == outPtientModuleUuid)]
    }
    saveUser(abortController, user, values.uuid).then(async (res) => {
      const users = [{ userProperties: res.data.userProperties, uuid: res.data.uuid, username: res.data.username }]
      await changeUserStatus(abortController, users, values.userProperties.status);
      if (values.oldPassword && values.oldPassword)
        await updatePassword(abortController, values.oldPassword, values.newPassword)
      showToast({
        title: t('successfullyAdded', 'Successfully added'),
        kind: 'success',
        description: 'User save succesfully',
      })
      if (!profile) {
        setRefresh(new Date().getTime())
        colSize([12, 0])
      }
      else {
        window.location.reload();
      }

    }
    ).catch(
      error => {
        showToast({ description: error.message })
      }
    )
  }

  const getTitle = () => {
    if (profile)
      return "profileUser";
    return uuid ? "editUser" : "newUser";

  }

  return (
    <Formik
      enableReinitialize
      initialValues={initialV}
      validationSchema={userSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        setSubmitting(false);
        save(values)
      }}>
      {(formik) => {
        const { handleSubmit, isValid, dirty, values, resetForm } = formik;
        return (
          <Form name="form" className={styles.cardForm} onSubmit={handleSubmit}>
            {!profile && <Icon type="reset" className={styles.closeButton} icon="carbon:close-outline" onClick={() => {
              resetForm();
              colSize([12, 0, 12, 0]);
              userUuid(undefined)
            }} />}
            <h4>{t(getTitle())}</h4>
            <Grid fullWidth={true} className={styles.p0}>
              <div id={styles.person}>
                <label className={styles.labelsFields}>{t("fieldset1Label", "Info personne")}</label>
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
                <label className={styles.labelsFields}>{t("fieldset2Label", "Gestion d'accès")}</label>
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
                  {
                    values.uuid &&
                    <Column className={styles.firstColSyle} lg={6}>
                      {FieldForm('roles', roles)}
                    </Column>
                  }
                  {
                    values.uuid == undefined &&
                    <Column className={styles.firstColSyle} lg={6}>
                      {FieldForm('roles', roles)}
                    </Column>
                  }
                  <Column className={styles.firstColSyle} lg={6}>
                    {FieldForm('defaultPage')}
                  </Column>
                </Row>
              </div>
              {profile &&
                <div id={styles.password}>
                  <label className={styles.labelsFields}>{t("changePasswordLabel", "Change Password")}</label>
                  <Row>
                    <Column className={styles.firstColSyle} lg={6}>
                      {FieldForm('oldPassword')}
                    </Column>
                    <Column className={styles.secondColStyle} lg={6}>
                      {FieldForm('newPassword')}
                    </Column>
                  </Row>
                </div>}
            </Grid>
            <Row>
              <Column>
                <Row>
                  <Column className={styles.marginTop} lg={12} >
                    <div className={styles.flexEnd}>
                      {!profile &&
                        <Button
                          className={styles.buttonStyle}
                          kind="danger--tertiary"
                          type="reset"
                          size="sm"
                          isSelected={true}
                          onClick={() => {
                            colSize([12, 0, 12, 0])
                            userUuid(undefined)
                          }}
                        >
                          {t("cancelButton", "Annuler")}
                        </Button>
                      }
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


