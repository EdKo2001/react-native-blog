import React, { FC } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from "react-native";

import { Text } from "./Themed";

import { IButton } from "../../types/";

const Button: FC<IButton> = ({ onPress, style, title = "Read more" }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={[styles.button, style] as StyleProp<ViewStyle>}
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
