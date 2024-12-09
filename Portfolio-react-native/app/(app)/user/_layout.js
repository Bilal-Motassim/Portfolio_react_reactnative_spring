import { Stack} from "expo-router"
import { useColorScheme } from "react-native";

export default function layout (){
    const isLight = useColorScheme() === 'light';
    return( 
        <Stack >
            <Stack.Screen
                name="[id]"
                options={{
                    title: 'Profile Info',
                    headerStyle: isLight ? { backgroundColor: '#fff' } : {backgroundColor:'#000'},
                    headerTintColor: isLight ? '#000' : '#fff',
                    headerTitleStyle: {fontWeight: 'bold',}
                }} 
            /> 
        </Stack>
    )
}