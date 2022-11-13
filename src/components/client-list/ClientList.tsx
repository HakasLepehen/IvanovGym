import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { getClients } from '../../requests/ClientRequests';
import { ClientLabel } from '../client-label/ClientLabel';

interface IClient {
  id: number;
  fullName: string;
}

export const ClientList: React.FC = () => {
  const [clients, setClients] = useState<IClient[]>([]);

  useEffect(() => {
    getClients(['id', 'fullName'], setClients);
  }, []);

  return (
    <View style={{flex: 1}}>
      {clients.map((client) => {
        return <ClientLabel { ...client } key={ client.id } />;
      })}
    </View>
  );
};
