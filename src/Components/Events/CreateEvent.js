import React from 'react';
import { useEffect, useState } from 'react';
import EventForm from './EventForm';
import '../App/App.css';
import axios from 'axios';
import './event.css';
const URL = 'https://6576163c0febac18d403ac52.mockapi.io';


//create new event
const CreateEvent = newEvent => {
    // data
    const [formData, setFormData] = useState({
        hobbyTitle: '',
        hobbyType: '',
        date: '',
        time: '',
        location: '',
        activity: '',
        spacesAvailable: '',

    });

    const [createdEvent, setCreatedEvent] = useState(null); //contains the most recent event created
    const [events, setEvents] = useState([]); //the state that contains the list of existing events fetched from the mockAPI

    //fetching existing data
    const fetchData = async () => {
        try {
            const response = await axios.get(`${URL}/events`);
            setEvents(response.data);
        } catch (error) {
            console.error('error:', error);
        }
    };


    //ensuring fetchData runs once and avoid unnecessary re-fetching
    useEffect(() => {
        fetchData();
    }, []);

    //handle input changes by updating the state, it updates data based on user input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };






    //display existing events  it gets the events prop from createEvent and removeEvent from the fun====
    const EventsList = ({ events, removeEvent }) => {
        return (
            <ul>
                {events.map(event => (
                    <li key={event.id}>
                        <p>Hobby Title: {event.hobbyTitle}</p>
                        <p>Category: {event.hobbyType}</p>
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



    //handle form submission and sends data to mockAPI
    const handleSubmit = async (e) => {
        e.preventDefault();


        try {
            //sending data to mock API
            const response = await axios.post(`${URL}/events`, {
                ...formData,

            }); //adding data to the existing ones

            // Reset the form data to its initial state
            setFormData({
                hobbyTitle: '',
                hobbyType: '',
                date: '',
                time: '',
                location: '',
                activity: '',
                spacesAvailable: '',
            });

            setCreatedEvent(response.data); //update data


            fetchData();
        } catch (error) {
            console.error('error:', error);
        }
        //console.log(formData);
    };

    //removing the Event by making a DELETE request to mockAPI
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