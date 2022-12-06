import { ImageSourcePropType, ImageStyle, StyleProp } from "react-native";

interface IAccessibleImage {
  src: string;
  height?: number;
  width?: number;
  alt?: string;
  style?: StyleProp<ImageStyle>;
}

export default IAccessibleImage;
