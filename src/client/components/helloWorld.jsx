import React, { useEffect, useState } from 'react';
// import logo from './logo.svg';
// import './App.css';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
 
const localizer = momentLocalizer(moment)
var tempList = [];
var fetched = false;

function App() {
  const [eventList, setEventList] = useState([])
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.up('sm'));

  const getEvents = () => {
    fetch('https://francopass.artsrn.ualberta.ca/api/calendar/')
    .then(res => res.json())
    .then((data) => {
      tempList = JSON.parse(data).events;
    })
    .then(() => replaceDate())
    .catch(console.log)
  }

  const replaceDate = () => {
    if (!fetched) {
      for (let i=0; i < tempList.length; i++) {
        let newEvent = {
          start: '',
          end: '',
          title: '',
          event_url: '',
        };
        newEvent.start = moment(tempList[i].start).toDate()
        newEvent.end = moment(tempList[i].end).toDate()
        newEvent.title = tempList[i].title;
        newEvent.event_url = tempList[i].event_url;
        console.log(newEvent)
        setEventList([...eventList, newEvent])
      }
      fetched = true;
    }
  }

  useEffect(() => {
    getEvents();
  },[eventList])

  return (
    <div className="App">
    <AppBar position="static" style={{ backgroundColor: 'white' }}>
        <Toolbar>
          <IconButton edge="start" style={{color: 'black'}}>
            <ArrowBackIcon onClick={() => window.history.back()} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div style={{ padding: '1rem', width: `${mobile ? '50%' : '90%'}`, display: 'block', marginLeft: 'auto', marginRight: 'auto' }}>
        <Calendar
          popup
          selectable
          localizer={localizer}
          events={eventList}
          defaultView="month"
          defaultDate={new Date()}
          style={{ height: 500 }}
          onSelectEvent={event => window.location.replace(event.event_url)}
        />
      </div>
    </div>
  );
}

export default App;

