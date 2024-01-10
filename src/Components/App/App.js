import '../App/App.css';
import CreateEvent from '../Events/CreateEvent';
import { Routes, Route, Link } from 'react-router-dom';/*Routes is a parent componenet that wraps all the components and defined to find the routing structure of the application*/
import Navbar from '../NavBar/navbar';
import PostsPage from '../Posts/PostsPage'; /*import the component postpages in order to either show the pages or create a new page*/
import DraftsPage from '../Resources/DraftsPage';
import LibraryPage from '../Resources/LibraryPage';
import EventButton from '../Events/EventButton';
import drafts from "../../Assets/images/drafts.png"
import hobbies from "../../Assets/images/hobbies.png"
import resources from "../../Assets/images/resources.png"
const App = () => {
  return (
    <div>
      <header>
        <Navbar />
        <EventButton />
      </header>

      <hr className="hrStyle" /> {/*a visual separation or break between the header and the main content and it used hrstyle for the CSS format */}

      {/* <EventButton /> */}

      <Routes> {/*Routes is a parent componenet that wraps all the components and defined to find the routing structure of the application*/}
        <Route path='/Drafts' element={<DraftsPage />} /> {/*if the user click on the Drafts page, render the DraftPage component that we imported above from Resources/DraftPage path*/}
        <Route path='/Library' element={<LibraryPage />} />
        <Route path='/Hobbies' element={<PostsPage showAddPost={true} />} />  {/*if showAddPost is True, it goes to the Hobbies page otherwise goes to the home page*/}
        <Route path='/' element=
          {
            <>
              <div className='home-menu'>
                <Link to={'/Hobbies'}>
                  <div>
                    <div>
                      <img src={hobbies} alt={"Hobbies Page"}></img>
                    </div>
                    <div>
                      Hobbies
                    </div>
                  </div>
                </Link>
                <Link to={'/Drafts'}>
                  <div>
                    <div>
                      <img src={drafts} alt={"Drafts Page"}></img>
                    </div>
                    <div>
                      Drafts
                    </div>
                  </div></Link>
                <Link to={'/Library'}>
                  <div>
                    <div>
                      <img src={resources} alt={"Resources Page"}></img>
                    </div>
                    <div>
                      Resources
                    </div>
                  </div>
                </Link>
              </div>
            </>
          } />
        <Route path="/create-event" element={<CreateEvent />} />
      </Routes>

      {/* <footer>
        <p> Hobby Hut &copy; 2023</p>
      </footer> */}
    </div>
  );
};

export default App;
