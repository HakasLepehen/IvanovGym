import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Modal, Portal, Provider, Text } from 'react-native-paper';

export const AddClientModal = ({ visible, hide }) => {
  const containerStyle = {
    backgroundColor: 'white',
    padding: 10,
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        dismissable={false}
        contentContainerStyle={containerStyle}
      >
        <Text variant='titleLarge'>Введите данные нового клиента</Text>
        <View style={styles.bottomContainer}>
          <Button
            onPress={hide}
            mode="contained"
            compact={true}
            uppercase={true}
          >
            Close
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  titleBlock: {
    paddingBottom: 10
  },
  bottomContainer: {
    paddingTop: 30,
    paddingBottom: 10
  }
});
