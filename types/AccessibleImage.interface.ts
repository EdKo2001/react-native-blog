import { StyleSheetProperties } from "react-native";

interface IAccessibleImage {
  src: string;
  height?: number;
  width?: number | string;
  resizeMode?: "cover" | "contain" | "stretch" | "repeat" | "center";
  alt?: string;
  style?: StyleSheetProperties | {};
}

export default IAccessibleImage;
