import React, { FC } from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";

import { View, useThemeColor } from "./Themed";

import { IContainer } from "../../types/";

const Container: FC<IContainer> = ({ children, style }) => {
  const foregroundColor = useThemeColor(
    { light: undefined, dark: undefined },
    "foregroundColor"
  );
  return (
    <View
      style={
        [
          styles.container,
          { backgroundColor: foregroundColor },
          style,
        ] as StyleProp<ViewStyle>
      }
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "black",
  },
});

export default Container;
