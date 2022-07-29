import { useField } from 'formik';
import { geUserByEmailOrUsername } from '../register-form/user-ressource';

export async function validateIdentifier(value, createError) {
  if (value?.length > 3) {
    const user = await geUserByEmailOrUsername(value);
    if (user.data.results.length > 0 && user.data.results[0].username !== value)
      return createError({
        path: 'username',
        message: 'messageErrorUsernameExists',
      });
    else return true;
  }
  return true;
}
