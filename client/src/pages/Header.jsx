import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import { RxExit } from "react-icons/rx";
import { BsFillCaretDownFill } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";

export default function Header() {
  const { user, setUser } = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef();

  //! Fetch events from the server -------------------------------------------------
  useEffect(() => {
    axios
      .get("/events")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);

  //! Search bar functionality ----------------------------------------------------
  useEffect(() => {
    const handleDocumentClick = (event) => {
      // Check if the clicked element is the search input or its descendant
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target)
      ) {
        setSearchQuery("");
      }
    };

    // Listen for click events on the entire document
    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  //! Logout Function --------------------------------------------------------
  async function logout() {
    await axios.post("/logout");
    setUser(null);
  }

  //! Search input ------------------------------------------------------------
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      <header className="flex items-center justify-between py-3 px-6 bg-white shadow-md">
        <Link to="/" className="flex items-center">
          <img src="../src/assets/logo.png" alt="Logo" className="w-24 h-8" />
        </Link>

        {/* ----------- Mobile and Tablet Menu (Hamburger) ----------- */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden text-2xl"
        >
          <FiMenu />
        </button>

        {/* ----------- Search Bar (Desktop) ----------- */}
        <div className="hidden lg:flex items-center bg-white rounded-lg py-1 px-4 shadow-sm">
          <button className="p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
          <div ref={searchInputRef} className="relative w-full">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearchInputChange}
              className="text-sm text-black outline-none w-full px-2 py-1"
            />
          </div>
        </div>

        {/* ----------- User Options for Desktop ----------- */}
        <div className="hidden lg:flex gap-6 text-sm">
          <Link to="/createEvent" className="hover:text-primary">
            Create Event
          </Link>
          <Link to="/wallet" className="hover:text-primary">
            Wallet
          </Link>
          <Link to="/verification" className="hover:text-primary">
            Center
          </Link>
          <Link to="/calendar" className="hover:text-primary">
            Calendar
          </Link>
        </div>

        {/* ----------- User Profile and Dropdown for Large Screens ----------- */}
        {!!user && (
          <div className="hidden lg:flex items-center gap-2">
            <Link to="/useraccount" className="font-semibold text-sm">
              {user.name.toUpperCase()}
            </Link>
            {/* <BsFillCaretDownFill
              className="h-5 w-5 cursor-pointer"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            /> */}
            <button onClick={logout} className="flex items-center text-sm">
              <span className="mr-1">Log out</span> <RxExit />
            </button>
          </div>
        )}

        {/* ----------- Sign In Button for Desktop Only ----------- */}
        {!user && (
          <Link to="/login" className="hidden lg:block">
            <button className="primary text-sm">Sign In</button>
          </Link>
        )}

        {/* ----------- Dropdown for User Profile (Mobile & Tablet) ----------- */}
        {isMenuOpen && !!user && (
          <div className="absolute right-0 top-16 bg-white shadow-md rounded-lg z-10 py-2 w-48 lg:hidden">
            <Link
              to="/createEvent"
              className="block py-2 px-4 hover:bg-gray-100"
            >
              Create Event
            </Link>
            <Link to="/wallet" className="block py-2 px-4 hover:bg-gray-100">
              Wallet
            </Link>
            <Link
              to="/verification"
              className="block py-2 px-4 hover:bg-gray-100"
            >
              Center
            </Link>
            <Link to="/calendar" className="block py-2 px-4 hover:bg-gray-100">
              Calendar
            </Link>
            <Link
              to="/useraccount"
              className="block py-2 px-4 hover:bg-gray-100"
            >
              My Account
            </Link>
            <button
              onClick={logout}
              className="block py-2 px-4 text-left hover:bg-gray-100"
            >
              Log out
            </button>
          </div>
        )}

        {/* ----------- Mobile and Tablet Menu (Expanded View) ----------- */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-14 left-0 right-0 bg-white shadow-lg z-20 py-2">
            <div className="flex flex-col px-4">
              {/* Mobile and Tablet Search Bar */}
              <div className="flex items-center bg-white rounded-lg py-1 px-2 shadow-sm mb-4">
                <button className="p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                </button>
                <div ref={searchInputRef} className="relative w-full">
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    className="text-sm text-black outline-none w-full px-2 py-1"
                  />
                </div>
              </div>
              <Link to="/createEvent" className="py-2 hover:bg-gray-100">
                Create Event
              </Link>
              <Link to="/wallet" className="py-2 hover:bg-gray-100">
                Wallet
              </Link>
              <Link to="/verification" className="py-2 hover:bg-gray-100">
                Center
              </Link>
              <Link to="/calendar" className="py-2 hover:bg-gray-100">
                Calendar
              </Link>
              <Link to="/useraccount" className="py-2 hover:bg-gray-100">
                My Account
              </Link>
              {!!user && (
                <button
                  onClick={logout}
                  className="py-2 hover:bg-gray-100 text-left w-full"
                >
                  Log out
                </button>
              )}
              {!user && (
                <Link to="/login">
                  <button className="py-2 hover:bg-gray-100 text-left w-full">
                    Sign In
                  </button>
                </Link>
              )}
            </div>
          </div>
        )}
      </header>

      {/* ----------- Search Results (Responsive) ----------- */}
      {searchQuery && (
        <div className="absolute left-0 right-0 top-16 bg-white shadow-lg z-10 p-4">
          {events
            .filter((event) =>
              event.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((event) => (
              <div key={event._id} className="py-2">
                <Link to={`/event/${event._id}`}>
                  <div className="text-black">{event.title}</div>
                </Link>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
