import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import loginContext from './context';
import config from '../config.json';

function SearchHistory({ navigation, route }) {
    const [random, setRandom] = useState(Math.random());
    const userToken = React.useContext(loginContext);
    let userEmail = '';
    let resultsArray = [];

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
              console.log("EMAIL HIST: "+json.emailAddresses[0].value);
              userEmail = json.emailAddresses[0].value;
            })
            .then(() => {
              const url = config.myIP.address + 'searchhistory';
              let emailFound = false;
              fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (data) {
                        for(var i = 0; i < data.length; i++) {
                          if(userEmail === data[i].email){
                            emailFound = true;
                            for(var j = 0; j < data[i].searchTerms.length; j++)
                            resultsArray.push(data[i].searchTerms[j]);
                            console.log(resultsArray);
                          }

                        }
                    }
                })
                .catch(e => console.log(e))
            })
            .catch(e => console.log(e))
        
        }, [])
    }

    console.log(resultsArray);
          
    return(
        <View style={{ flex: 0.15, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Snap & Go Past Results</Text>
            { resultsArray.map((item, key)=>(
            <Text key={key} > { item } </Text>)
            )}
        </View>
    );
}

export default SearchHistory;