import { useState, useEffect } from "react";
import { ActivityIndicator, FlatList } from "react-native";
import { useIsFocused } from "@react-navigation/native";

import { Text, View } from "../components/Reusables/Themed";
import Post from "../components/Reusables/Post";
import Container from "../components/Reusables/Container";

import { axios } from "../utils";

import { IPost } from "../types/";

const usePosts = (options?: string, limit = 3) => {
  const isFocused = useIsFocused();
  // const [urlParameters, setUrlParameters] = useState(options);
  const [postsData, setPostsData] = useState([]);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    const getPosts = async () => {
      try {
        const allPosts = await axios.get(`/posts?${options}&limit=${limit}`);
        setPostsData(allPosts.data);
        setPosts(allPosts.data.results);
      } catch (err) {
        console.warn(err);
      }
      setLoading(false);
    };
    getPosts();

    !isFocused && setPage(1);
  }, [isFocused]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const allPosts = await axios.get(
          `/posts?${options}&page=${page}&limit=${limit}`
        );
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
    if (postsData.next && !isLoading) {
      setPage((prevPage) => ++prevPage);
      setLoading(true);
    }
  };

  const renderFooter = () => (
    <View style={{ backgroundColor: "transparent" }}>
      {isLoading && (
        <ActivityIndicator style={{ marginVertical: 10 }} size="large" />
      )}
      {/* @ts-ignore */}
      {!postsData.next && (
        <Text style={{ textAlign: "center" }}>
          No more articles at the moment
        </Text>
      )}
    </View>
  );

  const renderEmpty = () => (
    <Text style={{ textAlign: "center" }}>No Data at the moment</Text>
  );

  return (
    <Container style={{ backgroundColor: "lighgrey" }}>
      {posts.length === 0 ? (
        <ActivityIndicator
          style={{ flex: 1, alignItems: "center" }}
          size="large"
        />
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

export default usePosts;
