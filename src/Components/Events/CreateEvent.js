import React from 'react';
import { useEffect, useState } from 'react';
import EventForm from './EventForm';
import '../App/App.css';
import axios from 'axios';
import './event.css';
const URL = 'https://6576163c0febac18d403ac52.mockapi.io';



const EventsList = ({ events, removeEvent }) => {
    return (
        <ul>
            {events.map(event => (
                <li key={event.id}>
                    <p>Hobby Type: {event.hobbyType}</p>
                    <p>Date: {event.date}</p>
                    <p>Time: {event.time}</p>
                    <p>Location: {event.location}</p>
                    <p>Activity: {event.activity}</p>
                    <p>Spaces Available: {event.spacesAvailable}</p>
                    <button className="remove-button" onClick={() => removeEvent(event.id)}>remove</button>
                </li>
            ))}
        </ul>
    );
};


const CreateEvent = newEvent => {
    // data
    const [formData, setFormData] = useState({
        hobbyType: '',
        date: '',
        time: '',
        location: '',
        activity: '',
        spacesAvailable: '',
    });

    const [createdEvent, setCreatedEvent] = useState(null);
    const [events, setEvents] = useState([]);

    //fetching existing data
    const fetchData = () => {
        axios.get(`${URL}/events`)
            .then(response => {
                setEvents(response.data);
            }).catch(error => {
                console.error('error:', error);
            });
    }

    //ensuring fetchData runs once and avoid unnecessary re-fetching
    useEffect(() => {
        fetchData();
    }, []);

    //handle input changes by updating the state
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };


    //handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();


        try {
            //sending data to mock API
            const response = await axios.post(`${URL}/events`, {
                ...formData,

            }); //adding data to the existing ones

            setCreatedEvent(response.data); //update data

            fetchData();
        } catch (error) {
            console.error('error:', error);
        }
        //console.log(formData);
    };

    //remove Event
    const removeEvent = async (eventId) => {
        try {
            await axios.delete(`${URL}/events/${eventId}`);
            fetchData();
        } catch (error) {
            console.error('error:', error);


        }
    };


    return (
        <div className="event-main">
            <h2>Create Event</h2>
            <EventForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />

            <div>
                <h2>Existing Events</h2>
                <EventsList events={events} removeEvent={removeEvent} />
            </div>



        </div>
    );
};

export default CreateEvent;