import { View, ActivityIndicator, StyleSheet } from "react-native";

export const Loader = ({ color, size }) => {
  return (
    <View
    >
      <ActivityIndicator size={size} color={color} style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
      }} />
    </View>
  );
};