import { StyleSheet } from "react-native";

import Button from "../components/Reusables/Button";
import Container from "../components/Reusables/Container";
import { View, Text } from "../components/Reusables/Themed";

import { useGlobalContext } from "../context/GlobalContext";

import usePosts from "../hooks/usePosts";

import { RootTabScreenProps } from "../types";

const TabFourScreen = ({ navigation }: RootTabScreenProps<"TabFour">) => {
  const { favorites } = useGlobalContext();
  const posts = usePosts(`id=${favorites}`);

  return (
    <>
      <Container style={{ flex: 0 }}>
        <Text style={{ ...styles.title, textAlign: "center" }}>Get Authed</Text>
        <View style={styles.ctaButtons} foreground>
          <Button title="Sign in" onPress={() => {}} />
          <Button title="Sign Up" onPress={() => {}} />
          {/* <Button title="Sign Out" onPress={() => {}} /> */}
        </View>

        <Text style={styles.title}>Favorites Posts</Text>
      </Container>
      {posts}
    </>
  );
};

const styles = StyleSheet.create({
  ctaButtons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default TabFourScreen;
