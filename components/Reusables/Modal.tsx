import React, { FC } from "react";
import { StyleSheet } from "react-native";
import { Modal as ModalComponent, TextInput, Pressable } from "react-native";

import { View } from "./Themed";

import IModal from "../../types/Modal.interface";

const Modal: FC<IModal> = ({ isOpen, setOpen, children }) => {
  return (
    <ModalComponent
      animationType="slide"
      transparent={true}
      visible={isOpen}
      onRequestClose={() => {
        setOpen(!isOpen);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>{children}</View>
      </View>
    </ModalComponent>
  );
};

export default Modal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "transparent",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
