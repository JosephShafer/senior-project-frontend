import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import loginContext from './context';
import config from '../config.json';

function SearchHistory({ navigation, route }) {
    return(
        <View style={{ flex: 0.15, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Snap & Go Past Results</Text>
        </View>
    );
}

export default SearchHistory;