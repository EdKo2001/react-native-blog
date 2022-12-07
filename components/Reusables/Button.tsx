import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";

const Button = (props: any) => {
  const { onPress, style, title = "Read more" } = props;
  return (
    <Pressable style={{ ...styles.button, ...style }} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    backgroundColor: "black",
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
