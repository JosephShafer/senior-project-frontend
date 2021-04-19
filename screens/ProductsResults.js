import React, { useEffect, useState } from 'react';
import { Button, Linking, View, Text, StyleSheet, FlatList, SectionList, StatusBar } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import config from '../config.json';
import { callWebCrawler } from './ApiSend.js';
import filter from './filter';

function ProductsResults({ route, navigation }){
    const [productsTitles, setProductsTitles] = useState(route.params.products);
    const [listToUpdate, updateList] = useState(false);

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
