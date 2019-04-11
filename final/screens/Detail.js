import React from "react"
import {Text, View, Image} from 'react-native'
export default class Detail extends React.Component{
render ()
{
   let image = this.props.navigation.getParam ("image");
    var bill; 
    bill=this.props.navigation.getParam ('key', 0)
    return (
        <View>
        <Text> {bill} </Text>
        <View style= {{flex: 1,flexDirection:"row"}}>
         <Image source = {image} resizeMode="contain" 
        style={{flexShrink:1}}/>
        </View>
        </View>
    )




    
}
}


