import {combineReducers} from 'redux';
import auth from '../reducers/authReducer';
import loading from '../reducers/loadingReducer';

export default {
  rootReducer: combineReducers({
    loading,
    auth,
  }),
};
