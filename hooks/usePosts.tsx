import { useState, useEffect } from "react";
import { ActivityIndicator, FlatList } from "react-native";
import { useIsFocused } from "@react-navigation/native";

import { Text, View, Post, Container } from "../components/Reusables";

import { useGlobalContext } from "../context/GlobalContext";

import { axios } from "../utils";

import { IPost } from "../types/";

const usePosts = (options?: string, isSecured?: boolean, limit = 3) => {
  const isFocused = useIsFocused();
  // const [urlParameters, setUrlParameters] = useState(options);
  const [postsData, setPostsData] = useState([]);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const [postCb, setPostCb] = useState(false);

  const { token } = useGlobalContext();

  useEffect(() => {
    setLoading(true);
    const getPosts = async () => {
      try {
        const allPosts = await axios.get(
          `/posts?${options}&limit=${limit}`,
          isSecured && {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setPostsData(allPosts.data);
        setPosts(allPosts.data.results);
      } catch (err) {
        //@ts-ignore
        console.warn(err.response.data);
        //@ts-ignore
        alert(err.response.data.message);
      }
      setLoading(false);
    };
    getPosts();

    !isFocused && setPage(1);
  }, [isFocused, postCb]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const allPosts = await axios.get(
          `/posts?${options}&page=${page}&limit=${limit}`,
          isSecured && {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
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

  return {
    postsCount: posts.length,
    posts: (
      <Container>
        {posts.length === 0 ? (
          <ActivityIndicator
            style={{ flex: 1, alignItems: "center" }}
            size="large"
          />
        ) : (
          <FlatList
            contentContainerStyle={{ flexGrow: 1 }}
            data={posts}
            renderItem={({ item }) => (
              <Post
                {...item}
                onLike={() => setPostCb((prevState) => !prevState)}
              />
            )}
            ListFooterComponent={renderFooter}
            ListEmptyComponent={renderEmpty}
            onEndReachedThreshold={0.2}
            onEndReached={fetchMoreData}
          />
        )}
      </Container>
    ),
  };
};

export default usePosts;
