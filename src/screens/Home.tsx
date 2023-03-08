import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { MD2Colors } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { ClientList } from '../components/client-list/ClientList';
import { ClientPushBtn } from '../components/client-push_btn/ClientPushBtn';
import { Loader } from '../components/loader/Loader';

import { ClientModal } from '../components/popups-and-modals/addEditClient/ClientModal';
import { addClient } from '../requests/ClientRequests';
import { addClients } from '../store/slices/clientSlice';
import { RootState } from '../store/store';

export const Home: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const isLoadingState = useSelector((state: RootState) => state.clientReducer.clientsIsLoading);
  const isLoading = true;
  const dispatch = useDispatch();
  const openAddClientModal = () => setIsVisible(true);
  const closeAddClientModal = async () => setIsVisible(false);
  const saveAddClientModal = async (data) => {
    // await addClient(data);
    // await closeAddClientModal();
    // await getClients();
    dispatch(addClients());
  }

  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.scrollView}>
        <ClientList />
      </ScrollView>
      <ClientPushBtn style={{ backgroundColor: 'red' }} actionHandler={openAddClientModal} />
      <ClientModal
        visible={isVisible}
        hide={closeAddClientModal}
        save={saveAddClientModal}
        isEdit={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: 'relative',
    margin: 0,
    padding: 0,
    backgroundColor: 'red'
  },
  scrollView: {
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});
