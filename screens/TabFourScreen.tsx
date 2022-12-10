import Container from "../components/Reusables/Container";
import { Text } from "../components/Reusables/Themed";

import { RootTabScreenProps } from "../types";

const TabFourScreen = ({ navigation }: RootTabScreenProps<"TabFour">) => {
  return (
    //@ts-ignore
    <Container style={{ alignItems: "center", justifyContent: "center" }}>
      <Text>Account</Text>
    </Container>
  );
};

export default TabFourScreen;
