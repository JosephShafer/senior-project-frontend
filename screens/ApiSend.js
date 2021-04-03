import React, { Component } from 'react';
import {
        StyleSheet,
        Text,
        View,
        TouchableOpacity
} from 'react-native';

import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import config from '../config.json';

let loading = false;
let apiResult = undefined;
// For testing style, set to true to use dummy data 
const NO_BACKEND = false;
let dummyData = {
        searchTerm: 'wood',
        products: [
                'https://www.kaplanco.com/product/30408/wooden-colored-craft-shapes-400-pieces?c=11%7CAR1045',
                'https://www.kaplanco.com/product/30096/colored-wood-party-shapes?c=11%7CAR1045',
                'https://www.kaplanco.com/product/200125/unfinished-wood-cars-12-pieces?c=11%7CAR1045',
                'https://www.kaplanco.com/product/200084/wooden-spring-clothespins-48-pieces?c=11%7CAR1045',
                'https://www.kaplanco.com/product/30373/wooden-geometric-shapes?c=11%7CAR1045',
                'https://www.kaplanco.com/product/200187/unfinished-wood-circles-500-pieces?c=11%7CAR1045',
                'https://www.kaplanco.com/product/29163/wooden-dowels-set-of-12?c=11%7CAR1045',
                'https://www.kaplanco.com/product/32319/wooden-craft-spools-144-pieces?c=11%7CAR1045',
                'https://www.kaplanco.com/product/63826/natural-wooden-loose-parts-kit?c=11%7CAR1045',
                'https://www.kaplanco.com/product/33920P/colored-jumbo-wood-craft-sticks?c=11%7CAR1045',
                'https://www.kaplanco.com/product/32884/natural-wood-turnings-5-lbs?c=11%7CAR1045',
                'https://www.kaplanco.com/product/88902/natural-wood-craft-sticks?c=11%7CAR1045',
                'https://www.kaplanco.com/product/32864/giant-wooden-shapes-set-of-60?c=11%7CAR1045',
                'https://www.kaplanco.com/product/88926/wooden-craft-pieces-350?c=11%7CAR1045',
                'https://www.kaplanco.com/product/200020/diy-unfinished-wood-hand-note-holders-12-pieces?c=11%7CAR1045'
        ],
        projects: [
                'https://www.kaplanco.com/product/30408/wooden-colored-craft-shapes-400-pieces?c=11%7CAR1045',
                'https://www.kaplanco.com/product/30096/colored-wood-party-shapes?c=11%7CAR1045',
                'https://www.kaplanco.com/product/200125/unfinished-wood-cars-12-pieces?c=11%7CAR1045',
                'https://www.kaplanco.com/product/200084/wooden-spring-clothespins-48-pieces?c=11%7CAR1045',
                'https://www.kaplanco.com/product/30373/wooden-geometric-shapes?c=11%7CAR1045',
                'https://www.kaplanco.com/product/200187/unfinished-wood-circles-500-pieces?c=11%7CAR1045',
                'https://www.kaplanco.com/product/29163/wooden-dowels-set-of-12?c=11%7CAR1045',
                'https://www.kaplanco.com/product/32319/wooden-craft-spools-144-pieces?c=11%7CAR1045',
                'https://www.kaplanco.com/product/63826/natural-wooden-loose-parts-kit?c=11%7CAR1045',
                'https://www.kaplanco.com/product/33920P/colored-jumbo-wood-craft-sticks?c=11%7CAR1045',
                'https://www.kaplanco.com/product/32884/natural-wood-turnings-5-lbs?c=11%7CAR1045',
                'https://www.kaplanco.com/product/88902/natural-wood-craft-sticks?c=11%7CAR1045',
                'https://www.kaplanco.com/product/32864/giant-wooden-shapes-set-of-60?c=11%7CAR1045',
                'https://www.kaplanco.com/product/88926/wooden-craft-pieces-350?c=11%7CAR1045',
                'https://www.kaplanco.com/product/200020/diy-unfinished-wood-hand-note-holders-12-pieces?c=11%7CAR1045'
        ],
        crawled: false
};

async function callWebCrawler(target) {
        if(NO_BACKEND == true){
                return dummyData;
        }
        try {
                console.log("Attempting connection to AWS server...");
                let response = await fetch(config.AWS.ip, {
                        method: "POST",
                        headers: {
                                Accept: "application/json",
                                "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                                searchTerm: target,
                        }),
                });
                var responseJson = await response.json();
                console.log("Connection successfully made.");
                return responseJson;
        } catch (err) {
                console.log(err);
        }
}

async function googleVision(base64) {
        loading = true;
        try {
                let body = JSON.stringify({
                        requests: [
                                {
                                        features: [
                                                { type: 'LABEL_DETECTION', maxResults: 5 },
                                                //{ type: 'LANDMARK_DETECTION', maxResults: 5 },
                                                //{ type: 'FACE_DETECTION', maxResults: 5 },
                                                { type: 'LOGO_DETECTION', maxResults: 5 },
                                                { type: 'TEXT_DETECTION', maxResults: 5 },
                                                //{ type: 'DOCUMENT_TEXT_DETECTION', maxResults: 5 },
                                                //{ type: 'SAFE_SEARCH_DETECTION', maxResults: 5 },
                                                { type: 'IMAGE_PROPERTIES', maxResults: 5 },
                                                //{ type: 'CROP_HINTS', maxResults: 5 },
                                                //{ type: 'WEB_DETECTION', maxResults: 5 }
                                        ],
                                        image: {
                                                content: base64
                                        }
                                }
                        ]
                });
                console.log("Sending json...");
                let response = await fetch(
                        config.googleCloud.api + config.googleCloud.apiKey,
                        {
                                headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json'
                                },
                                method: 'POST',
                                body: body
                        }
                );
                console.log("Received response");
                let responseJson = await response.json();
                apiResult = responseJson.responses[0].labelAnnotations[0].description;
        } catch (error) {
                console.log(error);
        }
        loadingc = false;
        let results = await callWebCrawler(apiResult);
        return results;
}

export default googleVision;