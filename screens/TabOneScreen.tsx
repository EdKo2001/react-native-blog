import Button from "../components/Reusables/Button";

import { usePosts } from "../hooks";

import { RootTabScreenProps } from "../types";

const TabOneScreen = ({ navigation }: RootTabScreenProps<"TabOne">) => {
  const posts = usePosts();

  return (
    <>
      <Button onPress={() => {}} />
      {posts}
    </>
  );
};

export default TabOneScreen;
