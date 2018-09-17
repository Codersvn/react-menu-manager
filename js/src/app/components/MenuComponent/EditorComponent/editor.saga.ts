import { takeEvery, put, fork } from 'redux-saga/effects';
import { FETCH_MENU_REQUESTED, FETCH_MENU_SUCCESSED } from './editor.action';
import { App } from '@nsilly/container';
import { ApiService } from '../../../api';
import { API_CALL_ERROR } from '../../../store/action';

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

export default [watchFetchMenuRequested];
