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

class CalendarWithNavigator extends Component {
    getDate = async () => {
        // let a=this.calendarRef.current.control.startDate.dayOfWeek()
        // let b=this.calendarRef.current.control.startDate.getDay()
        // console.log(a)
        // console.log(b)
        // console.log(this.calendarRef.current.control.events.list.length)
        // this.calendarRef.current.control.events.list = [];
        // this.calendarRef.current.control.update();
        // console.log(this.calendarRef.current.control.events.list.length)
        //por aqui url depois
        // const response = await fetch('')
        // if (!response.ok) {
        //     throw new Error('Data coud not be fetched!')
        // } else {
        //     let res = await response.json()
        //     console.log(res)
        // }
        // const event = {
        //     id: 1,
        //     text: "Event 1",
        //     start: "2022-12-08T10:30:00",
        //     end: "2022-12-08T13:00:00"
        // };
        // this.calendarRef.current.control.events.add(event)
    }
    addEvent = () => {
        console.log("AUI")
        const event = {
            id: 1,
            text: "Event 1",
            start: "2022-12-08T10:30:00",
            end: "2022-12-08T13:00:00"
        };
        this.calendarRef.current.control.events.add(event)

        this.calendar.events.add({
            id: 1,
            text: "Event 1",
            start: "2022-12-07T10:30:00",
            end: "2022-12-07T13:00:00"
        })
        this.calendar.update();
    }
    changeEverything = () => {
        // let b = this.calendarRef.current.control.startDate.value
         console.log(this.calendarRef.current.state)
        // console.log(b)
        this.calendarRef.current.control.events.list = []
        this.calendarRef.current.control.update()
        console.log(this.calendarRef.current.control.events.list)
        let body = JSON.stringify({
            "data": this.calendarRef.current.control.startDate.value,
            "num": this.calendarRef.current.state
        })
        console.log(body)
        fetch('/obter_horario_de_uma_semana', {
            method: 'POST',
            headers: {'Content-Type': 'application/json; charset=UTF-8',},
            body: body
        }).then(async response => {
            if (response.status !== 200) {
                throw new Error(response.statusText);
            }
            const jsonRes = await response.json()
            console.log(jsonRes)
            jsonRes.map((results) =>
                this.calendarRef.current.control.events.add(results)
            )

        }).catch((error) => {
            console.error(error);
        });
    }

    constructor(props) {
        super(props);
        this.calendarRef = React.createRef();
        this.state = {
            businessBeginsHour: 8,
            businessEndsHour: 23,
            heightSpec: "BusinessHoursNoScroll",
            viewType: "Week",
            durationBarVisible: true,
            theme: "calendar_weekly",
            locale: "PT-PT",
            cellHeight: 40,
            onEventClick: async args => {
                const dp = this.calendar;
                let zed = args.e.id()
                let e = dp.events.find(zed);
                const modal = await DayPilot.Modal.alert(e.data.informacao_detalhada);
                if (!modal.result) {
                    return;
                }
            },
        };
    }

    get calendar() {
        return this.calendarRef.current.control;
    }

    componentDidMount() {

        const events = [

        ];

        const startDate = DayPilot.Date.today();
        this.calendar.update({startDate, events});
    }

    render() {
        return (

            <div style={styles.wrap}>
                <div style={styles.left}>
                    <DayPilotNavigator
                        selectMode={"week"}
                        showMonths={2}
                        skipMonths={2}
                        locale="PT-PT"
                        startDate={DayPilot.Date.today()}
                        selectionDay={DayPilot.Date.today()}
                        onTimeRangeSelected={args => {
                            this.calendar.update({
                                startDate: args.day,
                            });
                            this.changeEverything()

                        }}
                    />
                </div>
                <div style={styles.main}>
                    <DayPilotCalendar
                        {...this.state}
                        headerDateFormat={"dddd"}
                        timeFormat={"Clock24Hours"}
                        eventMoveHandling={"Disabled"}
                        eventResizeHandling={"Disabled"}
                        timeRangeSelectedHandling={"Disabled"}
                        ref={this.calendarRef}


                    />
                </div>
            </div>
        );
    }
}

export default CalendarWithNavigator;