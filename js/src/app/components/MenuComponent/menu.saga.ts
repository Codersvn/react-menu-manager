import { fork } from 'redux-saga/effects';
import * as _ from 'lodash';
import EditorSaga from './EditorComponent/editor.saga';

export default _.map([...EditorSaga], item => fork(item));
