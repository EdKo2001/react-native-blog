import React, { FC } from "react";
import { StyleSheet, Modal as ModalComponent, Pressable } from "react-native";

import { AntDesign } from "@expo/vector-icons";

import { Text, View } from "./Themed";

import IModal from "../../types/Modal.interface";

const Modal: FC<IModal> = ({ isOpen, setOpen, children, title }) => {
  return (
    <ModalComponent
      animationType="slide"
      transparent={true}
      visible={isOpen}
      onRequestClose={() => {
        setOpen(!isOpen);
      }}
    >
      <Pressable style={styles.centeredView} onPress={() => setOpen(false)}>
        <View style={styles.modalView}>
          <Pressable
            style={{ marginLeft: "auto", marginTop: -15, marginRight: -15 }}
            onPress={() => setOpen(false)}
          >
            <AntDesign name="close" size={24} color="black" />
          </Pressable>
          {title && <Text style={styles.title}>{title}</Text>}
          {children}
        </View>
      </Pressable>
    </ModalComponent>
  );
};

export default Modal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255 ,255, 255, 0.55)",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 4,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
