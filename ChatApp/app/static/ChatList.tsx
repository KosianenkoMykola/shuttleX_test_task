import React from "react";
import { View, Text, Button, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../core/store";
import { addChat, deleteChat } from "../core/chatSlice";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface Props {
  navigation: NativeStackNavigationProp<any, any>;
}

const ChatList: React.FC<Props> = ({ navigation }) => {
  const chats = useSelector((state: RootState) => state.chat.chats);
  const dispatch = useDispatch();

  const createChat = () => {
    const newChat = {
      id: String(Date.now()),
      name: "New Chat",
      messages: [],
      creator: "user1", // Replace with actual user identifier
    };
    dispatch(addChat(newChat));
  };

  const deleteSelectedChat = (chatId: string) => {
    dispatch(deleteChat(chatId));
  };

  const navigateToChat = (chatId: string) => {
    navigation.navigate("Chat", { chatId });
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10 }}>
            <Text>{item.name}</Text>
            <Button
              title="Delete Chat"
              onPress={() => deleteSelectedChat(item.id)}
            />
            <Button
              title="Enter Chat"
              onPress={() => navigateToChat(item.id)}
            />
          </View>
        )}
      />
      <Button title="Create Chat" onPress={createChat} />
    </View>
  );
};

export default ChatList;
