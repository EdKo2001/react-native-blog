import { useState, FC } from "react";
import { Image, ImageErrorEventData, NativeSyntheticEvent } from "react-native";

import { Text } from "./Themed";

import { IAccessibleImage } from "../../types/";

const AccessibleImage: FC<IAccessibleImage> = ({
  src,
  height,
  width,
  resizeMode,
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
      source={{
        uri: src,
        height: height ?? 100,
        width: (width as number) ?? 100,
      }}
      accessibilityLabel={alt}
      style={style ?? {}}
      onError={onImageLoadError}
      resizeMode={resizeMode ?? "cover"}
      accessible
    />
  );
};

export default AccessibleImage;
