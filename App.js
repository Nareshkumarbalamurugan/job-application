import React, { useState } from "react";
import "./styles.css";

const App = () => {
  // State for authentication
  const [isLogin, setIsLogin] = useState(true);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });
  const [authMessage, setAuthMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // State for jobs and applications
  const [jobs, setJobs] = useState([
    {
      id: 1,
      position: "Frontend Developer",
      company: "TechCorp",
      location: "San Francisco, CA",
      salary: "$90,000 - $120,000",
      description:
        "We are looking for an experienced React developer to join our team.",
    },
    {
      id: 2,
      position: "UX Designer",
      company: "DesignHub",
      location: "Remote",
      salary: "$80,000 - $110,000",
      description: "Join our design team to create beautiful user experiences.",
    },
    {
      id: 3,
      position: "Backend Engineer",
      company: "DataSystems",
      location: "New York, NY",
      salary: "$100,000 - $140,000",
      description: "Looking for a Node.js developer with database experience.",
    },
    {
      id: 4,
      position: "Product Manager",
      company: "InnovateCo",
      location: "Chicago, IL",
      salary: "$110,000 - $150,000",
      description: "Lead our product team to deliver amazing features.",
    },
  ]);

  const [selectedJob, setSelectedJob] = useState(null);
  const [applicationData, setApplicationData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    resume: null,
  });
  const [applications, setApplications] = useState([]);
  const [activeSection, setActiveSection] = useState("home");

  // Authentication handlers
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!loginData.email || !loginData.password) {
      setAuthMessage("Please fill in all fields");
      return;
    }

    // Simulate successful login
    setAuthMessage("Login successful!");
    setIsLoggedIn(true);
    setCurrentUser({
      email: loginData.email,
      name: "John Doe", // In a real app, this would come from the backend
    });
    setActiveSection("jobs");
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (
      !registerData.firstName ||
      !registerData.lastName ||
      !registerData.email ||
      !registerData.password
    ) {
      setAuthMessage("Please fill in all required fields");
      return;
    }

    // Simulate successful registration
    setAuthMessage("Registration successful! Please login.");
    setIsLogin(true);
    setLoginData({ email: registerData.email, password: "" });
  };

  // Application handlers
  const handleApplyClick = (job) => {
    if (!isLoggedIn) {
      setActiveSection("login");
      setAuthMessage("Please login to apply for jobs");
      return;
    }
    setSelectedJob(job);
    setApplicationData({
      firstName: currentUser ? currentUser.name.split(" ")[0] : "",
      lastName: currentUser ? currentUser.name.split(" ")[1] : "",
      email: currentUser ? currentUser.email : "",
      phone: "",
      resume: null,
    });
    setActiveSection("apply");
  };

  const handleApplicationChange = (e) => {
    const { name, value } = e.target;
    setApplicationData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setApplicationData((prev) => ({ ...prev, resume: e.target.files[0] }));
  };

  const handleApplicationSubmit = (e) => {
    e.preventDefault();
    if (
      !applicationData.firstName ||
      !applicationData.lastName ||
      !applicationData.email ||
      !applicationData.resume
    ) {
      setAuthMessage(
        "Please fill in all required fields and upload your resume"
      );
      return;
    }

    const newApplication = {
      id: applications.length + 1,
      jobId: selectedJob.id,
      jobTitle: selectedJob.position,
      company: selectedJob.company,
      date: new Date().toLocaleDateString(),
      status: "Submitted",
      ...applicationData,
    };

    setApplications((prev) => [...prev, newApplication]);
    setAuthMessage("Application submitted successfully!");
    setActiveSection("myApplications");
  };

  // Navigation
  const handleNavClick = (section) => {
    if ((section === "apply" || section === "myApplications") && !isLoggedIn) {
      setActiveSection("login");
      setAuthMessage("Please login to access this section");
      return;
    }
    setActiveSection(section);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setActiveSection("home");
    setAuthMessage("Logged out successfully");
  };

  return (
    <div className="job-portal">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">JobConnect</div>
        <div className="nav-links">
          <button onClick={() => handleNavClick("home")}>Home</button>
          <button onClick={() => handleNavClick("jobs")}>Jobs</button>
          <button onClick={() => handleNavClick("apply")}>Apply</button>
          <button onClick={() => handleNavClick("myApplications")}>
            My Applications
          </button>
          {!isLoggedIn ? (
            <>
              <button onClick={() => handleNavClick("login")}>Login</button>
              <button onClick={() => handleNavClick("register")}>
                Register
              </button>
            </>
          ) : (
            <button onClick={handleLogout}>Logout</button>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      {activeSection === "home" && (
        <section className="hero">
          <div className="hero-content">
            <h1>Find your dream job today</h1>
            <button
              className="cta-button"
              onClick={() => handleNavClick("jobs")}
            >
              Browse Jobs
            </button>
          </div>
        </section>
      )}

      {/* Login/Signup Section */}
      {(activeSection === "login" || activeSection === "register") && (
        <section className="auth-section">
          <div className="auth-toggle">
            <button
              className={isLogin ? "active" : ""}
              onClick={() => {
                setIsLogin(true);
                setActiveSection("login");
              }}
            >
              Login
            </button>
            <button
              className={!isLogin ? "active" : ""}
              onClick={() => {
                setIsLogin(false);
                setActiveSection("register");
              }}
            >
              Register
            </button>
          </div>

          {authMessage && <div className="auth-message">{authMessage}</div>}

          {isLogin ? (
            <form className="auth-form" onSubmit={handleLoginSubmit}>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  required
                />
              </div>
              <button type="submit" className="submit-button">
                Login
              </button>
            </form>
          ) : (
            <form className="auth-form" onSubmit={handleRegisterSubmit}>
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={registerData.firstName}
                  onChange={handleRegisterChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={registerData.lastName}
                  onChange={handleRegisterChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={registerData.email}
                  onChange={handleRegisterChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={registerData.phone}
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={registerData.password}
                  onChange={handleRegisterChange}
                  required
                />
              </div>
              <button type="submit" className="submit-button">
                Register
              </button>
            </form>
          )}
        </section>
      )}

      {/* Jobs Section */}
      {activeSection === "jobs" && (
        <section className="jobs-section">
          <h2>Available Jobs</h2>
          <div className="jobs-grid">
            {jobs.map((job) => (
              <div key={job.id} className="job-card">
                <h3>{job.position}</h3>
                <p className="company">{job.company}</p>
                <p className="location">{job.location}</p>
                <p className="salary">{job.salary}</p>
                <p className="description">{job.description}</p>
                <button
                  className="apply-button"
                  onClick={() => handleApplyClick(job)}
                >
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Application Form Section */}
      {activeSection === "apply" && selectedJob && (
        <section className="application-section">
          <h2>Apply for {selectedJob.position}</h2>
          <p className="company-name">{selectedJob.company}</p>

          {authMessage && <div className="auth-message">{authMessage}</div>}

          <form className="application-form" onSubmit={handleApplicationSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={applicationData.firstName}
                  onChange={handleApplicationChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={applicationData.lastName}
                  onChange={handleApplicationChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={applicationData.email}
                  onChange={handleApplicationChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={applicationData.phone}
                  onChange={handleApplicationChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Resume (PDF or DOCX)</label>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                required
              />
            </div>

            <button type="submit" className="submit-button">
              Submit Application
            </button>
          </form>
        </section>
      )}

      {/* My Applications Section */}
      {activeSection === "myApplications" && (
        <section className="applications-section">
          <h2>My Applications</h2>
          {applications.length === 0 ? (
            <p>You haven't submitted any applications yet.</p>
          ) : (
            <div className="applications-list">
              {applications.map((app) => (
                <div key={app.id} className="application-card">
                  <h3>{app.jobTitle}</h3>
                  <p className="company">{app.company}</p>
                  <p className="date">Applied on: {app.date}</p>
                  <p className="status">Status: {app.status}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="footer-links">
          <a href="#">Careers</a>
          <a href="#">FAQs</a>
          <a href="#">Contact Us</a>
          <a href="#">Privacy Policy</a>
        </div>
        <div className="social-media">
          <a href="#" className="social-icon">
            FB
          </a>
          <a href="#" className="social-icon">
            TW
          </a>
          <a href="#" className="social-icon">
            IG
          </a>
          <a href="#" className="social-icon">
            LI
          </a>
        </div>
        <p className="copyright">© 2023 JobConnect. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
