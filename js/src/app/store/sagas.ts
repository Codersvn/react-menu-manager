import { fork } from 'redux-saga/effects';
import MenuSaga from '../components/MenuComponent/menu.saga';

const RootSaga = [].map(item => fork(item));

export default function* sagas() {
  yield [...RootSaga, ...MenuSaga];
}
