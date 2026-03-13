import { Button, StyleSheet, Text, View } from "react-native"
import { COLORS } from "../../theme/colors"
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/RootNavigator";

export const HomeScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>BancoXYZ</Text>
            <Text>Home Screen</Text>
            <Button
                title="Transferir"
                onPress={() => navigation.navigate('TransferForm')}
                color={COLORS.primary}
            />
            <Button
                title="Ver historial"
                onPress={() => navigation.navigate('TransferList')}
                color={COLORS.primary}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.background
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.primary
    }
})