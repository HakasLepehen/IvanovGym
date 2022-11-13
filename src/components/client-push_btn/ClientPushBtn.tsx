import React from 'react';
import { StyleSheet } from 'react-native';
import { IconButton, MD3Colors } from 'react-native-paper';

export const ClientPushBtn: React.FC<any> = ({ actionHandler }: any) => {
  return (
    <IconButton
      icon="plus"
      iconColor={MD3Colors.error50}
      size={50}
      style={styles.btn}
      mode="contained"
      onPress={actionHandler}
    />
  );
};

const styles = StyleSheet.create({
  btn: {
    bottom: 16,
    right: 16,
    position: 'absolute',
  },
});
