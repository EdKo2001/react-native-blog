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
  full,
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
        height: full ? 200 : height ?? 100,
        width: full ? ("100%" as unknown as number) : (width as number) ?? 100,
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
