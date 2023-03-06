import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { getClients } from '../../store/slices/clientSlice';
import { RootState } from '../../store/store';
import { ClientLabel } from '../client-label/ClientLabel';

interface IClient {
  id: string;
  fullName: string;
}

export const ClientList: React.FC = () => {
  const clients: IClient[] = useSelector((state: RootState) => state.clientReducer.clients);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClients());
  }, [clients]);

  return (
    <View style={{ flex: 1 }}>
      {clients.map((client: IClient) => {
        return <ClientLabel {...client} key={client.id} />;
      })}
    </View>
  );
};