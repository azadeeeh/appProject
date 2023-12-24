import React from 'react';
import "./ResourceTable.css"
// import Modal from "./Modal"
import CustomRating from '../CustomStarRating/StarRating.js';
import ResourceService from '../../Services/ResourceService.js';
import dateFormat from 'dateformat';

// const ResourceTable = ({ resources, posts }) => {
const ResourceTable = ({ resources }) => {
  // const [modalOpen, setModalOpen] = useState(false);
  // const [selectedHobby, setSelectedHobby] = useState('');

  // const openModal = (hobbyId) => {
  //   setSelectedHobby(posts.find(hobbyItem => hobbyItem.id === hobbyId));
  //   setModalOpen(true);
  // };

  // const closeModal = () => {
  //   setModalOpen(false);
  // };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Resource</th>
            <th>Category</th>
            <th>Rating</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {resources.map((item) => (
            <tr key={item.id}>
              <td>
                {item.content}
              </td>
              <td>
                {item.category}
              </td>
              <td><CustomRating canSpin={true} entity={item} entityService={ResourceService} useRandomUserId={true} starCount={5} averageStarDeciamlPoint={1} /></td>
              <td>
                {dateFormat(new Date(item.date * 1000), "dd-mm-yyyy")}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* {modalOpen && (
        <Modal isOpen={modalOpen} closeModal={closeModal} hobby={selectedHobby} />
      )} */}
    </div>
  );
};

export default ResourceTable;
