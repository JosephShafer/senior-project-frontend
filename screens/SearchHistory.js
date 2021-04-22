import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Button } from 'react-native';
import * as Location from 'expo-location';
import LoginContext from './context';
import config from '../config.json';
import ResultStyles from './ResultStyles';
import { callWebCrawler } from './ApiSend.js';
import getEmail from './getEmail';

function SearchHistory({ navigation, route }) {
  const [searchResults, setSearchResults] = useState("");
  const userToken = React.useContext(LoginContext);
  let [userEmail, setUserEmail] = useState('');
  let [resultsArray, setResultArray] = useState();

  useEffect(() => {
    if (userToken !== "empty") {
      getEmail(userToken)
        .then((email) => {
          console.log(email)
          const url = config.myIP.address + 'searchhistory/getUsersResults';
          console.log(userEmail);
          fetch(url, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: email,
            }),
          })
            .then(response => response.json())
            .then(data => {
              console.log(data)
              setResultArray([...data.usersSearches]);
              console.log(resultsArray);
              // if (data) { 
              //   // setResultArray([...data.searchTerms]);
              //   console.log(data);
              //     for(var i = 0; i < data.length; i++) {
              //       if(userEmail === data[i].email){
              //         emailFound = true;
              //         // for(var j = 0; j < data[i].searchTerms.length; j++)
              //         // resultsArray.push(data[i].searchTerms[j]);
              //         // console.log(resultsArray);
              //       }

              //     }
              // }
            })
            .catch(e => console.log(e))
        })
        .catch(e => console.log(e))
    }

  }, [])

  async function loadResult(item) {
    callWebCrawler(item)
      .then(res => {
        console.log(searchResults)
        navigation.navigate("Results", { results: res });
      })
  };

  // console.log(resultsArray);

  return (
    <View style={ResultStyles.container}>
      <FlatList
        data={resultsArray}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => <TouchableOpacity
          style={ResultStyles.card}
          title={`${item}`}
          onPress={() => loadResult(`${item}`)}
        >
          <Text
            style={ResultStyles.text}
          >{`${item}`}</Text>
        </TouchableOpacity>
        }

      />

    </View>
  );

  // return(
  //     <View style={{ flex: 0.15, alignItems: 'center', justifyContent: 'center' }}>
  //         <Text>Snap & Go Past Results</Text>
  //         { resultsArray.map((item, key)=>(
  //         <Text key={key} > { item } </Text>)
  //         )}
  //     </View>
  // );
}

export default SearchHistory;