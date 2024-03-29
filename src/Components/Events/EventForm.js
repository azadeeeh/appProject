import '../App/App.css';
import categories from '../../Types/categories'

//EventForm taking formData, handleChange, handleSubmit props from createEvent 
//EventForm shows a form for creating events

const EventForm = ({ formData, handleChange, handleSubmit }) => {

    return (

        <form className="formStyle" onSubmit={handleSubmit}>
            <label className="labelStyle">
                Hobby Title:
                <input
                    className="inputStyle"
                    type="text"
                    name="hobbyTitle"
                    value={formData.hobbyTitle}
                    onChange={handleChange}
                    required
                />
            </label>
            <br />
            <label className="labelStyle">
                Category:
                <select
                    className="inputStyle"
                    name="hobbyType"
                    value={formData.hobbyType}
                    onChange={handleChange}
                    required
                >
                    <option value="" disabled>Select a category</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </label>

            <br />

            <label className="labelStyle">
                Date:
                <input
                    className="inputStyle"
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                />
            </label>
            <br />

            <label className="labelStyle">
                Time:
                <input
                    className="inputStyle"
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                />
            </label>
            <br />

            <label className="labelStyle">
                Location:
                <input
                    className="inputStyle"
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                />
            </label>
            <br />

            <label className="labelStyle">
                Planned Activity:
                <input
                    className="inputStyle"
                    type="text"
                    name="activity"
                    value={formData.activity}
                    onChange={handleChange}
                    required
                />
            </label>
            <br />

            <label className="labelStyle">
                Spaces Available:
                <input
                    className="inputStyle"
                    type="number"
                    name="spacesAvailable"
                    value={formData.spacesAvailable}
                    onChange={handleChange}
                    required
                />
            </label>
            <br />

            <button className="create-event-button" type="submit">Create Event</button>
        </form>



    );





};


export default EventForm;