import { useField } from 'formik';
import { geUserByEmailOrUsername } from '../../../resource/role.resource';

export async function validateIdentifier(value, createError) {
  if (value?.length > 3) {
    const user = await geUserByEmailOrUsername(value);
    if (user.data.results.length > 0)
      return createError({
        path: 'username',
        message: 'messageErrorUsernameExists',
      });
    else return true;
  }
  return true;
}
