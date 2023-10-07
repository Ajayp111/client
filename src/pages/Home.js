import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Home = () => {
  const navigate = useNavigate();

  // Use cookies to manage user authentication token
  const [cookies, removeCookie] = useCookies([]);

  // Initialize state to store the username
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Function to verify the authentication cookie
    const verifyCookie = async () => {
      // Check if the authentication token is present in cookies
      if (!cookies.token) {
        // If not, navigate the user to the login page
        navigate("/login");
      }

      // Send a POST request to the server to verify the token's validity
      const { data } = await axios.post(
        "http://localhost:4000",
        {},
        { withCredentials: true } // Include credentials for cross-origin requests
      );

      // Destructure the response of data to get status and user.
      const { status, user } = data;

      // Update the state with the username
      setUsername(user);

      // If the token is valid (status is true), display a welcome message
      // using a toast notification
      return status
        ? toast(`Hello ${user}`, {
            position: "top-right",
          })
        : // If the token is not valid, remove the token cookie,
          // and navigate the user back to the login page
          (removeCookie("token"), navigate("/login"));
    };

    // Call the verifyCookie function when the component mounts
    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  // Function to handle user logout
  const Logout = () => {
    // Remove the authentication token cookie
    removeCookie("token");
    // Navigate the user to the signup page
    navigate("/signup");
  };

  // Render the Home component UI
  return (
    <>
      <div className="home_page">
        <h4>
          Welcome <span>{username}</span>
        </h4>
        <button onClick={Logout}>LOGOUT</button>
      </div>
      {/* Display toast notifications for messages */}
      <ToastContainer />
    </>
  );
};

export default Home;
