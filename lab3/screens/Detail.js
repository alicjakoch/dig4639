import React from "react"
import {Text} from 'react-native'
export default class Detail extends React.Component{
render ()
{
    var bill; 
    
    bill=this.props.navigation.getParam ('key', 0)
    return (
        <Text> {bill} </Text>

    )
}
   
}