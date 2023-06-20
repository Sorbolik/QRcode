import { Text, View } from 'react-native';
import { globalStyles } from '../../utils/globalStyle';

export const ReadQrTab = () => {
    return (
        <View style={globalStyles.tabContainer}>
            <Text>Scansiona un codice QR!</Text>
        </View>
    );
}