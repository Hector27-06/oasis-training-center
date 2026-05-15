import AsyncStorage from "@react-native-async-storage/async-storage";

const USER_KEY = "registered_user";

export type LocalUser = {
  name: string;
  email: string;
  password: string;
};

export const saveRegisteredUser = async (user: LocalUser) => {
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getRegisteredUser = async () => {
  const user = await AsyncStorage.getItem(USER_KEY);

  if (!user) {
    return null;
  }

  return JSON.parse(user) as LocalUser;
};

export const removeRegisteredUser = async () => {
  await AsyncStorage.removeItem(USER_KEY);
};
