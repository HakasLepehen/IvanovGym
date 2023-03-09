import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableHighlight, View } from 'react-native';
import { ActivityIndicator, Button, MD2Colors, Text } from 'react-native-paper';
import { SwipeListView } from 'react-native-swipe-list-view';
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
    <>
      {
        isLoadingState
          ? (
            <View style={{ flex: 1 }}>
              <Loader size={'large'} color={MD2Colors.grey900} />
            </View>
          )
          : (
            <SwipeListView
              data={clients}
              renderItem={(data: any) => (
                <TouchableHighlight
                  onPress={() => console.log('You touched me')}
                  style={styles.rowFront}
                  underlayColor={'red'}
                >
                  <ClientLabel {...data.item} key={data.id} />
                </TouchableHighlight>
              )}
              renderHiddenItem={(data) => (
                <View style={styles.rowBack}>
                  <Button
                    icon="pencil"
                    mode="contained"
                    compact={true}
                    onPress={() => console.log(data)}
                  >
                    EDIT
                  </Button>
                  <Button
                    icon="bucket"
                    mode="contained"
                    compact={true}
                    buttonColor={MD2Colors.red600}
                  >
                    REMOVE
                  </Button>
                </View>
              )}
              rightOpenValue={-200}
            />
          )
      }
    </>
  );
};

const styles = StyleSheet.create({
  rowFront: {
    backgroundColor: '#CCC',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
  },
  rowBack: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'flex-end',
    width: 200
  }
})