import {TAction} from '../../utils/types';
import {types} from './types';

export const userDataAction = (payload: any): TAction => ({
  type: types.USER_DATA_ACTION,
  payload,
});
