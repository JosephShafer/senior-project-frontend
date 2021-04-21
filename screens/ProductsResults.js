import React, { useEffect, useState } from 'react';
import { Button, Linking, View, Text, StyleSheet, FlatList, SectionList, StatusBar } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import loginContext from './context';
import config from '../config.json';
import { callWebCrawler } from './ApiSend.js';
import filter from './filter';

function ProductsResults({ route, navigation }){
    const [productsTitles, setProductsTitles] = useState(route.params.products);
    const [listToUpdate, updateList] = useState(false);


    const globToken = React.useContext(loginContext);
    const [userEmail, setUserEmail] = useState("empty");
    
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
            setUserEmail(json.emailAddresses[0].value);
          })
      }, [])
    }
    //console.log("EMAIL_VAR"+userEmail);
    const url = config.myIP.address + 'searchhistory';

    async function searches(){
      if(userEmail !== "empty") {
        /*
        useEffect(() => {
          fetch(url, {
            //"credentials": "include",
            "method": "GET",
          })
            .then(response => response.json())
            .then(json => {
              //console.log("NAME HERE: "+json.names[0].displayName);
              console.log("EMAIL HERE: ");
              console.log(json);
            })
        }, [])
        */

        /*
        try {
            let response = await fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify({
                    email: userEmail,
                    searchTerms: [route.params.searchTerm]
                })
            });
            let data = await response.json();
            if(data.success){
                alert('Search List Creation successful');
            }
            else{
                alert('Failed! Search History Not Saved.');
            }
        } catch (error) {
            alert('Unable to create search history');
            console.log(error);
        }*/

        try {
          let response = await fetch(url);
          let data = await response.json();
          if(data){
              alert('Successful');
              console.log(data[0].searchTerms);
          }
          else{
              alert('Failed! Search History Not Saved.');
          }
      } catch (error) {
          alert('Unable to create search history');
          console.log(error);
      }

      }
    }

    useEffect(() => {
      searches()
    }, [])

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
        <View>
            <FlatList
                data={productsTitles}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => <Button
                    title={`${item['extractedTitle']}`}
                    onPress={() => WebBrowser.openBrowserAsync(`${item['link']}`)}
                />}
                extraData={listToUpdate}
            />
            
        </View>
    );

}


export default ProductsResults;
