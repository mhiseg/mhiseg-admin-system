import { useField } from 'formik';
import { geUserCriteria } from '../register-form/user-ressource';

export async function validateIdentifier(value, createError, parent) {
  if (value?.length > 3) {
    const user = await geUserCriteria(value);
    if (parent.uuid && user.data.results.length > 0 && user.data.results[0].username !== value && user.data.results[0].username.length == value.length)
      return createError({
        path: 'username',
        message: 'messageErrorUsernameExists',
      });    
    else if (parent.uuid == undefined && user.data.results.length > 0 && user.data.results[0].username == value)
      return createError({
        path: 'username',
        message: 'messageErrorUsernameExists',
      });
  }
  return true;
}
