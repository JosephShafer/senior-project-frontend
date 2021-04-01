import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, SectionList, StatusBar  } from 'react-native';
import config from '../config.json';


function ResultsScreen({ route, navigation }) {
  const [productsResults, setResultText] = useState(route.params.products);
  const [projectResults, setProjectsText] = useState(route.params.projects);
  const DATA = [{ title: "Products", data: productsResults }, { title: "Projects", data: projectResults }];

  return (
    <View>
      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) =>  <Text>
            {`${item}`}
          </Text>}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
      />
    </View>
  );
};

// Todo style better
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8
  },
  header: {
    fontSize: 32,
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 24
  }
});

export default ResultsScreen;
