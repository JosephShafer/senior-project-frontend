import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import * as Linking from 'expo-linking';

function ResultsScreen() {
  const [results, setResultText] = useState([]);

  useEffect(() => {
    const getJson = async () => {
      const url = "https://jsonplaceholder.typicode.com/posts";
      try {
        let response = await fetch(url);
        let fetchData = await response.json();
        console.log("fetch successful");
        setResultText(fetchData);
      } catch (error) {
        console.log("Could not retrieve");
        console.error(error);
      }
    };
    getJson();
  }, []);

  const pressHandler = (id) => {
    console.log(id);
    Linking.openURL('http://google.com');
  }

  // https://www.youtube.com/watch?v=IuYo009yc8w
  return (
    <View>
    {/* TODO: add on scroll down disappear, on scrollup reappear */}
      <TextInput
        style={styles.myTextInput}
        placeholder={'Filter By'}
      ></TextInput>
      <FlatList
        style={styles.myList}
        data={results}
        keyExtractor={(item) => 'key' + item.id}
        renderItem={({ item }) =>
        <TouchableOpacity onPress={() => pressHandler(item.id)}>
          <Text style={styles.item}>
            {`Title: ${item.title}`}
          </Text>
        </TouchableOpacity>
        }
      >
      </FlatList>
    </View>
  );
};

// Todo style better
const styles = StyleSheet.create({
  myTextInput: {
    height: 50,
    borderColor: 'black',
    borderWidth: 1,
    marginTop: 10
  },
  myList: {
    marginTop: 20,
  },
  item: {
    marginTop: 10,
    fontSize: 20,
  }
})

export default ResultsScreen;