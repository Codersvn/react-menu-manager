import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

import reducer from './reducers';
import sagas from './sagas';
const sagaMiddleware = createSagaMiddleware();
const store: any = createStore(reducer, applyMiddleware(sagaMiddleware, logger));

sagaMiddleware.run(sagas);

export default store;
