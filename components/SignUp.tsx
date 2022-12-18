import React, { FC, useState } from "react";
import { TextInput, StyleSheet } from "react-native";

import { useForm, Controller } from "react-hook-form";

import { Text, Modal, Button } from "./Reusables";

import { useGlobalContext } from "../context/GlobalContext";

import { ISignUp } from "../types";

const SignUp: FC<ISignUp> = ({ isOpen, setOpen }) => {
  const [isEmailValid, setEmailValid] = useState(true);

  const { authSignUp } = useGlobalContext();

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
    watch,
    getValues,
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) =>
    isEmailValid &&
    getValues("password") === getValues("confirmPassword") &&
    authSignUp(data.fullName, data.email, data.password)
      .then(() => (setOpen(false), alert("Successfully registered")))
      .catch((err) => console.warn(err));

  return (
    <Modal
      isOpen={isOpen}
      setOpen={(state: boolean) => setOpen(state)}
      title="Sign Up"
    >
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <Text style={styles.label}>Full name</Text>
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          </>
        )}
        name="fullName"
      />
      {errors.fullName! && (
        <Text style={[styles.label, styles.errorMessage]}>
          This is required.
        </Text>
      )}

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
      {errors.password! && (
        <Text style={[styles.label, styles.errorMessage]}>
          This is required.
        </Text>
      )}

      <Controller
        control={control}
        rules={{
          required: true,
          validate: (val: string) => {
            if (watch("password") != val) {
              return "Your passwords do no match";
            }
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry
            />
          </>
        )}
        name="confirmPassword"
      />
      {errors.confirmPassword! && (
        <Text style={[styles.label, styles.errorMessage]}>
          {errors.confirmPassword?.message !== ""
            ? errors.confirmPassword?.message
            : "This is required."}
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
    maxWidth: "70%",
  },
  submit: {
    marginTop: 15,
  },
});

export default SignUp;
