import { Dimensions } from "react-native";

export const width = Dimensions.get("window").width;
export const height = Dimensions.get("window").height;

export default {
  isSmallDevice: width < 375,
};
