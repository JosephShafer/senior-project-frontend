import React, { useEffect, useState } from 'react';
import { Button, Linking, View, Text, StyleSheet, FlatList, SectionList, StatusBar, TouchableOpacity } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import loginContext from './context';
import config from '../config.json';
import { callWebCrawler } from './ApiSend.js';
import filter from './filter';
import ResultStyles from './ResultStyles';

function ProductsResults({ route, navigation }) {
  const [productsTitles, setProductsTitles] = useState(route.params.products);
  const [listToUpdate, updateList] = useState(false);


  const globToken = React.useContext(loginContext);
  //const [userEmail, setUserEmail] = useState("empty");
  let userEmail = '';
  let resultsArray = [];
  let resultExists = false;

  if (globToken['AuthOwner'] === 'Google') {

    useEffect(() => {
      fetch("https://content-people.googleapis.com/v1/people/me?personFields=names,emailAddresses", {
        "credentials": "include",
        "headers": {
          "Authorization": `Bearer ${globToken.params.access_token}`,
        },
        "method": "GET",
      })
        .then(response => response.json())
        .then(json => {
          //console.log("NAME HERE: "+json.names[0].displayName);
          //console.log("EMAIL HERE: "+json.emailAddresses[0].value);
          userEmail = json.emailAddresses[0].value;
        })
        .then(() => {
          const url = config.myIP.address + 'searchhistory';
          let emailFound = false;
          fetch(url)
            .then(response => response.json())
            .then(data => {
              if (data) {
                //alert('Successful');
                //console.log(data);
                for(var i = 0; i < data.length; i++) {
                  if(userEmail === data[i].email){
                    emailFound = true;
                    resultsArray.push(data[i].searchTerms);
                    resultExists = resultsArray[0].includes(route.params.searchTerm);
                    //console.log("BOOL"+resultExists);
                    //console.log(i+"#"+resultsArray);
                  }
                  
                }
                if(emailFound === false) {
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
                  if(data.success){
                      //alert('Search List Creation successful');
                  }
                  else{
                      //alert('Failed! Search History Not Saved.');
                  }
                  })
                  .catch(e => console.log(e))
                }
                else if(emailFound === true && resultExists === false) {
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
                  if(data.success){
                      //alert('Update successful');
                  }
                  else{
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

    }, [])
  }

  useEffect(() => {
    // console.log(route.params)
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
        style={ResultStyles.container}
      >
          <FlatList
              data={productsTitles}
              keyExtractor={(item, index) => item + index}
              renderItem={({ item }) => <TouchableOpacity
              style={ResultStyles.card}
                  title={`${item['extractedTitle']}`}
                  onPress={() => WebBrowser.openBrowserAsync(`${item['link']}`)}
              >
                  <Text
                    style={ResultStyles.text}
                  >{`${item['extractedTitle']}`}</Text>
              </TouchableOpacity>}
              extraData={listToUpdate}
          />
          
      </View>
  );

}


export default ProductsResults;
