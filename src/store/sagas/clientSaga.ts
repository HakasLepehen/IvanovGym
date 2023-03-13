import { PayloadAction } from '@reduxjs/toolkit';
import { put, takeEvery } from 'redux-saga/effects';

import { deleteClient, getClientsRequest } from '../../requests/ClientRequests';
import { deleteClientFailure, deleteClientSuccess, getClientsFailure, getClientsSuccess, updateClientSuccess } from '../slices/clientSlice';
import { addClient } from './../../requests/ClientRequests';

function* workGetClientsFetch() {
  try {
    const data = yield getClientsRequest(['id', 'fullName']);
    yield put(getClientsSuccess(data))
  } catch (error) {
    yield getClientsFailure();
    yield console.log(error);
  }
}

function* workRemoveClient(data: PayloadAction<number>) {
  try {
    yield deleteClient(data.payload);
    yield put(deleteClientSuccess(data.payload));
  } catch (err) {
    yield deleteClientFailure();
    yield console.log(err);
  }
}

function* workAddClient(data) {
  const { payload } = data;
  yield addClient(payload);
  yield workGetClientsFetch();
}

function* workUpdateClient(data) {
  // const { payload } = data;
  yield console.log(data);
  yield put(updateClientSuccess());
}

function* clientSaga() {
  yield takeEvery('clientSlice/getClients', workGetClientsFetch);
  yield takeEvery('clientSlice/addClient', workAddClient);
  yield takeEvery('clientSlice/deleteClient', workRemoveClient);
  yield takeEvery('clientSlice/updateClient', workUpdateClient);
}

export default clientSaga;