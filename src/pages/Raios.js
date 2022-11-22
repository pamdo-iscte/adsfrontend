import React, {Component} from 'react';
import {DayPilot, DayPilotScheduler} from "@daypilot/daypilot-lite-react";

class Scheduler extends Component {

    constructor(props) {
        super(props);

        this.state = {
            timeHeaders: [{"groupBy":"Month"},{"groupBy":"Day","format":"d"}],
            scale: "Day",
            days: 31,
            startDate: "2021-07-01",
            timeRangeSelectedHandling: "Enabled",
            onTimeRangeSelected: async (args) => {
                const dp = args.control;
                const modal = await DayPilot.Modal.prompt("Create a new event:", "Event 1");
                dp.clearSelection();
                if (modal.canceled) { return; }
                dp.events.add({
                    start: args.start,
                    end: args.end,
                    id: DayPilot.guid(),
                    resource: args.resource,
                    text: modal.result
                });
            },
            treeEnabled: true,
            theme: "scheduler_default"
        };
    }

    componentDidMount() {

        // load resource and event data
        this.setState({
            resources: [
                {name: "Group 1", id: "group-a", expanded: true, children: [
                        {name: "Resource A", id: "A"},
                        {name: "Resource B", id: "B"},
                        {name: "Resource C", id: "C"},
                        {name: "Resource D", id: "D"},
                        {name: "Resource E", id: "E"},
                        {name: "Resource F", id: "F"},
                        {name: "Resource G", id: "G"}
                    ]}
            ],
            events: [
                {
                    id: 1,
                    text: "Event 1",
                    start: "2021-07-02T00:00:00",
                    end: "2021-07-05T00:00:00",
                    resource: "A"
                },
                {
                    id: 2,
                    text: "Event 2",
                    start: "2021-07-03T00:00:00",
                    end: "2021-07-10T00:00:00",
                    resource: "C",
                    barColor: "#38761d",
                    barBackColor: "#93c47d"
                },
                {
                    id: 3,
                    text: "Event 3",
                    start: "2021-07-02T00:00:00",
                    end: "2021-07-08T00:00:00",
                    resource: "D",
                    barColor: "#f1c232",
                    barBackColor: "#f1c232"
                },
                {
                    id: 4,
                    text: "Event 3",
                    start: "2021-07-02T00:00:00",
                    end: "2021-07-08T00:00:00",
                    resource: "E",
                    barColor: "#cc0000",
                    barBackColor: "#ea9999"
                }
            ]
        });

    }

    render() {
        var {...config} = this.state;
        return (
            <div>
                <div className={"space"}>
                    <select onChange={ev => this.setState({theme: ev.target.value})}>
                        <option value={"scheduler_default"}>Default</option>
                        <option value={"scheduler_green"}>Green</option>
                        <option value={"scheduler_white"}>White</option>
                        <option value={"scheduler_transparent"}>Transparent</option>
                        <option value={"scheduler_8"}>Theme 8</option>
                    </select>
                </div>
                <h1>OLA</h1>
                <DayPilotScheduler
                    {...config}
                    ref={component => {
                        this.scheduler = component && component.control;
                    }}
                />
            </div>
        );
    }
}

export default Scheduler;
