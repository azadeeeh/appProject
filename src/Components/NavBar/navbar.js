import { Link, useMatch, useResolvedPath } from 'react-router-dom'
import './navbar.css'
import logo from '../../Assets/images/hlogo-tbg.png'

const Navbar = () => {
    return (
        <>
            <Link to={"/"} >
                <img className="logo" src={logo} alt="Home Page" />
            </Link>
            <nav className='navbar'>
                <ul>

                    {/* TODO: All hobbies created by the logged-in user will be displayed in the following route */}
                    <ActiveClassLink to="/">Home</ActiveClassLink>

                    {/* TODO: All hobbies will be displayed in the following route */}
                    <ActiveClassLink to="/Hobbies">Hobbies</ActiveClassLink>

                    {/* TODO: All hobbies with rating less than 4.5 will be displayed in the following route */}
                    <ActiveClassLink to="/Drafts">Drafts</ActiveClassLink>

                    {/* TODO: All hobbies with rating higher than 4.5 with at least 5 raters will be displayed in the following route */}
                    <ActiveClassLink to="/Library">Library</ActiveClassLink>

                    <ActiveClassLink to="/events">Events</ActiveClassLink>
                </ul>
            </nav>
        </>
    );
};

// Tutorial Soruce: https://www.youtube.com/watch?app=desktop&v=SLfhMt5OUPI
function ActiveClassLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to);
    const needActiveClass = useMatch({ path: resolvedPath.pathname, end: true });
    return (
        <li className={needActiveClass ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    )
}

export default Navbar;