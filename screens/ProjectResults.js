import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import config from '../config.json';
import { callWebCrawler } from '../utility_functions/ApiSend.js';
import filter from '../utility_functions/filter';
import ResultStyles from '../styles/ResultStyles';


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
        <View
          style={ResultStyles.container}
        >
            <FlatList
                data={projectTitles}
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

export default ProjectResults;
