import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

const Button = (props: any) => {
  const { onPress, style, title = "Read more" } = props;
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={[styles.button, style]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    backgroundColor: "blue",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});

export default Button;
