import MarkdownDisplay from '../../../components/core/MarkdownDisplay';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
} from 'react-native';
import { Stack } from 'expo-router';
import { useState } from 'react';

const template = `# 🎉 Fun with Markdown!

## 🚀 Introduction
Welcome to this **fun and exciting** markdown guide! Let's dive into the world of Markdown and discover how it makes text formatting cool and easy!

## 🎈 Basics: Add Some Flair

- **Bold and Beautiful:** Make your text stand out! Use \`**\` or \`__\`. Example: **Look at me!**
- *Sassy Italics:* Add a slant with \`*\` or \`_\`. Example: *I'm leaning!*

### 🍔 Let's List Some Fun Things!

1. 🌟 Star gazing
2. 🏖 Beach parties
3. 🍕 Pizza nights

- 🎮 Video games
- 📚 Reading a good book
- 🧘 Yoga time

## 🌈 Advanced Fun

### 🖼 Adding Images and Links

A cute pic: 

![Cute Cat](https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/6.jpg)

Visit a fun site: [Fun Site](https://example.com)

### 🎶 Code Block Party

\`\`\`javascript
// JavaScript party trick
function partyTime() {
    console.log("Let's dance 💃🕺!");
}
\`\`\`

## 🎤 Conclusion
Markdown is not just for formatting; it's for having fun while expressing yourself! Keep exploring and enjoy the markdown party! 🎊

> Enjoy crafting your own fun markdown documents! 🎨🎉
`;

const MarkdownEditor = () => {
  const [content, setContent] = useState(template);
  const [tab, setTab] = useState('preview');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.tabsContainer}>
        <Pressable
          onPress={() => setTab('edit')}
          style={[
            styles.tab,
            {
              backgroundColor: tab === 'edit' ? 'lightblue' : 'gray',
            },
          ]}
        >
          <Text style={styles.tabText}>Edit</Text>
        </Pressable>
        <Pressable
          style={[
            styles.tab,
            {
              backgroundColor:
                tab === 'preview' ? 'lightblue' : 'gray',
            },
          ]}
          onPress={() => setTab('preview')}
        >
          <Text style={styles.tabText}>Preview</Text>
        </Pressable>
      </View>
      {tab === 'edit' ? (
        <TextInput
          value={content}
          multiline
          style={styles.input}
          onChangeText={setContent}
        />
      ) : (
        <MarkdownDisplay>{content}</MarkdownDisplay>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    backgroundColor: 'whitesmoke',
    borderRadius: 10,
    padding: 20,
    paddingTop: 20,
    fontSize: 16,
  },
  tabsContainer: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  tab: {
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    flex: 1,
    borderRadius: 10,
    alignItems: 'center',
  },
  tabText: {
    fontFamily: 'InterBold',
  },
});

export default MarkdownEditor;
