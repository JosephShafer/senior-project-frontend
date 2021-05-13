import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import LoginContext from '../utility_functions/context';
import config from '../config.json';
import { callWebCrawler } from '../utility_functions/ApiSend.js';
import filter from '../utility_functions/filter';
import getEmail from '../utility_functions/getEmail';

import styles from '../styles/ResultStyles';

function ProductsResults({ route }) {
  const [productsTitles, setProductsTitles] = useState(route.params.products);
  const [listToUpdate, updateList] = useState(false);

  const globToken = React.useContext(LoginContext);

  useEffect(() => {
    let userEmail = '';
    let resultsArray = [];
    let resultExists = false;
    if (globToken !== "empty") {
      getEmail(globToken)
        .then((res) => {
          userEmail = res;
          const url = config.myIP.address + 'searchhistory';
          let emailInMongo = false;
          fetch(url)
            .then(response => response.json())
            .then(data => {
              if (data) {
                console.log("data is:")
                console.log(data);
                //alert('Successful');
                //console.log(data);
                for (var i = 0; i < data.length; i++) {
                  if (userEmail === data[i].email) {
                    emailInMongo = true;
                    resultsArray.push(data[i].searchTerms);
                    resultExists = resultsArray[0].includes(route.params.searchTerm);
                    //console.log("BOOL"+resultExists);
                    //console.log(i+"#"+resultsArray);
                  }
                }
                if (emailInMongo === false) {
                  fetch(url, {
                    method: 'POST',
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      email: userEmail,
                      searchTerms: [route.params.searchTerm]
                    })
                  })
                    .then(response => response.json())
                    .then(data => {
                      if (data.success) {
                        //alert('Search List Creation successful');
                      }
                      else {
                        //alert('Failed! Search History Not Saved.');
                      }
                    })
                    .catch(e => console.log(e))
                }
                else if (emailInMongo === true && resultExists === false) {
                  fetch(url, {
                    method: 'PUT',
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      email: userEmail,
                      searchTerms: route.params.searchTerm
                    })
                  })
                    .then(response => response.json())
                    .then(data => {
                      if (data.success) {
                        //alert('Update successful');
                      }
                      else {
                        //alert('Failed Update.');
                      }
                    })
                    .catch(e => console.log(e))
                }
              }
              else {
                //alert('Failed! Search History Not Saved.');
              }
            })
            .catch(e => console.log(e))
        })
        .catch(e => console.log(e))
    }
  }, [])

  useEffect(() => {
    callWebCrawler(route.params.searchTerm)
      .then((res) => {
        let filteredProducts = filter(res.products);
        setProductsTitles(filteredProducts);
      }
      )
      .then(() => {
        updateList(true)
      })
      .catch(e => console.log(e))
  }, [])

  return (
    <View
      style={styles.container}
    >
      <FlatList
        data={productsTitles}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => <TouchableOpacity
          style={styles.card}
          title={`${item['extractedTitle']}`}
          onPress={() => WebBrowser.openBrowserAsync(`${item['link']}`)}
        >
          <Text
            style={styles.text}
          >{`${item['extractedTitle']}`}</Text>
        </TouchableOpacity>}
        extraData={listToUpdate}
      />

    </View>
  );

}


export default ProductsResults;
