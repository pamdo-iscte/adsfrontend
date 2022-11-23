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
        flexGrow: "1"
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
            {
                id: 3,
                text: "Event 3",
                start: "2022-11-22T08:30:00",
                end: "2022-11-22T13:00:00",
                backColor: "#f1c232"
            },
            {
                id: 4,
                text: "Event 4 Semanas 1,2,3,4,5",
                start: "2022-11-22T11:30:00",
                end: "2022-11-22T13:00:00",
                backColor: "#cc4125"
            },
        ];

        const startDate = DayPilot.Date.today();
        this.calendar.update({startDate, events});
    }

    render() {
        return (

            <div style={styles.wrap}>
                <h1 onClick={this.getDate}>ola</h1>
                <div style={styles.left}>
                    <DayPilotNavigator
                        selectMode={"week"}
                        showMonths={2}
                        skipMonths={2}
                        locale="PT-PT"
                        startDate={DayPilot.Date.today()}
                        selectionDay={DayPilot.Date.today()}
                        onTimeRangeSelected={ args => {
                            this.calendar.update({
                                startDate: args.day
                            });
                        }}
                    />
                </div>
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
            </div>
        );
    }
}

export default Calendar;