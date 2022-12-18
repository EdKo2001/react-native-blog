import React, { FC } from "react";
import { Pressable, StyleSheet } from "react-native";

import { FontAwesome } from "@expo/vector-icons";

import { Text, useThemeColor, View } from "./Themed";

import { useGlobalContext } from "../../context/GlobalContext";

interface IPostMeta {
  viewsCount: number;
  likesCount: number;
  commentsCount: number;
  _id: number;
  slug: string;
  likes?: { _id: string; user: string; createdAt: string }[];
  onLike?: () => void;
}

const PostMeta: FC<IPostMeta> = (props) => {
  const { viewsCount, likesCount, likes, commentsCount, _id, slug, onLike } =
    props;

  const { setFavorite, isFavorite } = useGlobalContext();

  const color = useThemeColor({ light: undefined, dark: undefined }, "text");

  return (
    <View style={styles.metaWrapper}>
      <View style={[styles.meta, { marginLeft: 0 }]}>
        <FontAwesome name="eye" size={20} color={color} />
        <Text style={styles.meta.metaItem}>{viewsCount}</Text>
      </View>
      <View style={styles.meta}>
        <FontAwesome name="commenting-o" size={20} color={color} />
        <Text style={styles.meta.metaItem}>{commentsCount}</Text>
      </View>
      <Pressable
        onPress={() => (setFavorite(_id!, slug, likes), onLike?.())}
        style={styles.meta}
      >
        <FontAwesome
          name={isFavorite(_id!, likes) ? "heart" : "heart-o"}
          size={20}
          color={isFavorite(_id!, likes) ? "red" : color}
        />
        <Text style={styles.meta.metaItem}>{likesCount}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  metaWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    backgroundColor: "transparent",
  },
  meta: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
    backgroundColor: "transparent",
    metaItem: {
      fontSize: 16,
      marginLeft: 5,
    },
  },
});

export default PostMeta;
