import { useState } from "react";
import { StyleSheet, TextInput, Pressable } from "react-native";

import Button from "../components/Reusables/Button";
import Container from "../components/Reusables/Container";
import Modal from "../components/Reusables/Modal";
import { View, Text } from "../components/Reusables/Themed";

import { useGlobalContext } from "../context/GlobalContext";

import usePosts from "../hooks/usePosts";

import { RootTabScreenProps } from "../types";

const TabFourScreen = ({ navigation }: RootTabScreenProps<"TabFour">) => {
  const [isModalVisible, setModalVisible] = useState(true);
  const [number, onChangeNumber] = useState("");
  const { favorites } = useGlobalContext();
  const posts = favorites.length > 0 && usePosts(`id=${favorites}`);

  return (
    <>
      <Container style={{ flex: 0 }}>
        <Text style={{ ...styles.title, textAlign: "center" }}>Get Authed</Text>
        <View style={styles.ctaButtons} foreground>
          <Button title="Sign in" onPress={() => setModalVisible(true)} />
          <Button title="Sign Up" onPress={() => {}} />
          {/* <Button title="Sign Out" onPress={() => {}} /> */}
        </View>
        <Text style={[styles.title, { marginBottom: 0 }]}>Favorites Posts</Text>
        {favorites.length === 0 && (
          <Text style={{ marginTop: 10, fontSize: 16 }}>No Favorite Post</Text>
        )}
      </Container>
      {favorites.length > 0 && posts}
      <Modal
        isOpen={isModalVisible}
        setOpen={(state: boolean) => setModalVisible(state)}
      >
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="useless placeholder"
          keyboardType="numeric"
        />
      </Modal>
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default TabFourScreen;
