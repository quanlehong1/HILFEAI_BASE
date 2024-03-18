import {TAction} from '../../utils/types';
import {types} from './types';

export const loadingAction = (payload: boolean): TAction => ({
  type: types.LOADING_ACTION,
  payload,
});
