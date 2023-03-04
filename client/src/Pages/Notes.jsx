import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './notes.css';
import Addnotes from './Addnotes';

export default function Notes() {
     const [notes, setNotes] = useState([])
     const [isAdding, setIsAdding] = useState(false)

     const handleToggle = () => {
          setIsAdding(!isAdding)
     }

     useEffect(() => {
          const data = async () => {
               try {
                    const res = await axios.get("http://localhost:5000/api/notes")
                    setNotes(res.data)
               } catch (error) {
                    console.log(error)
               }
          }
          data()
     }, [notes])

     const handleDelete = async (id) => {
          try {
               await axios.delete(`http://localhost:5000/api/notes/` + id)
          } catch (err) {
               console.log(err)
          }
     }

     return (
          <>
               <nav className='navbar'>
                    <div className='itams'><i className="fa fa-bars" aria-hidden="true"></i>Notes</div>
               </nav>
               {
                    isAdding ? (
                         <Addnotes isAdding={isAdding} setIsAdding={setIsAdding} />
                    ) : (
                         <div className='btn'>
                              <button
                                   className='post-btn'
                                   onClick={handleToggle}
                                   style={{
                                        backgroundColor: '#007bff',
                                        color: '#fff',
                                        border: 'none',
                                        padding: '10px 20px',
                                        borderRadius: '5px',
                                        transition: 'all 0.3s ease',
                                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', /* add a box shadow */
                                        cursor: 'pointer' /* change cursor to pointer on hover */
                                   }}
                                   onMouseEnter={(e) => e.target.style.backgroundColor = '#0069d9'} /* change background color on hover */
                                   onMouseLeave={(e) => e.target.style.backgroundColor = '#007bff'} /* change back to original background color */
                              >
                                   Add Note
                              </button>
                         </div>

                    )
               }
               <div className='Card-container'>
                    {notes?.map((note => {
                         return (
                              <div className="content" key={note.id}>
                                   <div className='icon-container'>
                                        <Link to={`/update/${note.id}`} className='icon1'><i className="fa fa-pencil-square-o " aria-hidden="true"></i></Link>
                                        <i className="fa fa-trash-o icon2" onClick={() => handleDelete(note.id)}></i>
                                   </div>
                                   <div className="title-info">
                                        <span className="title-label">Title:</span> {note.title}
                                   </div>
                                   <div className="description-info">
                                        <span className="description-label">Description:</span> {note.description}
                                   </div>
                              </div>
                         )
                    }))}
               </div>
          </>
     )
}
