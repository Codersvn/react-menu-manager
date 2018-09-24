import { fork, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { ApiService } from '../api';
import { App } from '@nsilly/container';
import {
  FETCH_MENU_SUCCESSED,
  API_CALL_ERROR,
  FETCH_MENU_REQUESTED,
  SAVE_MENU_REQUESTED,
  SAVE_MENU_SUCCESSED,
  CREATE_MENU_ITEM_REQUESTED,
  CREATE_MENU_ITEM_SUCCESSED
} from './action';
import * as _ from 'lodash/core';

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

function* create(action) {
  try {
    const result = yield App.make(ApiService).menu.createItem(action.data.menu_id, _.pick(action.data, ['label', 'link']));
    yield put({ type: CREATE_MENU_ITEM_SUCCESSED, data: result });
  } catch (e) {
    yield put({ type: API_CALL_ERROR, error: e });
  }
}

function* watchCreateMenuRequested() {
  yield takeEvery(CREATE_MENU_ITEM_REQUESTED, create);
}

function* watchCreateMenuSuccessed() {
  yield takeEvery(CREATE_MENU_ITEM_SUCCESSED, function*(action: any) {
    document.location.reload();
  });
}

const RootSaga = [watchFetchMenuRequested, watchSaveMenuRequested, watchCreateMenuRequested, watchCreateMenuSuccessed].map(item => fork(item));

export default function* sagas() {
  yield [...RootSaga];
}
