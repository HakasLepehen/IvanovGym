import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ClientList } from '../components/client-list/ClientList';
import { ClientPushBtn } from '../components/client-push_btn/ClientPushBtn';

import { Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AddClientModal } from '../components/popups-and-modals/addClient/AddClientModal';

const windowHeight = Dimensions.get('screen').height;

export const Home: React.FC<any> = () => {
  const [isVisible, setIsVisible] = useState(false);
  const openAddClientModal = () => setIsVisible(true);
  const closeAddClientModal = () => setIsVisible(false);
  const saveAddClientModal = (data) => console.log(data);

  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.scrollView}>
        <ClientList />
      </ScrollView>
      <ClientPushBtn actionHandler={ openAddClientModal } />
      <AddClientModal visible={ isVisible } hide={closeAddClientModal} save={saveAddClientModal} />
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
