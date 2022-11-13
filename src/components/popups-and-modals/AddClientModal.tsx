import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Modal, Portal, Provider, Text } from 'react-native-paper';

export const AddClientModal = ({ visible, hide }) => {
  const containerStyle = {
    backgroundColor: 'white',
    padding: 20,
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        dismissable={false}
        contentContainerStyle={containerStyle}
      >
        <Text>Example Modal. Click outside this area to dismiss.</Text>
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
  bottomContainer: {
    paddingTop: 40,
    paddingBottom: 10
  }
});
