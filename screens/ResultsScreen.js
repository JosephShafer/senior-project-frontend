import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, SectionList, StatusBar } from 'react-native';
import config from '../config.json';
import { callWebCrawler } from './ApiSend.js';




function ResultsScreen({ route, navigation }) {
  const [productsResults, setResultText] = useState(route.params.products);
  const [projectResults, setProjectsText] = useState(route.params.projects);
  const [DATA, setDATA] = useState([
    { title: "Products", data: productsResults },
    { title: "Projects", data: projectResults }
  ]);
  const [listToUpdate, updateList] = useState(false);


  // updates once
  useEffect(() => {
    callWebCrawler(route.params.searchTerm)
      .then((res) => {
        // console.log(res)
        setResultText(res.products);
        setProjectsText(res.projects);
        setDATA([ 
          { title: "Products", data: productsResults },
          { title: "Projects", data: projectResults }
        ]
        )}
      )
      .then(() => {
        updateList(true)
        console.log(listToUpdate)
      })
      .catch(e => console.log(e))
  }, [listToUpdate])

  // updates on timer
  // const [time, setTime] = useState(0);
  // useEffect(() => {
  //   const timer = setTimeout(() => { 
  //     setTime(time + 1);
  //   }, 5000);

  //   callWebCrawler(route.params.searchTerm)
  //     .then((res) => {
  //       console.log(res)
  //       setResultText(res.products);
  //       setProjectsText(res.projects);
  //       setDATA([
  //         { title: "Products", data: productsResults },
  //         { title: "Projects", data: projectResults }
  //       ]
  //       )
  //     }
  //     ).catch(e => console.log(e))
  //   return () => {
  //     clearTimeout(timer);
  //   }
  // }, [time])



  return (
    <View>
      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => <Text>
          {`${item}`}
        </Text>}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
        extraData={listToUpdate}
      // refreshing={true}
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
