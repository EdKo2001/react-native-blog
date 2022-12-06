import { FC } from "react";
import { Alert, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Text, TextProps, View } from "./Themed";

import AccessibleImage from "./Reusables/AccessibleImage";

import { IPost } from "../types/";

const Post: FC<IPost> = (props) => {
  const navigation = useNavigation();

  return (
    <View>
      <AccessibleImage src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png" />
      <Text>Title</Text>
      <Text>Desc</Text>
      <Button title="Press me" onPress={() => navigation.navigate("TabTwo")} />
    </View>
  );
};

export default Post;
