import { useState, FC } from "react";
import {
  // Dimensions,
  Image,
  ImageErrorEventData,
  NativeSyntheticEvent,
} from "react-native";

import { Text } from "./Themed";

import { IAccessibleImage } from "../../types/";

const AccessibleImage: FC<IAccessibleImage> = ({
  src,
  height,
  width,
  alt,
  style,
}) => {
  // const [imageDim, setImageDim] = useState({
  //   width,
  //   height,
  // });
  const [error, setError] = useState(false);

  const onImageLoadError = (e: NativeSyntheticEvent<ImageErrorEventData>) => {
    console.warn(e.nativeEvent.error);
    setError(true);
  };

  // Image.getSize(src, (width, height) => {
  //   // calculate image width and height
  //   const screenWidth = Dimensions.get("window").width;
  //   const scaleFactor = width / screenWidth;
  //   const imageHeight = height / scaleFactor;
  //   setImageDim({ width: screenWidth, height: imageHeight });
  // });

  if (error) {
    return <Text>{alt}</Text>;
  }

  return (
    <Image
      source={{
        uri: src,
        height: height ?? 100,
        width: (width as number) ?? 100,
      }}
      accessibilityLabel={alt}
      style={style ?? {}}
      onError={onImageLoadError}
      accessible
    />
  );
};

export default AccessibleImage;
