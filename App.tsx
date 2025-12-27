import { EventEmitter } from 'events';
import { useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { AppleLLMSession } from 'react-native-apple-llm';

export default function App() {
  const [response, setResponse] = useState('');

  const testLLM = async () => {
    const eventEmitter = new EventEmitter();
    function handleEvent(chunk: string) {
      setResponse(prev => prev + chunk);
    }

    try {
      setResponse('');
      const session = new AppleLLMSession();
      await session.configure({
        instructions: 'You are an amazing storyteller.',
      });
      eventEmitter.addListener('data', handleEvent);
      const result = await session.generateText({
        prompt: 'Tell me a story',
        stream: eventEmitter,
      });

      console.log('LLM Response:', result);

      //setResponse(result);
    } catch (error) {
      setResponse(`Error: ${error}`);
    } finally {
      eventEmitter.removeListener('data', handleEvent);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Test Apple LLM" onPress={testLLM} />
      <ScrollView
        style={{
          maxHeight: 400,
          marginTop: 20,
          padding: 5,
          borderWidth: 1,
          borderColor: 'gray',
        }}
      >
        <Text style={styles.text}>{response}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  text: {
    color: 'red',
    textAlign: 'center',
  },
});
