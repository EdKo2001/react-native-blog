import { FC } from "react";
import { Pressable, StyleSheet, useWindowDimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { FontAwesome } from "@expo/vector-icons";
import RenderHtml from "react-native-render-html";

import { Text, View } from "./Themed";

import AccessibleImage from "./AccessibleImage";
import Button from "./Button";

import { BACKEND_URL } from "@env";

import { IPost } from "../../types/";

const Post: FC<IPost> = (props) => {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();

  return (
    <Pressable
      style={styles.post}
      // @ts-ignore
      onPress={() => navigation.navigate("TabTwo", props.slug)}
    >
      {props.imageUrl && (
        <AccessibleImage
          src={BACKEND_URL + props.imageUrl}
          alt={props.title}
          width="100%"
          height={200}
          style={styles.image}
        />
      )}
      <Text style={styles.title}>{props.title}</Text>
      <RenderHtml
        contentWidth={width}
        baseStyle={styles.desc}
        source={{ html: props.excerpt?.replace(/(<([^>]+)>)/gi, "")! }}
      />
      <View style={styles.metaWrapper}>
        <View style={{ ...styles.meta, marginLeft: 0 }}>
          <FontAwesome name="eye" size={20} color="black" />
          <Text style={styles.meta.metaItem}>{props.viewsCount}</Text>
        </View>
        <View style={styles.meta}>
          <FontAwesome name="commenting-o" size={20} color="black" />
          <Text style={styles.meta.metaItem}>{props.commentsCount}</Text>
        </View>
        <View style={styles.meta}>
          <FontAwesome name="heart-o" size={20} color="black" />
          <Text style={styles.meta.metaItem}>{props.likesCount}</Text>
        </View>
        {/* <Text style={styles.metaWrapper.meta}>
          1 <FontAwesome name="heart" size={20} color="black" />
        </Text> */}
      </View>
      <Button
        title="Read More"
        // @ts-ignore
        onPress={() => navigation.navigate("TabTwo", props.slug)}
        style={styles.button}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  post: {
    marginBottom: 30,
  },
  image: {},
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  desc: {
    fontSize: 16,
  },
  metaWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  meta: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
    metaItem: {
      fontSize: 16,
      marginLeft: 5,
    },
  },
  button: {
    maxWidth: "50%",
  },
});

export default Post;
