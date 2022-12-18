import { useState } from "react";
import { StyleSheet } from "react-native";

import { SignIn, SignUp } from "../components";
import { Button, Container, View, Text } from "../components/Reusables";

import { useGlobalContext } from "../context/GlobalContext";

import { usePosts } from "../hooks";

import { RootTabScreenProps } from "../types";

const TabFourScreen = ({ navigation }: RootTabScreenProps<"TabFour">) => {
  const [isSignInVisible, setSignInVisible] = useState(false);
  const [isSignUpVisible, setSignUpVisible] = useState(false);
  const { favorites, isAuthed, userData, authSignout } = useGlobalContext();

  let favPosts: { posts: any; postsCount: number } = {
    posts: null,
    postsCount: 0,
  };

  try {
    favPosts = isAuthed
      ? usePosts("favorites", isAuthed)
      : favorites.length !== 0
      ? usePosts(`id=${favorites}`)
      : { posts: null, postsCount: 0 };
  } catch (err) {
    console.warn(err);
  }

  return (
    <>
      <Container style={{ flex: 0 }}>
        <Text style={{ ...styles.title, textAlign: "center" }}>
          {isAuthed ? userData.fullName : "Get Authed"}
        </Text>
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
        {favPosts?.postsCount === 0 && (
          <Text style={{ marginTop: 10, fontSize: 16 }}>No Favorite Post</Text>
        )}
      </Container>
      {favPosts?.postsCount !== 0 && favPosts.posts}
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
