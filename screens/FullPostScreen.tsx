import Button from "../components/Reusables/Button";
import { Text } from "../components/Reusables/Themed";

import { RootStackScreenProps } from "../types";

const FullPostScreen = ({
  route,
  navigation,
}: RootStackScreenProps<"FullPost">) => {
  //@ts-ignore
  const { slug, title } = route.params;

  return <Text>{title}</Text>;
};

export default FullPostScreen;
