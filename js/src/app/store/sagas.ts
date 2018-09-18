import { fork, put, takeEvery } from 'redux-saga/effects';
import { ApiService } from '../api';
import { App } from '@nsilly/container';
import { FETCH_MENU_SUCCESSED, API_CALL_ERROR, FETCH_MENU_REQUESTED, SAVE_MENU_REQUESTED, SAVE_MENU_SUCCESSED } from './action';

function* fetchMenu(action) {
  try {
    const result = yield App.make(ApiService).menu.show(action.data);
    yield put({ type: FETCH_MENU_SUCCESSED, data: result });
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchFetchMenuRequested() {
  yield takeEvery(FETCH_MENU_REQUESTED, fetchMenu);
}

function* saveMenu(action) {
  try {
    const result = yield App.make(ApiService).menu.save({ menus: action.data });
    yield put({ type: SAVE_MENU_SUCCESSED, data: result });
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchSaveMenuRequested() {
  yield takeEvery(SAVE_MENU_REQUESTED, saveMenu);
}

const RootSaga = [watchFetchMenuRequested, watchSaveMenuRequested].map(item => fork(item));

export default function* sagas() {
  yield [...RootSaga];
}
