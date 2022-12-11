import React, { FC } from "react";
import { Share, StyleSheet } from "react-native";

import { AntDesign } from "@expo/vector-icons";

import Button from "./Button";

import { IShareComponent } from "../../types/";
import { useThemeColor } from "./Themed";

const ShareComponent: FC<IShareComponent> = ({ title, url }, props) => {
  const color = useThemeColor(
    { light: props.lightColor, dark: props.darkColor },
    "text"
  );

  const onShare = async () => {
    try {
      await Share.share({
        title,
        url,
      });
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message);
      }
    }
  };

  return (
    <Button
      title={<AntDesign name="sharealt" size={20} color={color} />}
      style={styles.button}
      onPress={onShare}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "transparent",
    paddingVertical: 0,
    paddingHorizontal: 0,
    paddingTop: 3,
  },
});

export default ShareComponent;
