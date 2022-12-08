import React, { FC } from "react";
import { SafeAreaView, StyleProp, StyleSheet, ViewStyle } from "react-native";

import { IContainer } from "../../types/";

const Container: FC<IContainer> = ({ children, style }) => {
  return (
    <SafeAreaView
      style={{ ...styles.container, style } as StyleProp<ViewStyle>}
    >
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default Container;
