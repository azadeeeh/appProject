import React from 'react';
import "./ResourceTable.css"
// import Modal from "./Modal"
import CustomRating from '../CustomStarRating/StarRating.js';
import ResourceService from '../../Services/ResourceService.js';
import dateFormat from 'dateformat';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const ResourceTable = ({ resources, handleDelResource }) => {
  return (
    <div style={{overflowX:"auto"}}>
      <table>
        <thead>
          <tr>
            <th>Resource</th>
            <th>Category</th>
            <th>Rating</th>
            <th>Date</th>
            <th>Actions</th>
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
                {dateFormat(new Date(item.date * 1000), "dd-mm-yyyy")}
              </td>
              <td>
                <button onClick={() => { handleDelResource(item) }}><FontAwesomeIcon icon={faTrash} /></button>
                {/* <button><FontAwesomeIcon icon={faEdit}/></button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResourceTable;
