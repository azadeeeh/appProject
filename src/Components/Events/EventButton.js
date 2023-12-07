import React from 'react';
import '../App/App.css';
import { Link } from 'react-router-dom';

const EventButton = () => {

    return (
        <div>
            <Link to='/create-event' className="event-button">
                Events
            </Link>
        </div>
    );
};

export default EventButton;