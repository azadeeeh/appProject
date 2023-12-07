
import '../App/App.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EventButton = () => {
    const [showEvents, setShowEvents] = useState(true);  //showing when the button is clicked and unclicked
    const navigate = useNavigate();

    const toggleEvents = () => {
        setShowEvents(!showEvents);
    }
    //event button which toggles between events and hide events
    return (
        <div>
            {showEvents ? (
                <button onClick={() => { toggleEvents(); navigate('/create-event'); }} className="event-button">
                    Events
                </button>
            ) : (
                <button onClick={() => { toggleEvents(); navigate('/'); }} className="event-button">
                    Hide Events
                </button>


            )}
        </div>

    );
};

export default EventButton;