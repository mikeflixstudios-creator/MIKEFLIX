import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { chats, type Chat } from './src/mockData';

const appColors = {
  dark: {
    background: '#0f172a',
    panel: '#111827',
    panelAlt: '#1f2937',
    primary: '#22c55e',
    primarySoft: '#14532d',
    text: '#f8fafc',
    textSoft: '#cbd5e1',
    muted: '#64748b',
    accent: '#38bdf8',
    bubbleMe: '#14532d',
    bubbleThem: '#1f2937',
    border: '#334155',
  },
  light: {
    background: '#f8fafc',
    panel: '#ffffff',
    panelAlt: '#e2e8f0',
    primary: '#16a34a',
    primarySoft: '#dcfce7',
    text: '#0f172a',
    textSoft: '#475569',
    muted: '#94a3b8',
    accent: '#0ea5e9',
    bubbleMe: '#dcfce7',
    bubbleThem: '#e2e8f0',
    border: '#cbd5e1',
  },
};

type ThemeMode = 'dark' | 'light';

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [selectedChatId, setSelectedChatId] = useState('maya');
  const [draft, setDraft] = useState('');
  const [chatData, setChatData] = useState(chats);

  const colors = appColors[theme];

  const selectedChat = useMemo(
    () => chatData.find((chat) => chat.id === selectedChatId) ?? chatData[0],
    [chatData, selectedChatId],
  );

  const sendMessage = () => {
    const value = draft.trim();
    if (!value || !selectedChat) return;

    const newMessage = {
      id: Date.now().toString(),
      sender: 'me',
      text: value,
      time: 'now',
    };

    const updated = chatData.map((chat) => {
      if (chat.id !== selectedChat.id) return chat;
      return {
        ...chat,
        lastMessage: value,
        lastSeen: 'now',
        messages: [...chat.messages, newMessage],
      };
    });

    setChatData(updated);
    setDraft('');
  };

  const renderChatItem = ({ item }: { item: Chat }) => {
    const isActive = item.id === selectedChat.id;

    return (
      <Pressable
        onPress={() => setSelectedChatId(item.id)}
        style={[
          styles.chatItem,
          {
            backgroundColor: isActive ? colors.panelAlt : colors.panel,
            borderColor: isActive ? colors.primary : colors.border,
          },
        ]}
      >
        <View
          style={[
            styles.avatar,
            {
              backgroundColor: item.color,
            },
          ]}
        >
          <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
        </View>

        <View style={styles.chatMeta}>
          <View style={styles.chatRow}>
            <Text style={[styles.chatName, { color: colors.text }]}>{item.name}</Text>
            <Text style={[styles.chatTime, { color: colors.muted }]}>{item.lastSeen}</Text>
          </View>

          <Text style={[styles.chatPreview, { color: colors.textSoft }]} numberOfLines={1}>
            {item.lastMessage}
          </Text>
        </View>

        {item.unread > 0 && (
          <View style={[styles.badge, { backgroundColor: colors.primary }]}>
            <Text style={styles.badgeText}>{item.unread}</Text>
          </View>
        )}
      </Pressable>
    );
  };

  const renderMessage = (message: { id: string; sender: 'me' | 'them'; text: string; time: string }) => {
    const isMe = message.sender === 'me';

    return (
      <View
        key={message.id}
        style={[
          styles.messageRow,
          { justifyContent: isMe ? 'flex-end' : 'flex-start' },
        ]}
      >
        <View
          style={[
            styles.messageBubble,
            {
              backgroundColor: isMe ? colors.bubbleMe : colors.bubbleThem,
              borderColor: colors.border,
            },
          ]}
        >
          <Text style={[styles.messageText, { color: colors.text }]}>{message.text}</Text>
          <Text style={[styles.messageTime, { color: colors.muted }]}>{message.time}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />

      <View style={[styles.app, { backgroundColor: colors.background }]}>
        <View style={[styles.header, { backgroundColor: colors.panel, borderColor: colors.border }]}>
          <View>
            <Text style={[styles.brand, { color: colors.text }]}>MIKEFLIX</Text>
            <Text style={[styles.subBrand, { color: colors.primary }]}>Your social chat</Text>
          </View>

          <TouchableOpacity
            onPress={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            style={[styles.themeToggle, { backgroundColor: colors.primarySoft, borderColor: colors.border }]}
          >
            <Text style={[styles.themeToggleText, { color: colors.text }]}>{theme === 'dark' ? 'Light' : 'Dark'}</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.searchWrap, { backgroundColor: colors.panel, borderColor: colors.border }]}>
          <Text style={[styles.searchText, { color: colors.muted }]}>Search conversations</Text>
        </View>

        <View style={styles.mainContent}>
          <View style={[styles.chatListCard, { backgroundColor: colors.panel, borderColor: colors.border }]}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Messages</Text>
            <FlatList
              data={chatData}
              keyExtractor={(item) => item.id}
              renderItem={renderChatItem}
              showsVerticalScrollIndicator={false}
            />
          </View>

          <View style={[styles.chatDetail, { backgroundColor: colors.panel, borderColor: colors.border }]}>
            <View style={[styles.chatHeader, { borderColor: colors.border }]}>
              <View style={[styles.avatar, { backgroundColor: selectedChat.color }]}>
                <Text style={styles.avatarText}>{selectedChat.name.charAt(0)}</Text>
              </View>

              <View style={styles.chatHeaderMeta}>
                <Text style={[styles.chatName, { color: colors.text }]}>{selectedChat.name}</Text>
                <Text style={[styles.statusText, { color: colors.primary }]}>{selectedChat.online ? 'online' : 'offline'}</Text>
              </View>
            </View>

            <ScrollView style={styles.messagesList} showsVerticalScrollIndicator={false}>
              {selectedChat.messages.map((message) => renderMessage(message))}
            </ScrollView>

            <View style={[styles.inputBar, { borderColor: colors.border, backgroundColor: colors.panelAlt }]}>
              <TextInput
                value={draft}
                onChangeText={setDraft}
                placeholder="Type a message"
                placeholderTextColor={colors.muted}
                style={[styles.input, { color: colors.text }]}
              />
              <TouchableOpacity onPress={sendMessage} style={[styles.sendButton, { backgroundColor: colors.primary }]}>
                <Text style={styles.sendButtonText}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  app: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 18,
    borderWidth: 1,
    marginBottom: 12,
  },
  brand: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 1,
  },
  subBrand: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: '700',
  },
  themeToggle: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
  },
  themeToggleText: {
    fontWeight: '700',
  },
  searchWrap: {
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 14,
  },
  searchText: {
    fontSize: 14,
    fontWeight: '600',
  },
  mainContent: {
    flex: 1,
    gap: 12,
  },
  chatListCard: {
    flex: 0.48,
    borderWidth: 1,
    borderRadius: 18,
    padding: 12,
  },
  chatDetail: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 18,
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 8,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    padding: 10,
    marginBottom: 8,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 18,
  },
  chatMeta: {
    flex: 1,
  },
  chatRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  chatName: {
    fontSize: 15,
    fontWeight: '700',
  },
  chatTime: {
    fontSize: 11,
    fontWeight: '600',
  },
  chatPreview: {
    fontSize: 12,
  },
  badge: {
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    paddingHorizontal: 6,
  },
  badgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '800',
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
  },
  chatHeaderMeta: {
    marginLeft: 10,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
    marginTop: 2,
  },
  messagesList: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  messageRow: {
    flexDirection: 'row',
    marginVertical: 6,
  },
  messageBubble: {
    maxWidth: '76%',
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  messageTime: {
    fontSize: 10,
    marginTop: 6,
    textAlign: 'right',
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    paddingHorizontal: 12,
    fontSize: 15,
  },
  sendButton: {
    marginLeft: 8,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: '800',
  },
});
