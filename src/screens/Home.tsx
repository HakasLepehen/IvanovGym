import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { ClientList } from '../components/client-list/ClientList';
import { ClientPushBtn } from '../components/client-push_btn/ClientPushBtn';
import { ClientModal } from '../components/popups-and-modals/addEditClient/ClientModal';
import { addClient } from '../store/slices/clientSlice';

export const Home: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();
  const openAddClientModal = () => setIsVisible(true);
  const closeAddClientModal = async () => setIsVisible(false);
  const saveAddClientModal = async (data) => {
    dispatch(addClient(data));
    closeAddClientModal();
  }

  return (
    <View style={styles.wrapper}>
      <ClientList />
      <ClientPushBtn actionHandler={openAddClientModal} />
      <ClientModal
        visible={isVisible}
        hide={closeAddClientModal}
        save={saveAddClientModal}
        isEdit={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: 'relative',
    margin: 0,
    padding: 0
  },
  scrollView: {
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});
