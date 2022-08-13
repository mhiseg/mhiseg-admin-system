import { Privilege, Role } from '@openmrs/esm-framework';
import { string } from 'yup';

interface NameValue {
  uuid?: string;
  preferred?: boolean;
  givenName: string;
  familyName: string;
}
export enum Profiles {
  DOCTOR = "doctor",
  NURSE = "nurse",
  ADMIN = "admin",
}

export enum Status {
  ENABLE = "enable",
  DISABLED = "disabled",
  WAITING = "waiting",
}

export enum Locales {
  FR = "fr",
  EN = "en",
  KR = "kr"
}
export interface User {
  uuid?: string;
  display?: string;
  username: string;
  systemId: string;
  password?: string;
  userProperties?: {
    defaultLocale: string;
    status?: string;
    allowedLocales?: Array<string>;
  };
  person: Person;
  privileges?: Array<Privilege>;
  roles?: Array<Role>;
  retired?: boolean;
  retireReason?: string;
  locale?: string;
  allowedLocales?: Array<string>;
  profil?: string;
}

export interface Overlay {
  display: string;
  value: any;
}

export type Person = {
  uuid?: string;
  names: Array<NameValue>;
  gender: string;
  birthdate?: string;
  birthdateEstimated?: boolean;
  attributes?: AttributeValue[];
  addresses?: Array<Address>;
  dead?: boolean;
  deathDate?: string;
  causeOfDeath?: string;
  age?: number;
};


export interface AttributeValue {
  attributeType: string | any;
  value: string;
  uuid?: string;
}


export interface FetchedPatientIdentifierType {
  name: string;
  required?: boolean;
  uuid?: string;
  fieldName: string;
  format: string;
  isPrimary: boolean;
  /** See: https://github.com/openmrs/openmrs-core/blob/e3fb1ac0a052aeff0f957a150731757dd319693b/api/src/main/java/org/openmrs/PatientIdentifierType.java#L41 */
  uniquenessBehavior: undefined | null | 'UNIQUE' | 'NON_UNIQUE' | 'LOCATION';
}

export interface PatientIdentifierValue {
  uuid?: string;
  identifier: string;
  identifierTypeUuid?: string;
  source: IdentifierSource;
  autoGeneration?: boolean;
  preferred: boolean;
  /**
   * @kind ADD -> add a new identifier to a patient
   * @kind UPDATE -> update an existing patient identifier
   * @kind DELETE -> delete an existing patient identifier
   * @kind NONE -> No action to be taken on the patient identifier
   */
  action: 'ADD' | 'UPDATE' | 'DELETE' | 'NONE';
}

/**
 * Extends the `FetchedPatientIdentifierType` with aggregated data.
 */
export interface PatientIdentifierType extends FetchedPatientIdentifierType {
  identifierSources: Array<IdentifierSource>;
  autoGenerationSource?: IdentifierSource;
  checked?: boolean;
  source?: IdentifierSource;
}

export interface IdentifierSource {
  uuid: string;
  name: string;
  description?: string;
  autoGenerationOption?: IdentifierSourceAutoGenerationOption;
}

export interface IdentifierSourceAutoGenerationOption {
  manualEntryEnabled: boolean;
  automaticGenerationEnabled: boolean;
}

export interface PatientIdentifier {
  uuid?: string;
  identifier: string;
  identifierType: string | any;
  location?: string;
  preferred?: boolean;
}

export interface PatientRegistration {
  id?: number;
  /**
   * The preliminary patient in the FHIR format.
   */
  fhirPatient: fhir.Patient;
  /**
   * Internal data collected by patient-registration. Required for later syncing and editing.
   * Not supposed to be used outside of this module.
   */
  _patientRegistrationData: {
    isNewPatient: boolean;
    formValues: FormValues;
    patientUuidMap: PatientUuidMapType;
    initialAddressFieldValues: Record<string, any>;
    capturePhotoProps: CapturePhotoProps;
    patientPhotoConceptUuid: string;
    currentLocation: string;
  };
}
export type relationshipType = {
  givenName: string;
  familyName: string;
  contactPhone: string;
  type: string;
  personUuid?: string;
  relationUuid?: string;
}

