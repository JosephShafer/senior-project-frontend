import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Button } from 'react-native';
import LoginContext from '../utility_functions/context';
import config from '../config.json';
import ResultStyles from '../styles/ResultStyles';
import { callWebCrawler } from '../utility_functions/ApiSend.js';
import getEmail from '../utility_functions/getEmail';

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

}

export default SearchHistory;