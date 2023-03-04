import React, { useState } from "react";
import axios from 'axios'
import "../App.css";
export default function Addnotes({ isAdding, setIsAdding }) {
    const [input, setInput] = useState({
        title: "",
        description: "",
    });
    const [error, setError] = useState({})

    const cancelToggle = () => {
        setIsAdding(!isAdding);
    }

    const handleChange = (e) => {
        setInput(prev => ({ ...prev, [e.target.name]: e.target.value }))

    }
    const handlesend = async (e) => {
        if (!validation(input)) return
        try {
            console.log('2');
            const res = await axios.post(`http://localhost:5000/api/notes`, input)
            if (res) {
                setIsAdding(!isAdding);
            }
        } catch (error) {
            setError(error.response.data)
        }
    }
    const validation = (Value) => {
        const error1 = {};
        if (!Value.title) {
            error1.title = "*TITLE IS REQUIRED"
        } if (!Value.description) {
            error1.description = "*DESCRIPTION IS REQUIRED"
        }
        setError(error1)
        if (!error1.title && !error1.description)
            return true;
        return false
    }

    return (
        <>
            <div className='input' style={{ marginTop: "5vh" }}>
                <h1 style={{ color: "blue" }}>Add Your Note</h1>
                <input className="input-field" name="title" placeholder="Enter your title" onChange={handleChange} />
                <p style={{ color: "red", marginBottom: "10px" }}>{error.title}</p>
                <textarea className="input-field2" name="description" placeholder="Enter your Description" onChange={handleChange} />
                <p style={{ color: "red", marginBottom: "10px" }}>{error.description}</p>
                <button className="send-btn" onClick={handlesend}>Save</button>
                <button className="send-btn" onClick={cancelToggle}>Cancel</button>
            </div>

        </>
    )
}
