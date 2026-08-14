import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">
          ✦ Blog
        </Link>

        <div className="hidden md:flex items-center gap-7 text-sm">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/blogs" className="hover:text-blue-600">Blogs</Link>

          {token && (
            <>
              <Link to="/dashboard" className="hover:text-blue-600">
                Dashboard
              </Link>
              <Link to="/write" className="hover:text-blue-600">
                Write
              </Link>
            </>
          )}
        </div>

        <div>
          {token ? (
            <button
              onClick={handleLogout}
              className="bg-black text-white px-5 py-2 rounded-full text-sm"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-black text-white px-5 py-2 rounded-full text-sm"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
