import React, {Component} from 'react';
import {DayPilot, DayPilotCalendar, DayPilotNavigator} from "@daypilot/daypilot-lite-react";
import '../../src/App.css';
const styles = {
    wrap: {
        display: "flex"
    },
    left: {
        marginRight: "10px"

    },
    main: {
        height:"100%"
    }
};
//https://code.daypilot.org/75128/how-to-use-css-themes-with-the-react-scheduler-component

class Calendar extends Component {
    getDate = () => {
        let a=this.calendarRef.current.control.startDate.dayOfWeek()
        let b=this.calendarRef.current.control.startDate.getDay()
        console.log(a)
        console.log(b)
    }
    addEvent=()=>{
        // console.log("AUI")
        // const event = {
        //     id: 1,
        //     text: "Event 1",
        //     start: "2022-12-02T10:30:00",
        //     end: "2022-12-02T13:00:00"
        // };
        // this.calendarRef.current.control.events.add(event)
        //
        // this.calendar.events.add({
        //     id: 1,
        //     text: "Event 1",
        //     start: "2022-12-03T10:30:00",
        //     end: "2022-12-03T13:00:00"
        // })
        // this.calendar.update();
    }
    constructor(props) {
        super(props);
        this.calendarRef = React.createRef();
        this.state = {
            viewType: "Week",
            durationBarVisible: true,
            theme:"calendar_weekly",
            locale:"PT-PT"
        };
    }

    get calendar() {
        return this.calendarRef.current.control;
    }

    componentDidMount() {

        const events = [
            {
                id: 1,
                text: "Event 1",
                start: "2023-03-07T10:30:00",
                end: "2023-03-07T13:00:00"
            },
            {
                id: 2,
                text: "Event 2",
                start: "2023-03-08T09:30:00",
                end: "2023-03-08T11:30:00",
                backColor: "#6aa84f"
            },

        ];

        const startDate = DayPilot.Date.today();
        this.calendar.update({startDate, events});
    }

    render() {
        return (


                <div style={styles.main}>
                    <DayPilotCalendar
                        {...this.state}
                        headerDateFormat={"dddd"}
                        timeFormat={"Clock24Hours"}
                        eventMoveHandling ={"Disabled"}
                        eventResizeHandling ={"Disabled"}
                        timeRangeSelectedHandling ={"Disabled"}
                        ref={this.calendarRef}


                    />
                </div>
        );
    }
}

export default Calendar;