export type Relationships = {
  uuid?: string;
  relationshipType: string;
  personA: string | Person;
  personB: string | relationshipType;
};

export type Address = {
  address1?: string,
  cityVillage: string,
  stateProvince: string,
  country: string,
  display?: string,
}
export interface Concept {
  uuid: string;
  display?: string;
  answers?: Concept[];
  answer?: string;
}

export type Patient = {
  uuid?: string;
  identifiers: Array<PatientIdentifier>;
  person: Person;
  voided?: boolean;
}

export type Obs = {
  uuid?: string;
  person?: Person | string;
  obsDatetime?: string;
  encounter?: Encounter | string;
  location?: string;
  concept?: string;
  value?: string;
}

export interface UsePatientPhotoResult {
  data: { dateTime: string; imageSrc: string } | null;
  isError: Error;
  isLoading: boolean;
}

export type Encounter = {
  patient?: string;
  encounterDatetime?: string;
  encounterType: string;
  location?: string;
  uuid?: string;
  displays?: string;
}

export interface RelationshipValue {
  relatedPersonName?: string;
  relatedPersonUuid: string;
  relation?: string;
  relationshipType: string;
  /**
   * Defines the action to be taken on the existing relationship
   * @kind ADD -> adds a new relationship
   * @kind UPDATE -> updates an existing relationship
   * @kind DELETE -> deletes an existing relationship
   * @kind undefined -> no operation on the existing relationship
   */
  action?: 'ADD' | 'UPDATE' | 'DELETE';
  /**
   * Value kept for restoring initial relationshipType value
   */
  initialrelationshipTypeValue?: string;
  uuid?: string;
}

export interface FormValues {
  patientUuid: string;
  givenName: string;
  middleName: string;
  familyName: string;
  unidentifiedPatient: boolean;
  additionalGivenName: string;
  additionalMiddleName: string;
  additionalFamilyName: string;
  addNameInLocalLanguage: boolean;
  gender: string;
  birthdate: Date | string;
  ageEstimate?: number;
  yearsEstimated: number;
  monthsEstimated: number;
  birthdateEstimated: boolean;
  telephoneNumber: string;
  address1: string;
  address2: string;
  cityVillage: string;
  stateProvince: string;
  country: string;
  postalCode: string;
  isDead: boolean;
  deathDate: string;
  deathCause: string;
  relationships: Array<RelationshipValue>;
  identifiers: Array<PatientIdentifierValue>;
  attributes?: {
    [attributeTypeUuid: string]: string;
  };
}

export interface PatientUuidMapType {
  additionalNameUuid?: string;
  preferredNameUuid?: string;
  preferredAddressUuid?: string;
}

export interface CapturePhotoProps {
  imageData: string;
  dateTime: string;
}

export interface AddressValidationSchemaType {
  name: string;
  label: string;
  regex: RegExp;
  regexFormat: string;
}

export interface CodedPersonAttributeConfig {
  personAttributeUuid: string;
  conceptUuid: string;
}

export interface TextBasedPersonAttributeConfig {
  personAttributeUuid: string;
  validationRegex: string;
}
export interface PatientIdentifierResponse {
  uuid: string;
  identifier: string;
  identifierType: {
    uuid: string;
    isPrimary: boolean;
  };
}
export interface PersonAttributeTypeResponse {
  uuid: string;
  display: string;
  name: string;
  description: string;
  format: string;
}

export interface PersonAttributeResponse {
  display: string;
  uuid: string;
  value: string;
  attributeType: {
    display: string;
    uuid: string;
  };
}

export interface ConceptResponse {
  uuid: string;
  display: string;
  answers: Array<ConceptAnswers>;
}

export interface ConceptAnswers {
  display: string;
  uuid: string;
}
