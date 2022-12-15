import React, {Component} from "react";
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
class CalendarWithoutNavigator extends Component {
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
            businessBeginsHour: 8,
            businessEndsHour: 23,
            heightSpec: "BusinessHoursNoScroll",
            viewType: "Week",
            durationBarVisible: true,
            theme:"calendar_weekly",
            locale:"PT-PT",
            cellHeight:40,
            onEventClick: async args => {
                const dp = this.calendar;
                let zed=args.e.id()
                let e = dp.events.find(zed);
                const modal = await DayPilot.Modal.alert(e.data.informacao_detalhada);
                if (!modal.result) { return; }
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
                    {/*<DayPilotNavigator*/}
                    {/*    selectMode={"week"}*/}
                    {/*    showMonths={2}*/}
                    {/*    skipMonths={2}*/}
                    {/*    locale="PT-PT"*/}
                    {/*    startDate={DayPilot.Date.today()}*/}
                    {/*    selectionDay={DayPilot.Date.today()}*/}
                    {/*    onTimeRangeSelected={ args => {*/}
                    {/*        this.calendar.update({*/}
                    {/*            startDate: args.day,*/}
                    {/*        });*/}
                    {/*        this.getDate()*/}
                    {/*       // this.addEvent()*/}

                    {/*    }}*/}
                    {/*/>*/}
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

export default CalendarWithoutNavigator;