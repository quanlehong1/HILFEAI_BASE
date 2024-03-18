import {TAction} from '../../utils/types';
import {types} from './types';

export const authAction = (payload: any): TAction => ({
  type: types.AUTH_ACTION,
  payload,
});
