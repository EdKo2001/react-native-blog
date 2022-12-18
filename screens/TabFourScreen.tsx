import { useEffect, useState, useMemo } from "react";
import { StyleSheet } from "react-native";
import { useIsFocused } from "@react-navigation/native";

import Button from "../components/Reusables/Button";
import Container from "../components/Reusables/Container";
import { View, Text } from "../components/Reusables/Themed";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

import { useGlobalContext } from "../context/GlobalContext";

import usePosts from "../hooks/usePosts";

import { RootTabScreenProps } from "../types";

const TabFourScreen = ({ navigation }: RootTabScreenProps<"TabFour">) => {
  const isFocused = useIsFocused();
  const [favPosts, setFavPosts] = useState([]);

  const [isSignInVisible, setSignInVisible] = useState(false);
  const [isSignUpVisible, setSignUpVisible] = useState(false);
  const { favorites, isAuthed, authSignout } = useGlobalContext();

  try {
    if (isAuthed) {
      usePosts("favorites", isAuthed);
    } else {
      // favorites.length > 0 && setFavPosts(usePosts(`id=${favorites}`) as any);
    }
  } catch (err) {
    console.warn(err);
  }

  // console.log(favPosts);

  return (
    <>
      <Container style={{ flex: 0 }}>
        <Text style={{ ...styles.title, textAlign: "center" }}>Get Authed</Text>
        <View style={styles.ctaButtons} foreground>
          {!isAuthed ? (
            <>
              <Button title="Sign in" onPress={() => setSignInVisible(true)} />
              <Button title="Sign Up" onPress={() => setSignUpVisible(true)} />
            </>
          ) : (
            <Button title="Sign Out" onPress={authSignout} />
          )}
        </View>
        <Text style={[styles.title, { marginBottom: 0 }]}>Favorites Posts</Text>
        {favPosts.length === 0 && (
          <Text style={{ marginTop: 10, fontSize: 16 }}>No Favorite Post</Text>
        )}
      </Container>
      {favPosts.length > 0 && favPosts}
      {!isAuthed && (
        <>
          <SignIn
            isOpen={isSignInVisible}
            setOpen={(state: boolean) => setSignInVisible(state)}
          />
          <SignUp
            isOpen={isSignUpVisible}
            setOpen={(state: boolean) => setSignUpVisible(state)}
          />
        </>
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
