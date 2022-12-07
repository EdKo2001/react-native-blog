import { useState, useEffect } from "react";
import { ActivityIndicator, FlatList } from "react-native";
import { useIsFocused } from "@react-navigation/native";

import { Text, View } from "../components/Reusables/Themed";
import Post from "../components/Reusables/Post";
import Container from "../components/Reusables/Container";
import Button from "../components/Reusables/Button";

import { axios } from "../utils";

import { RootTabScreenProps } from "../types";
import { IPost } from "../types/";

const limit = 3;

const TabOneScreen = ({ navigation }: RootTabScreenProps<"TabOne">) => {
  const isFocused = useIsFocused();
  const [postsData, setPostsData] = useState([]);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const allPosts = await axios.get(`/posts?limit=${limit}`);
        setPostsData(allPosts.data);
        setPosts(allPosts.data.results);
      } catch (err) {
        console.warn(err);
      }
      setLoading(false);
    };
    isFocused && getPosts();
    !isFocused &&
      (setPage(1), setPosts((prevPosts) => prevPosts.slice(0, limit)));
  }, [isFocused]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const allPosts = await axios.get(`/posts?page=${page}&limit=${limit}`);
        setPostsData(allPosts.data);
        setPosts((prevPosts) => [...prevPosts, ...allPosts.data.results]);
      } catch (err) {
        console.warn(err);
      }
      setLoading(false);
    };
    page !== 1 && getPosts();
  }, [page]);

  const fetchMoreData = () => {
    /* @ts-ignore */
    if (postsData.next && !postsData.loading) {
      setPage((prevPage) => ++prevPage);
    }
  };

  const renderFooter = () => (
    <View>
      {isLoading && <ActivityIndicator />}
      {/* @ts-ignore */}
      {!postsData.next && <Text>No more articles at the moment</Text>}
    </View>
  );

  const renderEmpty = () => (
    <View>
      <Text>No Data at the moment</Text>
      <Button title="Refresh" />
    </View>
  );

  return (
    <Container>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          contentContainerStyle={{ flexGrow: 1 }}
          data={posts}
          renderItem={({ item }) => <Post {...item} />}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={renderEmpty}
          onEndReachedThreshold={0.2}
          onEndReached={fetchMoreData}
        />
      )}
    </Container>
  );
};

export default TabOneScreen;
