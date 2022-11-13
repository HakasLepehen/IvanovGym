import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { List, TouchableRipple } from 'react-native-paper';

type Client = {
  id: number;
  fullName: string;
};

export const ClientLabel: React.FC<Client> = ({ id, fullName }: Client) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: 2,
      }}
    >
      <TouchableRipple
        onPress={() =>
          navigation.navigate('ClientPage', {
            id: id,
            fullName: fullName,
          })
        }
      >
        <List.Item
          title={fullName}
          left={() => <List.Icon icon={'account'} />}
        />
      </TouchableRipple>
    </View>
  );
};
