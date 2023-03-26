import createSagaMiddleware from "@redux-saga/core";
import { configureStore } from "@reduxjs/toolkit"
import clientSaga from "./sagas/clientSaga";
import { reducer } from "./slices/clientSlice";

const saga = createSagaMiddleware();

const store = configureStore({
  reducer: {
    clientReducer: reducer
  },
  middleware: [saga]
})
saga.run(clientSaga);

export type RootState = ReturnType<typeof store.getState>

export default store;