import React, { useEffect } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import "./update.css"

export default function Update() {
    const [input, setInput] = useState({
        title: "",
        description: "",
    });
    const [error, setError] = useState({})
    const navigate = useNavigate()
    const { id } = useParams()

    const handleChange = (e) => {
        setInput(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }
    useEffect(() => {
        const fetchdata = async (id) => {
            const res = await axios.get(`http://localhost:5000/api/notes/${id}`)
            const note = {
                title: res.data[0].title,
                description: res.data[0].description
            }
            setInput(note)
        }
        fetchdata(id)
    }, [id])
    const handlesend = async () => {
        if (!validation(input)) return
        try {
            const response = await axios.put(`http://localhost:5000/api/notes/${id}`, input)
            if (response) return navigate("/", { replace: true })
        } catch (error) {
            console.log(error)
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
            <div className='input'>
                <h1 style={{ color: "#007bff" }}>Update your post</h1>
                <input className="input-field" value={input.title} name="title" placeholder="Enter your title" onChange={handleChange} />
                <p style={{ color: "red" }}>{error.title}</p>
                <textarea className="input-field2" value={input.description} name="description" placeholder="Enter your Description" onChange={handleChange} />
                <p style={{ color: "red" }}>{error.description}</p>
                <button className="send-btn" onClick={handlesend}>Update</button>
            </div>
        </>
    )
}
