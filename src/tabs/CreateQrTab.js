import { Image, Text, View } from 'react-native';
import React, { useState } from 'react';
import { colors, globalStyles } from '../../utils/globalStyle';
import { Pressable } from 'react-native';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native';
import { Dimensions } from 'react-native';
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';
import { getRequest } from '../../utils/ApiRequests';
import API from '../../utils/API';
import { Share } from 'react-native';

export const CreateQrTab = () => {

    const [qrCode, setQrCode] = useState('something');
    const [inputValue, setInputValue] = useState('');

    const submitgeneration = () => {
        setQrCode(inputValue);
        // getRequest(API.QR_BASE + API.CREATE, { data: inputValue, format: "png" }).then((resp) => {
        //     setQrCode(resp.data);
        //     // console.log(resp.data);
        // }).catch((error) => {
        //     console.log('There has been a problem with your fetch operation: ' + error.message);
        // });
    }

    const submitCopy = async () => {
        try {
            const result = await Share.share({
                title: 'QR Code',
                message: `${API.QR_BASE + API.CREATE}?data=${qrCode}&format=png&size=${mainWidth}x${mainWidth}`,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            Alert.alert(error.message);
        }
    };

    return (
        <View style={globalStyles.tabContainer}>
            <View style={styles.textAreaContainer} >
                <AutoGrowingTextInput
                    minHeight={40}
                    maxHeight={300} // this is a flexible value that I set in my 
                    // component, where I use this reusable component, same below, unless specified the other
                    onChangeText={setInputValue}
                    placeholder="Scrivi qui quello che vuoi!"
                    placeholderTextColor='#C7C7CD'
                    style={styles.textArea}
                    value={inputValue}
                />
            </View>
            <Pressable
                style={[globalStyles.button, globalStyles.buttonOpen]}
                onPress={() => submitgeneration()}>
                <Text>Genera il tuo codice QR!</Text>
            </Pressable>
            <Pressable onLongPress={submitCopy}>
                <Image
                    style={styles.imageStyle}
                    source={{
                        uri: `${API.QR_BASE + API.CREATE}?data=${qrCode}&format=png&size=${mainWidth}x${mainWidth}`,
                    }}
                />
            </Pressable>
        </View>
    );
}
const mainWidth = Dimensions.get('window').width * 85 / 100;
const styles = StyleSheet.create({
    imageStyle: {
        width: mainWidth,
        height: mainWidth,
        alignSelf: "center"
    },
    textAreaContainer: {
        width: mainWidth,
        borderColor: colors.lightGray,
        borderWidth: 1,
        padding: 5
    },
    textArea: {
        height: 150,
        justifyContent: "flex-start"
    }
})
