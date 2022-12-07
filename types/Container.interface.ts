import { ReactNode } from "react";
import { StyleSheetProperties } from "react-native";

interface IContainer {
  children: ReactNode;
  style?: StyleSheetProperties;
}

export default IContainer;
