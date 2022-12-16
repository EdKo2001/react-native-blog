import { useState } from "react";
import { StyleSheet } from "react-native";

import Button from "../components/Reusables/Button";
import Container from "../components/Reusables/Container";
import { View, Text } from "../components/Reusables/Themed";
import SignIn from "../components/SignIn";

import { useGlobalContext } from "../context/GlobalContext";

import usePosts from "../hooks/usePosts";

import { RootTabScreenProps } from "../types";

const TabFourScreen = ({ navigation }: RootTabScreenProps<"TabFour">) => {
  const [isSignInVisible, setSignInVisible] = useState(false);
  const { favorites, isAuthed, authSignout } = useGlobalContext();

  const posts = favorites.length > 0 && usePosts(`id=${favorites}`);
  return (
    <>
      <Container style={{ flex: 0 }}>
        <Text style={{ ...styles.title, textAlign: "center" }}>Get Authed</Text>
        <View style={styles.ctaButtons} foreground>
          {!isAuthed ? (
            <>
              <Button title="Sign in" onPress={() => setSignInVisible(true)} />
              <Button title="Sign Up" onPress={() => {}} />
            </>
          ) : (
            <Button title="Sign Out" onPress={authSignout} />
          )}
        </View>
        <Text style={[styles.title, { marginBottom: 0 }]}>Favorites Posts</Text>
        {favorites.length === 0 && (
          <Text style={{ marginTop: 10, fontSize: 16 }}>No Favorite Post</Text>
        )}
      </Container>
      {favorites.length > 0 && posts}
      {!isAuthed && (
        <SignIn
          isOpen={isSignInVisible}
          setOpen={(state: boolean) => setSignInVisible(state)}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  ctaButtons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default TabFourScreen;
