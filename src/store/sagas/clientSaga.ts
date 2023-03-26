import { PayloadAction } from '@reduxjs/toolkit';
import { put, takeEvery } from 'redux-saga/effects';

import { deleteClient, getClientsRequest } from '../../requests/ClientRequests';
import { deleteClientFailure, deleteClientSuccess, getClientsFailure, getClientsSuccess, updateClientFailure, updateClientSuccess } from '../slices/clientSlice';
import { addClient, updateClient } from './../../requests/ClientRequests';

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
  const { payload } = data;
  try {
    yield updateClient(payload, payload.id);
    yield put(updateClientSuccess(payload));
    yield alert('Данные по клиенту обновлены, нажмите на кнопку "Назад" для возврата к списку');
  } catch (error) {
    yield updateClientFailure();
    console.log(error);
    alert('Не удалось обновить информацию по клиенту');
  }

}

function* clientSaga() {
  yield takeEvery('clientSlice/getClients', workGetClientsFetch);
  yield takeEvery('clientSlice/addClient', workAddClient);
  yield takeEvery('clientSlice/deleteClient', workRemoveClient);
  yield takeEvery('clientSlice/updateClientInfo', workUpdateClient);
}

export default clientSaga;