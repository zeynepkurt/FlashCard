import thunk from 'redux-thunk';
import logger from './logger';
import { applyMiddleware } from 'redux';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Remote debugger']);


export default applyMiddleware(
  	thunk,
  	logger
);