import { Text, TouchableOpacity } from "react-native";
import {styles} from "../Button/style"

export function Button(){
    return (
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>

            </Text>
        </TouchableOpacity>
    )
    
}