import '../App/App.css';
import CreateEvent from '../Events/CreateEvent';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../NavBar/navbar';
import PostsPage from '../Posts/PostsPage';
import DraftsPage from '../Resources/DraftsPage';
import LibraryPage from '../Resources/LibraryPage';

const App = () => {
  return (
    <div>
      <header>
        <Navbar />
      </header>

      <hr className="hrStyle" />

      {/* <EventButton /> */}

      <Routes>
        <Route path='/Drafts' element={<DraftsPage />} />
        <Route path='/Library' element={<LibraryPage />} />
        <Route path='/Hobbies' element={<PostsPage showAddPost={true} />} />
        <Route path='/' element={<PostsPage showAddPost={false} />} />
        <Route path="/create-event" element={<CreateEvent />} />
      </Routes>

      <footer>
        <p> Hobby Hut &copy; 2023</p>
      </footer>
    </div>
  );
};

export default App;
