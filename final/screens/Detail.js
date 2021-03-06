import React from "react"
import {Text, View, Image,Button} from 'react-native'
import {Calendar,CalendarList,Agenda,} from 'react-native-calendars';

export default class Detail extends React.Component{
    constructor(props) {
        super(props);
        this.state = {agendaView:false,
          markedDates:{
            
    //      '2019-04-12': {selected:true,marked:true,color:"blue"},
          '2019-04-14': {disabled: true, disableTouchEvent: true},
          '2019-04-21': {disabled: true, disableTouchEvent: true},
          '2019-04-07': {disabled: true, disableTouchEvent: true},
          '2019-04-28': {disabled: true, disableTouchEvent: true},
          '2019-04-06': {disabled: true, disableTouchEvent: true},
          '2019-04-13': {disabled: true, disableTouchEvent: true},
          '2019-04-20': {disabled: true, disableTouchEvent: true},
          '2019-04-27': {disabled: true, disableTouchEvent: true},


          '2019-04-15': {marked: true, dotColor: 'red', activeOpacity: 0},
          '2019-04-22': {marked: true, dotColor: 'red', activeOpacity: 0},
          '2019-04-29': {marked: true, dotColor: 'red', activeOpacity: 0},
        }}
      }
render ()
{
   let image = this.props.navigation.getParam ("image");
    var bill; 
    bill=this.props.navigation.getParam ('key', 0)

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
   //return (
    /*    <View>
        <Text> {bill} </Text>
        <View style= {{flex: 1,flexDirection:"row"}}>
         <Image source = {image} resizeMode="contain" 
        style={{flexShrink:1}}/>
        </View>
        </View>
    )*/

   } else {
    return (<Agenda
    // the list of items that have to be displayed in agenda. If you want to render item as empty date
    // the value of date key kas to be an empty array []. If there exists no value for date key it is
    // considered that the date in question is not yet loaded
    style={{flex:1}}
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
    renderItem={(item, firstItemInDay) => {return (
    <View style={{flex:1, flexDirection:"row"}}>
      <Text style={{flex:1}}>{item.barber} : {item.time}</Text>
      <Button style={{flex:1}} title="book" onPress={()=>navigate("Detail",{key:item.barber})}/>
    </View>
    );}}
    // specify how each date should be rendered. day can be undefined if the item is not first in that day.
    renderDay={(day, item) => {
      return (
      <View style={{flexWrap:"nowrap",flex:1}}>
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
      agendaKnobColor: 'blue',
      backgroundColor: '#dee6f2',
      textSectionTitleColor: '#e8987a',
      selectedDayBackgroundColor: '#9b2c03',
      //selectedDayTextColor: '#ffffff',
      //todayTextColor: '#669999',
      //dayTextColor: '#2d4150',
      textDisabledColor: '#d9e1e8',
      dotColor: '#00adf5',
      selectedDotColor: '#ffffff',
      arrowColor: 'orange',
      monthTextColor: 'blue',
      //textDayFontFamily: 'monospace',
      //textMonthFontFamily: 'monospace',
      //textDayHeaderFontFamily: 'monospace',
      textMonthFontWeight: 'bold',
      textDayFontSize: 16,
      textMonthFontSize: 16,
      textDayHeaderFontSize: 16,
      
    // agenda container style

      'stylesheet.agenda.list':{
        container: {
          marginTop: 20
          
        }


      }}}
      />);
  }



    
}
}

