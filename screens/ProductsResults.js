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
    console.log(globToken);
    
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
            console.log("NAME HERE: "+json.names[0].displayName);
            console.log("EMAIL HERE: "+json.emailAddresses[0].value);
          })
      }, [])
    }
    //const userToken = this.props.navigation.getParam('token');
    //console.log("TOKEN"+userToken);



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
