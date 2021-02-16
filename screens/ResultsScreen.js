import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

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

  // https://www.youtube.com/watch?v=IuYo009yc8w
  return (
    <View style={{paddingTop:40}}>
      <FlatList
        data={results}
        keyExtractor={(item) => 'key' + item.id}
        renderItem={({ item }) =>
          <Text>
            {`Title: ${item.title}`}
          </Text>
        }
      >
      </FlatList>
    </View>
  );
};

// Todo style better


export default ResultsScreen;
