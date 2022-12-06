import { useState, FC } from "react";
import { Image, ImageErrorEventData, NativeSyntheticEvent } from "react-native";

import { IAccessibleImage } from "../../types/";

import { Text } from "../Themed";

const AccessibleImage: FC<IAccessibleImage> = ({
  src,
  height,
  width,
  alt,
  style,
}) => {
  const [error, setError] = useState(false);

  const onImageLoadError = (e: NativeSyntheticEvent<ImageErrorEventData>) => {
    console.warn(e.nativeEvent.error);
    setError(true);
  };

  if (error) {
    return <Text>{alt}</Text>;
  }

  return (
    <Image
      accessible
      accessibilityLabel={alt}
      source={{ uri: src, height: height ?? 100, width: width ?? 100 }}
      style={style}
      onError={onImageLoadError}
    />
  );
};

export default AccessibleImage;
