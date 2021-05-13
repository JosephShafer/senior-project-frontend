import React, { useEffect, useState } from 'react';
import { Button, Linking, View, Text, StyleSheet, FlatList, SectionList, StatusBar } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import config from '../config.json';
import { callWebCrawler } from '../utility_functions/ApiSend.js';


function ResultsScreen({ route, navigation }) {
  const [productsTitles, setProductsTitles] = useState(route.params.products);
  const [projectTitles, setProjectsTitles] = useState(route.params.projects);

  const [DATA, setDATA] = useState([
    { title: "Products", data: productsTitles },
    { title: "Projects", data: projectTitles }
  ]);
  const [listToUpdate, updateList] = useState(false);

  let filter = (arrayToFilter) => {
    for (let i in arrayToFilter) {
      let linkString = arrayToFilter[i];
      linkString = linkString.replace(/-/g, ' ')
      linkString = linkString.split('/')
      let changed = false;
      for (let j in linkString) {
        //console.log(linkString[j])
        if (linkString[j].includes(' ')) {
          //console.log(linkString[j])
          linkString[j] = linkString[j].split('?')
          linkString = linkString[j][0]
          changed = true;
          break;
        }
      }
      if (changed === false) {
        linkString = linkString[2].replace('www.', '').replace('.com', '');
        linkString += " project"
      }
      arrayToFilter[i] = { "link": arrayToFilter[i], "extractedTitle": decodeURIComponent(linkString) }
    }
    console.log(arrayToFilter)
    return arrayToFilter;
  }


  // updates once
  useEffect(() => {
    callWebCrawler(route.params.searchTerm)
      .then((res) => {
        let filteredProducts = filter(res.products);
        let filteredProjects = filter(res.projects);

        setProductsTitles(filteredProducts);
        setProjectsTitles(filteredProjects);
        setDATA([
          { title: "Products", data: productsTitles },
          { title: "Projects", data: projectTitles }
        ]
        )
      }
      )
      .then(() => {
        updateList(true)
        console.log(DATA)
        console.log(listToUpdate)
      })
      .catch(e => console.log(e))
  }, [listToUpdate])




  return (
    <View>
      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => <Button
         title={`${item['extractedTitle']}`} 
         onPress={() => WebBrowser.openBrowserAsync(`${item['link']}`)}
         />}
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
