import React, { useEffect, useState } from 'react';
import { Button, Linking, View, Text, StyleSheet, FlatList, SectionList, StatusBar } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import config from '../config.json';
import { callWebCrawler } from './ApiSend.js';
import filter from './filter';


function ProjectResults({ navigation, route }) {
    const [projectTitles, setProjectsTitles] = useState(route.params.projects);
    const [listToUpdate, updateList] = useState(false);

    useEffect(() => {
        callWebCrawler(route.params.searchTerm)
            .then((res) => {
                let filteredProjects = filter(res.projects);
                setProjectsTitles(filteredProjects);
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
                data={projectTitles}
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

export default ProjectResults;
