import { usePosts } from "../hooks";

import { RootTabScreenProps } from "../types";

const TabOneScreen = ({ navigation }: RootTabScreenProps<"TabOne">) => {
  const posts = usePosts().posts;

  return posts;
};

export default TabOneScreen;
