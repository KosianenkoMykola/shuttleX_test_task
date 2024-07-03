import React from "react";
import { View, Text, FlatList } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "../core/store";

type RootStackParamList = {
  ChatList: undefined;
  Chat: { chatId: string };
};

type ChatScreenRouteProp = RouteProp<RootStackParamList, "Chat">;

interface Props {
  route: {
    params: {
      chatId: string;
    };
  };
}

const Chat: React.FC<Props> = ({ route }) => {
  const { chatId } = route.params;
  const chat = useSelector((state: RootState) =>
    state.chat.chats.find((chat) => chat.id === chatId)
  );

  if (!chat) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Chat not found</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
        {chat.name}
      </Text>
      <FlatList
        data={chat.messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            style={{ padding: 10, backgroundColor: "#f0f0f0", marginBottom: 5 }}
          >
            <Text>{item}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default Chat;
