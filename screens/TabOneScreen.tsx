import { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { useIsFocused } from "@react-navigation/native";

import { View } from "../components/Reusables/Themed";
import Post from "../components/Reusables/Post";
import Container from "../components/Reusables/Container";

import { axios } from "../utils";

import { RootTabScreenProps } from "../types";
import { IPost } from "../types/";

const TabOneScreen = ({ navigation }: RootTabScreenProps<"TabOne">) => {
  const isFocused = useIsFocused();
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const allPosts = await axios.get("/posts");
        setPosts(allPosts.data.results);
      } catch (err) {
        console.log(err);
      }
    };
    if (isFocused) getPosts();
  }, [isFocused]);

  return (
    <ScrollView>
      <Container>
        {posts.map((post, idx) => (
          <Post key={`post-${idx}`} {...post} />
        ))}
      </Container>
    </ScrollView>
  );
};

export default TabOneScreen;
