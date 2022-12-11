import Button from "../components/Reusables/Button";
import Container from "../components/Reusables/Container";
import { Text } from "../components/Reusables/Themed";

import { RootStackScreenProps } from "../types";

const FullPostScreen = ({
  route,
  navigation,
}: RootStackScreenProps<"FullPost">) => {
  //@ts-ignore
  const { slug, title } = route.params;

  return (
    <Container>
      <Text>{title}</Text>
    </Container>
  );
};

export default FullPostScreen;
