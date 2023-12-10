



const EventForm = ({ formData, handleChange, handleSubmit }) => {

    return (

        <form onSubmit={handleSubmit}>
            <label>
                Hobby Type:
                <input
                    type="text"
                    name="hobbyType"
                    value={formData.hobbyType}
                    onChange={handleChange}
                    required
                />
            </label>
            <br />

            <label>
                Date:
                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                />
            </label>
            <br />

            <label>
                Time:
                <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                />
            </label>
            <br />

            <label>
                Location:
                <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                />
            </label>
            <br />

            <label>
                Planned Activity:
                <input
                    type="text"
                    name="activity"
                    value={formData.activity}
                    onChange={handleChange}
                    required
                />
            </label>
            <br />

            <label>
                Spaces Available:
                <input
                    type="number"
                    name="spacesAvailable"
                    value={formData.spacesAvailable}
                    onChange={handleChange}
                    required
                />
            </label>
            <br />

            <button type="submit">Create Event</button>
        </form>



    );





};


export default EventForm;