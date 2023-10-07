import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Signup = () => {
  // Initialize the navigation function from React Router
  const navigate = useNavigate();

  // Initialize a state variable called inputValue to manage form input values
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
  });

  // Destructure the email, password, and username from the inputValue state
  const { email, password, username } = inputValue;

  // Function to handle changes in input fields and update the inputValue state
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  // Function to display an error toast message
  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });

  // Function to display a success toast message
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
    });

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to the server for user registration
      const { data } = await axios.post(
        "http://localhost:4000/signup",
        {
          ...inputValue,
        },
        { withCredentials: true } // Include credentials for cross-origin requests
      );

      // Destructure the success and message properties from the response data
      const { success, message } = data;

      if (success) {
        // If registration is successful, display a success toast message
        handleSuccess(message);

        // Redirect to the homepage after a brief delay
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        // If registration fails, display an error toast message
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }

    // Clear the input values after form submission
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
      username: "",
    });
  };

  // Render the Signup component UI
  return (
    <div className="form_container">
      <h2>Signup Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="email">Username</label>
          <input
            type="text"
            name="username"
            value={username}
            placeholder="Enter your username"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={handleOnChange}
          />
        </div>
        <button type="submit">Submit</button>
        <span>
          Already have an account? <Link to={"/login"}>Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signup;
