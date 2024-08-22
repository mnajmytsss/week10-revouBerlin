import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem('user');

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-blue-400 p-4 flex justify-between items-center">
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="text-white hover:text-gray-200">Home</Link>
        </li>
        <li>
          <Link to="/about" className="text-white hover:text-gray-200">About</Link>
        </li>
        <li>
          <Link to="/contact" className="text-white hover:text-gray-200">Contact</Link>
        </li>
      </ul>
      {user && (
        <button onClick={handleLogout} className="text-white hover:text-gray-200">
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navbar;
