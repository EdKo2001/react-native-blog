import React, { FC } from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";

import { View } from "./Themed";

import { IContainer } from "../../types/";

const Container: FC<IContainer> = ({ children, style }) => {
  return (
    <View style={[styles.container, style] as StyleProp<ViewStyle>}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default Container;
