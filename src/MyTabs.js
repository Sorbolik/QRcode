import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CreateQrTab } from './tabs/CreateQrTab';
import { ReadQrTab } from './tabs/ReadQrTab';
import { Image, View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Text } from 'react-native';
import { colors } from '../utils/globalStyle';
import { StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const MyTabBar = ({ state, descriptors, navigation }) => {

    return (
        <View style={styles.tabsContainer}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label = options.tabBarLabel !== undefined ? options.tabBarLabel : (options.title !== undefined ? options.title : route.name);
                const isFocused = state.index === index;
                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TouchableOpacity
                        key={index}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={styles.singleTabButtonWrapper}
                    >

                        {/* <Ionicons name="md-checkmark-circle" size={32} color="green" />; */}
                        {/* <Image
                            style={{ width: 20, height: 20, alignSelf: "center" }}
                            source={{
                                uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
                            }}
                        /> */}
                        <Text style={tabLabelStyle(isFocused).tabLabel}>
                            {label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}
export const MyTabs = () => {
    return (
        <Tab.Navigator
            tabBar={(props) => <MyTabBar {...props} />}
        >
            <Tab.Screen name="Genera" component={CreateQrTab} />
            <Tab.Screen name="Scansiona" component={ReadQrTab} />
        </Tab.Navigator >
    );
}

const tabLabelStyle = (isFocused) => {
    return StyleSheet.create({
        tabLabel: {
            color: isFocused ? colors.primary : colors.lightGray,
            alignContent: "center",
            textAlign: "center"
        }
    });
};

const styles = StyleSheet.create({
    singleTabButtonWrapper: { flex: 1, alignContent: "center", justifyContent: "center" },
    tabsContainer: { flexDirection: "row", minHeight: 50 }
});