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
                    <ActiveClassLink to="/">Home</ActiveClassLink>
                    <ActiveClassLink to="/Hobbies">Hobbies</ActiveClassLink>
                    <ActiveClassLink to="/Drafts">Drafts</ActiveClassLink>
                    <ActiveClassLink to="/Library">Library</ActiveClassLink>
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