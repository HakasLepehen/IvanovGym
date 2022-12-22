import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Modal, Portal, Text } from 'react-native-paper';
import { ClientForm } from '../../client-form/ClientForm';

export const AddClientModal = ({ visible, hide, save }) => {
  const [state, setState] = useState([])
  const containerStyle = {
    backgroundColor: 'white',
    padding: 10,
    height: '100%'
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        dismissable={false}
        contentContainerStyle={containerStyle}
        style={styles.modal}
      >
        <View style={styles.titleBlock}>
          <Text variant='titleLarge'>Введите данные нового клиента</Text>
        </View>
        <View style={styles.formContainer}>
          <ClientForm state={state} />
        </View>
        <View style={styles.bottomContainer}>
          <Button
            onPress={() => save(state)}
            mode="contained"
            compact={false}
            uppercase={true}
            buttonColor='green'
            style={styles.saveBtn}
          >
            Сохранить
          </Button>
          <Button
            onPress={hide}
            mode="contained"
            compact={false}
            uppercase={true}
            buttonColor='tomato'
            style={styles.closeBtn}
          >
            Закрыть
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
  modal: {
    justifyContent: 'space-between',
  },
  formContainer: {},
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingHorizontal: 10
  },
  saveBtn: {
    width: 150
  },
  closeBtn: {
    width: 150
  }
});
