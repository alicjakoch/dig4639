import React from 'react';
import {Calendar,CalendarList,Agenda} from 'react-native-calendars';

import {
  Button,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  View,

  
} 
from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {agendaView:false,
      markedDates:{
//      '2019-04-12': {selected:true,marked:true,color:"blue"},
      '2019-04-14': {disabled: true, disableTouchEvent: true},
      '2019-04-15': {marked: true, dotColor: 'red', activeOpacity: 0},
    }}
  }
  static navigationOptions = {
    header: null,
  };
  _gotoScreen = (key) => {
    console.log("Going to " + key);
  }
  render() {
    const {navigate} = this.props.navigation;
    
    console.log(this.state.markedDates)
    if(!this.state.agendaView) {
      return <Calendar 
    onDayPress={(day) => {
      this.setState({agendaView:true});
      this.setState(prevState => {
        let newDay = prevState.markedDates[day.dateString];
        if(newDay != undefined)
          newDay.selected = true
        else {
          newDay = {selected:true,color: 'blue'};
          prevState.markedDates[day.dateString] = newDay;
        }
        let newMarkedDates ={};
        Object.assign(newMarkedDates,prevState.markedDates); 
        newMarkedDates[day.dateString] = newDay;
        return {markedDates:newMarkedDates};
        }
      );
      console.log('selected day', day)
    }}
    markedDates={this.state.markedDates}/>
  } else {
    return (<Agenda
    // the list of items that have to be displayed in agenda. If you want to render item as empty date
    // the value of date key kas to be an empty array []. If there exists no value for date key it is
    // considered that the date in question is not yet loaded
    selected={'2019-04-11'}
    items={
      {'2019-04-11': [{barber:"Jack",time:"4:00pm"},{barber: "Julie",time:"5:00pm"}],
      '2019-04-12': [{barber:"Jack",time:"4:00pm"},{barber: "Julie",time:"5:00pm"}],
      '2019-04-13': [{barber:"Jack",time:"4:00pm"},{barber: "Julie",time:"5:00pm"}],
      }}
    // callback that gets called when items for a certain month should be loaded (month became visible)
    loadItemsForMonth={(month) => {console.log('trigger items loading')}}
    // callback that fires when the calendar is opened or closed
    onCalendarToggled={(calendarOpened) => {console.log(calendarOpened)}}
    // callback that gets called on day press
    onDayPress={(day)=>{console.log('day pressed')}}
    // callback that gets called when day changes while scrolling agenda list
    onDayChange={(day)=>{console.log('day changed')}}
    // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
    minDate={'2019-04-10'}
    // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
    maxDate={'2019-04-25'}
    // Max amount of months allowed to scroll to the past. Default = 50
    pastScrollRange={50}
    // Max amount of months allowed to scroll to the future. Default = 50
    futureScrollRange={50}
    // specify how each item should be rendered in agenda
    renderItem={(item, firstItemInDay) => {return (<View ><Text>{item.barber} : {item.time}</Text>
    <Button title="book" onPress={()=>navigate("Detail",{key:item.barber})}/></View>);}}
    // specify how each date should be rendered. day can be undefined if the item is not first in that day.
    renderDay={(day, item) => {
      
      return (
      <View >
      {(day!=undefined) ?<Text>{day.dateString}</Text> :null}
      </View>);}}
  // specify how empty date content with no items should be rendered
  renderEmptyDate={() => {return (<View />);}}
  // specify how agenda knob should look like
    renderKnob={() => {return (<View />);}}
    // specify what should be rendered instead of ActivityIndicator
    renderEmptyData = {() => {return (<View />);}}
    // specify your item comparison function for increased performance
    rowHasChanged={(r1, r2) => {return r1.text !== r2.text}}
    // By default, agenda dates are marked if they have at least one item, but you can override this if needed
    // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly.
    onRefresh={() => console.log('refreshing...')}
    // Set this true while waiting for new data from a refresh
    refreshing={false}
    // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView.
    refreshControl={null}
    // agenda theme
    theme={{
      agendaDayTextColor: 'yellow',
      agendaDayNumColor: 'green',
      agendaTodayColor: 'red',
      agendaKnobColor: 'blue'
    }}
    // agenda container style
    style={{}}
  />);
  }
    /*
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.getStartedContainer}>
            <Text style={styles.getStartedText}>K S C  Cut</Text>
            <Text style={styles.getStartedText}>Pick a Barber.</Text>
            <FlatList
             data={[
               
               {key: 'You have chosen Alicja as your Barber',image: require('../assets/images/alicja1.jpg')}, 
               //{key: 'cat2 Bad things about cats',image: require('../assets/images/cat2.png')},
               //{key: 'cat3 Loving things about cats',image: require('../assets/images/HELL2.jpg')},
               {key: 'cat4 Cats are just crazy...maybe',image: require('../assets/images/cat2.png')}]}
             keyExtractor={this._keyExtractor}
              renderItem={({item}) => (
              <TouchableOpacity onPress={(event) => { 
                console.log(item.key);
                 this.props.navigation.navigate('Detail', {key:item.key, image:item.image  } )        
                }}>
       
                <Image source={item.image} style={{width:200,height:200}} />
              </TouchableOpacity>
              )}
            />
          </View>
        </ScrollView>
      </View>
      );
     
      
      */
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 200,
    
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 44 ,
    color: 'rgba(96,100,109, 1)',
    lineHeight:46,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  
  
});
