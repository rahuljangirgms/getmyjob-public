// src/pages/dashboard/recruiter/settings/EmployerSettings.jsx

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// (Optional) import your update action if you have one:
// import { updateRecruiterRequest } from "../../../store/slices/authSlice";

const EmployerSettings = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  // Local form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    company: "",
    mobile: "",
  });

  // Load user data into form on mount or when `user` changes
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        password: "", // Typically we do not store password in Redux
        company: user.company || "",
        mobile: user.mobile || "",
      });
    }
  }, [user]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Here you’d typically dispatch an action to update the user’s profile
    // For example:
    // dispatch(updateRecruiterRequest(formData));

    console.log("Submitting form data:", formData);
  };

  return (
    <div>
      <h1>Employer Settings</h1>

      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="name">Name:</label>
          <br />
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        {/* Email */}
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="email">Email:</label>
          <br />
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        {/* Password */}
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="password">Password:</label>
          <br />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        {/* Company */}
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="company">Company:</label>
          <br />
          <input
            type="text"
            name="company"
            id="company"
            value={formData.company}
            onChange={handleChange}
          />
        </div>

        {/* Mobile */}
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="mobile">Mobile:</label>
          <br />
          <input
            type="tel"
            name="mobile"
            id="mobile"
            value={formData.mobile}
            onChange={handleChange}
          />
        </div>

        {/* Submit */}
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EmployerSettings;
