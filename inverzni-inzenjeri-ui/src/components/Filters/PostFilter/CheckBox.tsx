import React, {useState} from "react";
import {Checkbox, Collapse} from 'antd';
import "./Filter.css"

const {Panel} = Collapse

export default function CheckBox(props) {

    const [Checked, setChecked] = useState([] as any)

    const objave = [
        {
            "id": 1,
            "name": "Slike"
        },
        {
            "id": 2,
            "name": "Događaji"
        },
        {
            "id": 3,
            "name": "Bedževi"
        },
        {
            "id": 4,
            "name": "Izleti"
        }
    ]

    const handleToggle = (valueId) => {

        const currentIndex = Checked.indexOf(valueId);
        const newChecked = [...Checked];

        if (currentIndex === -1) {
            newChecked.push(valueId)
        } else {
            newChecked.splice(currentIndex, 1)
        }
        setChecked(newChecked)
        props.handleFilters(newChecked)

    }

    const renderCheckboxLists = () => objave.map((value, index) => (
        <React.Fragment key={index}>
            <Checkbox
                onChange={() => handleToggle(value.id)}
                type="checkbox"
                checked={Checked.indexOf(value.id) === -1}
            />
            <span>{value.name}</span>
        </React.Fragment>
    ))

    return(
        <div>
            <Collapse defaultActiveKey={['0']} >
                <Panel header={"Filter by"} key="1">
                    {renderCheckboxLists()}
                </Panel>
            </Collapse>
        </div>
    )

}