import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ClientList } from '../components/client-list/ClientList';
import { ClientPushBtn } from '../components/client-push_btn/ClientPushBtn';

import { ClientModal } from '../components/popups-and-modals/addEditClient/ClientModal';
import { addClient } from '../requests/ClientRequests';

export const Home: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const openAddClientModal = () => setIsVisible(true);
  const closeAddClientModal = async () => setIsVisible(false);
  const saveAddClientModal = async (data) => {
    await addClient(data);
    await closeAddClientModal();
    // await getClients();
  }

  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.scrollView}>
        <ClientList />
      </ScrollView>
      <ClientPushBtn actionHandler={ openAddClientModal } />
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
  },
  scrollView: {},
});
