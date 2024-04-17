import { useState } from "react";
import { Persons } from "../data";
import Card from "./Card";

const Grid = () => {
    const [data, setData] = useState(Persons);

    const deleteData = (id) => {
        return setData(data.filter((person) => id !== person.id))
    }

    const updateData = (id, newData) => {
    return setData(data.map(person => { if (id === person.id) { return { id: id, ...newData } } else { return person } }))
    }

    return (
        <div className='grid'>
            {
                data.map(person => (
                    <Card key={person.id} personData={person} deleteData={deleteData} updateData={updateData} />
                ))
            }
        </div>
    )
}

export default Grid;