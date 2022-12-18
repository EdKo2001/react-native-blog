import { Pressable } from "react-native";

import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {
  Entypo,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import { Text } from "../components/Reusables";

import { Colors } from "../constants";

import {
  TabOneScreen,
  TabTwoScreen,
  TabThreeScreen,
  NotFoundScreen,
  TabFourScreen,
  FullPostScreen,
} from "../screens";

import { ShareComponent } from "../components/Reusables";

import { useGlobalContext } from "../context/GlobalContext";

import { useColorScheme } from "../hooks";

import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types/";

import { FRONTEND_URL } from "@env";

export default function Navigation() {
  const colorScheme = useColorScheme();

  return (
    <NavigationContainer
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BottomTabNavigator"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FullPost"
        component={FullPostScreen}
        options={({ route }) => ({
          //@ts-ignore
          title: route.params?.title,
          headerRight: () => (
            <ShareComponent
              //@ts-ignore
              url={FRONTEND_URL + "/posts/" + route.params?.slug}
              //@ts-ignore
              title={route.params?.title}
            />
          ),
        })}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
    </Stack.Navigator>
  );
};

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

const BottomTabNavigator = () => {
  const colorScheme = useColorScheme();

  const { switchTheme } = useGlobalContext();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme]?.tint,
        tabBarStyle: {
          height: 50,
          paddingBottom: 5,
        },
        headerRight: () => (
          <Pressable
            onPress={() =>
              switchTheme(colorScheme === "light" ? "dark" : "light")
            }
            style={({ pressed }) => ({
              flexDirection: "row",
              alignItems: "center",
              marginRight: 15,
              opacity: pressed ? 0.5 : 1,
            })}
          >
            {colorScheme === "dark" ? (
              <>
                <Text style={{ marginRight: 10 }}>Light</Text>
                <Entypo name="light-up" size={24} color={Colors.dark.text} />
              </>
            ) : (
              <>
                <Text style={{ marginRight: 10 }}>Dark</Text>
                <FontAwesome
                  name="moon-o"
                  size={24}
                  color={Colors.light.text}
                />
              </>
            )}
          </Pressable>
        ),
      }}
    >
      <BottomTab.Screen
        name="TabOne"
        component={TabOneScreen}
        options={({ navigation }: RootTabScreenProps<"TabOne">) => ({
          title: "Latest",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="newspaper-o" color={color} />
          ),
        })}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoScreen}
        options={{
          title: "Popular",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="eye" size={24} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="TabThree"
        component={TabThreeScreen}
        options={{
          title: "Relevant",
          tabBarIcon: ({ color }) => <TabBarIcon name="star" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="TabFour"
        component={TabFourScreen}
        options={{
          title: "Account",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account"
              size={24}
              color={color}
              style={{ marginBottom: -3 }}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
const TabBarIcon = (props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) => {
  return <FontAwesome size={24} style={{ marginBottom: -3 }} {...props} />;
};
