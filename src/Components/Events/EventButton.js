
import '../App/App.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; //useNavigate is from react-router-dom library, it allows to navigate to different pages or URLs

//event button uses the state called showEvents which initially is true 
//and it changes through setShowEevents
//it checks if showEvent is true after clicking is uses navigate to route to the event page
//if showEvent is false it navigates to the main page

const EventButton = () => {
    const [showEvents, setShowEvents] = useState(true);  //showing when the button is clicked and unclicked
    const navigate = useNavigate();

    const toggleEvents = () => {
        setShowEvents(!showEvents);
    }
    //event button which toggles between events and hide events based on showEvents state

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