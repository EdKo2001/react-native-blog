import React, { FC, useState } from "react";
import { TextInput, StyleSheet } from "react-native";

import { useForm, Controller } from "react-hook-form";

import { Text, Modal, Button } from "./Reusables";

import { useGlobalContext } from "../context/GlobalContext";

import { ISignIn } from "../types";

const SignIn: FC<ISignIn> = ({ isOpen, setOpen }) => {
  const [isEmailValid, setEmailValid] = useState(true);

  const { authSignIn } = useGlobalContext();

  const validateEmail = (email: string) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(email) === false) {
      setEmailValid(false);
    } else {
      setEmailValid(true);
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: { email: string; password: string }) =>
    isEmailValid &&
    authSignIn(data.email, data.password)
      .then(() => (setOpen(false), alert("Successfully logged in")))
      .catch((err) => console.warn(err));

  return (
    <Modal
      isOpen={isOpen}
      setOpen={(state: boolean) => setOpen(state)}
      title="Sign In"
    >
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(email) => (onChange(email), validateEmail(email))}
              value={value}
              keyboardType="email-address"
            />
          </>
        )}
        name="email"
      />
      {errors.email! && (
        <Text style={[styles.label, styles.errorMessage]}>
          This is required.
        </Text>
      )}
      {(!errors.email as any) && !isEmailValid && (
        <Text style={[styles.label, styles.errorMessage]}>
          Email is invalid.
        </Text>
      )}

      <Controller
        control={control}
        rules={{
          required: true,
          minLength: 5,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry
            />
          </>
        )}
        name="password"
      />
      {errors.password && (
        <Text style={[styles.label, styles.errorMessage]}>
          This is required.
        </Text>
      )}

      <Button
        title="Submit"
        style={styles.submit}
        onPress={handleSubmit(onSubmit)}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  label: {
    alignSelf: "flex-start",
    color: "black",
    marginBottom: -7,
  },
  input: {
    width: 250,
    height: 40,
    marginVertical: 15,
    borderWidth: 1,
    padding: 10,
  },
  errorMessage: {
    marginTop: -10,
    marginBottom: 15,
    color: "red",
  },
  submit: {
    marginTop: 15,
  },
});

export default SignIn;
