import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Button } from 'react-native';
import * as Location from 'expo-location';
import loginContext from './context';
import config from '../config.json';
import { callWebCrawler } from './ApiSend.js';

function SearchHistory({ navigation, route }) {
  const [searchResults, setSearchResults] = useState("");
    const userToken = React.useContext(loginContext);
    let [userEmail, setUserEmail] = useState('');
    let [resultsArray, setResultArray] = useState();

    if (userToken['AuthOwner'] === 'Google') {

        useEffect(() => {
          fetch("https://content-people.googleapis.com/v1/people/me?personFields=names,emailAddresses", {
            "credentials": "include",
            "headers": {
              "Authorization": `Bearer ${userToken.params.access_token}`,
            },
            "method": "GET",
          })
            .then(response => response.json())
            .then(json => {
              //console.log("NAME HERE: "+json.names[0].displayName);
              let returnedEmail = json.emailAddresses[0].value;
              console.log("EMAIL HIST: "+returnedEmail);
              return returnedEmail;
            })
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
        
        }, [])
    }

    async function loadResult(item) {
      let res = await callWebCrawler(item);
      setSearchResults(res);
      navigation.navigate("Results", { results: searchResults }); 
      
    };

    // console.log(resultsArray);

    return(
      <View>
      <FlatList
        data={resultsArray}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => <Button
          title={`${item}`}
          onPress={() => loadResult(`${item}`)}
        />}
        
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