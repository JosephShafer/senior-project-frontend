// Used to test Results screen style without depending on the camera path

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, SectionList, StatusBar  } from 'react-native';
import config from '../config.json';


function ResultsTestScreen({ route, navigation }) {
  const [productsResults, setResultText] =
    useState([
      "https://www.kaplanco.com/product/63826/natural-wooden-loose-parts-kit?c=11%7CAR1045",
      "https://www.kaplanco.com/product/88902/natural-wood-craft-sticks?c=11%7CAR1045",
      "https://www.kaplanco.com/product/200125/unfinished-wood-cars-12-pieces?c=11%7CAR1045",
      "https://www.kaplanco.com/product/30408/wooden-colored-craft-shapes-400-pieces?c=11%7CAR1045",
      "https://www.kaplanco.com/product/32884/natural-wood-turnings-5-lbs?c=11%7CAR1045",
      "https://www.kaplanco.com/product/200187/unfinished-wood-circles-500-pieces?c=11%7CAR1045",
      "https://www.kaplanco.com/product/30096/colored-wood-party-shapes?c=11%7CAR1045",
      "https://www.kaplanco.com/product/33920P/colored-jumbo-wood-craft-sticks?c=11%7CAR1045",
      "https://www.kaplanco.com/product/88926/wooden-craft-pieces-350?c=11%7CAR1045",
      "https://www.kaplanco.com/product/32864/giant-wooden-shapes-set-of-60?c=11%7CAR1045",
      "https://www.kaplanco.com/product/200084/wooden-spring-clothespins-48-pieces?c=11%7CAR1045",
      "https://www.kaplanco.com/product/30373/wooden-geometric-shapes?c=11%7CAR1045",
      "https://www.kaplanco.com/product/200020/diy-unfinished-wood-hand-note-holders-12-pieces?c=11%7CAR1045",
      "https://www.kaplanco.com/product/29163/wooden-dowels-set-of-12?c=11%7CAR1045",
      "https://www.kaplanco.com/product/32319/wooden-craft-spools-144-pieces?c=11%7CAR1045"
    ]);
  const [projectResults, setProjectsText] = useState([
    "https://www.kaplanco.com/projects/63826/natural-wooden-loose-parts-kit?c=11%7CAR1045",
    "https://www.kaplanco.com/projects/88902/natural-wood-craft-sticks?c=11%7CAR1045",
    "https://www.kaplanco.com/projects/200125/unfinished-wood-cars-12-pieces?c=11%7CAR1045",
    "https://www.kaplanco.com/projects/30408/wooden-colored-craft-shapes-400-pieces?c=11%7CAR1045",
    "https://www.kaplanco.com/projects/32884/natural-wood-turnings-5-lbs?c=11%7CAR1045",
    "https://www.kaplanco.com/projects/200187/unfinished-wood-circles-500-pieces?c=11%7CAR1045",
    "https://www.kaplanco.com/projects/30096/colored-wood-party-shapes?c=11%7CAR1045",
    "https://www.kaplanco.com/projects/33920P/colored-jumbo-wood-craft-sticks?c=11%7CAR1045",
    "https://www.kaplanco.com/projects/88926/wooden-craft-pieces-350?c=11%7CAR1045",
    "https://www.kaplanco.com/projects/32864/giant-wooden-shapes-set-of-60?c=11%7CAR1045",
    "https://www.kaplanco.com/projects/200084/wooden-spring-clothespins-48-pieces?c=11%7CAR1045",
    "https://www.kaplanco.com/projects/30373/wooden-geometric-shapes?c=11%7CAR1045",
    "https://www.kaplanco.com/projects/200020/diy-unfinished-wood-hand-note-holders-12-pieces?c=11%7CAR1045",
    "https://www.kaplanco.com/projects/29163/wooden-dowels-set-of-12?c=11%7CAR1045",
    "https://www.kaplanco.com/projects/32319/wooden-craft-spools-144-pieces?c=11%7CAR1045"]);
  const DATA = [{ title: "Products", data: productsResults }, { title: "Projects", data: projectResults }];

  console.log(DATA)

  // https://www.youtube.com/watch?v=IuYo009yc8w
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
