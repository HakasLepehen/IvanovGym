import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { getClients } from '../../store/slices/clientSlice';
import { RootState } from '../../store/store';
import { ClientLabel } from '../client-label/ClientLabel';
import { Loader } from '../loader/Loader';

interface IClient {
  id: string;
  fullName: string;
}

export const ClientList: React.FC = () => {
  const clients: IClient[] = useSelector((state: RootState) => state.clientReducer.clients);
  const isLoadingState = useSelector((state: RootState) => state.clientReducer.clientsIsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClients());
  }, []);

  return (
    <View style={{flex: 1}}>
      {
        isLoadingState
          ? (
            <Loader size={'large'} color={MD2Colors.grey900} />
          )
          : (
            clients.map((client: IClient) => {
              return <ClientLabel {...client} key={client.id} />;
            })
          )
      }
    </View>
  );
};