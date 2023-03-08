import { IClient } from './../../interfaces/Client';
import { addClient } from './../../requests/ClientRequests';
import { put, takeEvery } from 'redux-saga/effects';
import { getClientsRequest } from '../../requests/ClientRequests';
import { getClientsFailure, getClientsSuccess } from '../slices/clientSlice';

function* workGetClientsFetch() {
  try {
    const data = yield getClientsRequest(['id', 'fullName']);
    yield put(getClientsSuccess(data))
  } catch (error) {
    yield getClientsFailure();
    yield console.log(error);
  }
}

function* workAddClient(data) {
  const { payload } = data;
  yield addClient(payload);
  yield workGetClientsFetch();
}

function* clientSaga() {
  yield takeEvery('clientSlice/getClients', workGetClientsFetch);
  yield takeEvery('clientSlice/addClient', workAddClient);
}

export default clientSaga;