import React, { useState } from 'react';
import "./ResourceTable.css"
import Modal from "./Modal"

const ResourceTable = ({resourcess, posts}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedHobby, setSelectedHobby] = useState('');

  const resources = [
    { id: 1, resource: 'Link 1', hobby: 'Reading', rating: 4, date: '2023-12-01' },
    { id: 2, resource: 'Link 2', hobby: 'Gardening', rating: 5, date: '2023-12-05' },
    // Add more resource objects as needed
  ];

  const openModal = (hobby) => {
    setSelectedHobby(hobby);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Resource</th>
            <th>Hobby</th>
            <th>Rating</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {resources.map((item) => (
            <tr key={item.id}>
              <td>
                <a href={item.resource} target="_blank" rel="noopener noreferrer">
                  {item.resource}
                </a>
              </td>
              <td>
                <button onClick={() => openModal(item.hobby)}>{item.hobby}</button>
              </td>
              <td>{item.rating}</td>
              <td>{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalOpen && (
        <Modal isOpen={modalOpen} closeModal={closeModal} />
      )}
    </div>
  );
};

export default ResourceTable;
