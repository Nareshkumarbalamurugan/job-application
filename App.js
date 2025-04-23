import React, { useState } from "react";
import "./styles.css";

const App = () => {
  // Authentication state
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

  // Jobs and applications state
  const [jobs, setJobs] = useState([
    {
      id: 1,
      position: "Frontend Developer",
      company: "TechCorp",
      location: "San Francisco, CA",
      salary: "$90,000 - $120,000",
      description:
        "We're seeking a skilled React developer to join our innovative team. You'll work on cutting-edge web applications using modern JavaScript frameworks.",
      posted: "2 days ago",
      type: "Full-time",
    },
    {
      id: 2,
      position: "UX Designer",
      company: "DesignHub",
      location: "Remote",
      salary: "$80,000 - $110,000",
      description:
        "Join our design team to create beautiful, intuitive user experiences. Portfolio required.",
      posted: "1 week ago",
      type: "Contract",
    },
    {
      id: 3,
      position: "Backend Engineer",
      company: "DataSystems",
      location: "New York, NY",
      salary: "$100,000 - $140,000",
      description:
        "Looking for a Node.js developer with database experience to optimize our backend services.",
      posted: "3 days ago",
      type: "Full-time",
    },
    {
      id: 4,
      position: "Product Manager",
      company: "InnovateCo",
      location: "Chicago, IL",
      salary: "$110,000 - $150,000",
      description:
        "Lead our product team to deliver amazing features that customers love. MBA preferred.",
      posted: "Just now",
      type: "Full-time",
    },
    {
      id: 5,
      position: "DevOps Engineer",
      company: "CloudScale",
      location: "Austin, TX",
      salary: "$95,000 - $130,000",
      description:
        "Help us build and maintain our cloud infrastructure with CI/CD pipelines and automation.",
      posted: "1 day ago",
      type: "Full-time",
    },
    {
      id: 6,
      position: "Data Scientist",
      company: "AnalyticsPro",
      location: "Boston, MA",
      salary: "$120,000 - $160,000",
      description:
        "Use machine learning to extract insights from large datasets and drive business decisions.",
      posted: "5 days ago",
      type: "Full-time",
    },
  ]);

  const [selectedJob, setSelectedJob] = useState(null);
  const [applicationData, setApplicationData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    resume: null,
    coverLetter: "",
  });
  const [applications, setApplications] = useState([]);
  const [activeSection, setActiveSection] = useState("home");
  const [searchTerm, setSearchTerm] = useState("");

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
    if (!loginData.email || !loginData.password) {
      setAuthMessage("Please fill in all fields");
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setAuthMessage("Login successful! Redirecting...");
      setIsLoggedIn(true);
      setCurrentUser({
        email: loginData.email,
        name: `${registerData.firstName || "John"} ${
          registerData.lastName || "Doe"
        }`,
      });
      setActiveSection("jobs");
    }, 1000);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (
      !registerData.firstName ||
      !registerData.lastName ||
      !registerData.email ||
      !registerData.password
    ) {
      setAuthMessage("Please fill in all required fields");
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setAuthMessage("Registration successful! Please login.");
      setIsLogin(true);
      setLoginData({ email: registerData.email, password: "" });
    }, 1000);
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
      lastName: currentUser ? currentUser.name.split(" ")[1] || "" : "",
      email: currentUser ? currentUser.email : "",
      phone: "",
      resume: null,
      coverLetter: "",
    });
    setActiveSection("apply");
  };

  const handleApplicationChange = (e) => {
    const { name, value } = e.target;
    setApplicationData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setApplicationData((prev) => ({
      ...prev,
      [e.target.name]: e.target.files[0],
    }));
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
    setTimeout(() => {
      setActiveSection("myApplications");
    }, 1500);
  };

  // Navigation
  const handleNavClick = (section) => {
    if ((section === "myApplications" || section === "apply") && !isLoggedIn) {
      setActiveSection("login");
      setAuthMessage("Please login to access this section");
      return;
    }
    setActiveSection(section);
    setAuthMessage("");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setActiveSection("home");
    setAuthMessage("Logged out successfully");
  };

  // Filter jobs based on search term
  const filteredJobs = jobs.filter(
    (job) =>
      job.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="job-portal">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo" onClick={() => handleNavClick("home")}>
          <span className="logo-icon">💼</span>
          <span>JobConnect</span>
        </div>
        <div className="nav-links">
          <button
            className={activeSection === "home" ? "active" : ""}
            onClick={() => handleNavClick("home")}
          >
            Home
          </button>
          <button
            className={activeSection === "jobs" ? "active" : ""}
            onClick={() => handleNavClick("jobs")}
          >
            Browse Jobs
          </button>
          <button
            className={activeSection === "myApplications" ? "active" : ""}
            onClick={() => handleNavClick("myApplications")}
          >
            My Applications
          </button>
          {!isLoggedIn ? (
            <>
              <button
                className={activeSection === "login" ? "active" : ""}
                onClick={() => handleNavClick("login")}
              >
                Login
              </button>
              <button
                className={activeSection === "register" ? "active" : ""}
                onClick={() => handleNavClick("register")}
              >
                Register
              </button>
            </>
          ) : (
            <div className="user-section">
              <span className="welcome-msg">
                Hi, {currentUser?.name.split(" ")[0]}
              </span>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        {/* Hero Section */}
        {activeSection === "home" && (
          <section className="hero">
            <div className="hero-content">
              <h1>Find Your Dream Job Today</h1>
              <p className="hero-subtitle">
                Join thousands of companies hiring the best talent
              </p>
              <button
                className="cta-button"
                onClick={() => handleNavClick("jobs")}
              >
                Browse Jobs
              </button>
            </div>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">10,000+</span>
                <span className="stat-label">Jobs Posted</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">5,000+</span>
                <span className="stat-label">Companies Hiring</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">1M+</span>
                <span className="stat-label">Candidates Hired</span>
              </div>
            </div>
          </section>
        )}

        {/* Auth Sections */}
        {(activeSection === "login" || activeSection === "register") && (
          <section className="auth-section">
            <div className="auth-toggle">
              <button
                className={`toggle-btn ${isLogin ? "active" : ""}`}
                onClick={() => {
                  setIsLogin(true);
                  setActiveSection("login");
                }}
              >
                Login
              </button>
              <button
                className={`toggle-btn ${!isLogin ? "active" : ""}`}
                onClick={() => {
                  setIsLogin(false);
                  setActiveSection("register");
                }}
              >
                Register
              </button>
            </div>

            {authMessage && (
              <div
                className={`auth-message ${
                  authMessage.includes("success") ? "success" : "error"
                }`}
              >
                {authMessage}
              </div>
            )}

            {isLogin ? (
              <form className="auth-form" onSubmit={handleLoginSubmit}>
                <h2>Welcome Back</h2>
                <p className="form-subtitle">
                  Login to access your account and job applications
                </p>
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={loginData.email}
                    onChange={handleLoginChange}
                    placeholder="Enter your email"
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
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <div className="form-options">
                  <label className="remember-me">
                    <input type="checkbox" /> Remember me
                  </label>
                  <a href="#" className="forgot-password">
                    Forgot password?
                  </a>
                </div>
                <button type="submit" className="submit-button">
                  Login
                </button>
                <div className="auth-divider">
                  <span>or</span>
                </div>
                <button type="button" className="social-login google">
                  Continue with Google
                </button>
                <button type="button" className="social-login linkedin">
                  Continue with LinkedIn
                </button>
              </form>
            ) : (
              <form className="auth-form" onSubmit={handleRegisterSubmit}>
                <h2>Create Your Account</h2>
                <p className="form-subtitle">
                  Register to start applying for jobs
                </p>
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={registerData.firstName}
                      onChange={handleRegisterChange}
                      placeholder="Enter your first name"
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
                      placeholder="Enter your last name"
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={registerData.email}
                    onChange={handleRegisterChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={registerData.phone}
                    onChange={handleRegisterChange}
                    placeholder="Enter your phone number"
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    value={registerData.password}
                    onChange={handleRegisterChange}
                    placeholder="Create a password"
                    required
                  />
                  <div className="password-hint">
                    Must be at least 8 characters
                  </div>
                </div>
                <div className="form-options">
                  <label className="terms-agree">
                    <input type="checkbox" required /> I agree to the Terms of
                    Service and Privacy Policy
                  </label>
                </div>
                <button type="submit" className="submit-button">
                  Create Account
                </button>
                <div className="auth-divider">
                  <span>or</span>
                </div>
                <button type="button" className="social-login google">
                  Continue with Google
                </button>
                <button type="button" className="social-login linkedin">
                  Continue with LinkedIn
                </button>
              </form>
            )}
          </section>
        )}

        {/* Jobs Section */}
        {activeSection === "jobs" && (
          <section className="jobs-section">
            <div className="section-header">
              <h2>Available Job Positions</h2>
              <div className="search-filter">
                <div className="search-bar">
                  <input
                    type="text"
                    placeholder="Search jobs, companies, locations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button className="search-button">
                    <i className="search-icon">🔍</i>
                  </button>
                </div>
                <div className="filter-options">
                  <select>
                    <option>All Job Types</option>
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Contract</option>
                    <option>Remote</option>
                  </select>
                  <select>
                    <option>All Locations</option>
                    <option>Remote</option>
                    <option>United States</option>
                    <option>Canada</option>
                    <option>Europe</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="jobs-grid">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <div key={job.id} className="job-card">
                    <div className="job-header">
                      <div className="job-badge">{job.type}</div>
                      <div className="job-posted">{job.posted}</div>
                    </div>
                    <h3>{job.position}</h3>
                    <p className="company">
                      <span className="company-icon">🏢</span> {job.company}
                    </p>
                    <p className="location">
                      <span className="location-icon">📍</span> {job.location}
                    </p>
                    <p className="salary">
                      <span className="salary-icon">💰</span> {job.salary}
                    </p>
                    <p className="description">{job.description}</p>
                    <div className="job-footer">
                      <button
                        className="apply-button"
                        onClick={() => handleApplyClick(job)}
                      >
                        Apply Now
                      </button>
                      <button className="save-button">Save</button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-results">
                  <p>No jobs found matching your search criteria.</p>
                  <button onClick={() => setSearchTerm("")}>
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Application Form Section */}
        {activeSection === "apply" && selectedJob && (
          <section className="application-section">
            <div className="application-header">
              <h2>
                Apply for{" "}
                <span className="job-title">{selectedJob.position}</span>
              </h2>
              <p className="company-name">
                at <strong>{selectedJob.company}</strong>
              </p>
              <div className="application-progress">
                <div className="progress-step active">1. Your Information</div>
                <div className="progress-step">2. Review</div>
                <div className="progress-step">3. Submit</div>
              </div>
            </div>

            {authMessage && (
              <div
                className={`auth-message ${
                  authMessage.includes("success") ? "success" : "error"
                }`}
              >
                {authMessage}
              </div>
            )}

            <form
              className="application-form"
              onSubmit={handleApplicationSubmit}
            >
              <div className="form-section">
                <h3>Personal Information</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={applicationData.firstName}
                      onChange={handleApplicationChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Name *</label>
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
                    <label>Email Address *</label>
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
              </div>

              <div className="form-section">
                <h3>Application Materials</h3>
                <div className="form-group">
                  <label>Resume (PDF, DOCX) *</label>
                  <div className="file-upload">
                    <label className="upload-button">
                      Choose File
                      <input
                        type="file"
                        name="resume"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        required
                      />
                    </label>
                    <span className="file-name">
                      {applicationData.resume
                        ? applicationData.resume.name
                        : "No file chosen"}
                    </span>
                  </div>
                </div>

                <div className="form-group">
                  <label>Cover Letter (Optional)</label>
                  <textarea
                    name="coverLetter"
                    value={applicationData.coverLetter}
                    onChange={handleApplicationChange}
                    placeholder="Tell the employer why you're a good fit for this position..."
                    rows="5"
                  ></textarea>
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setActiveSection("jobs")}
                >
                  Cancel
                </button>
                <button type="submit" className="submit-button">
                  Submit Application
                </button>
              </div>
            </form>
          </section>
        )}

        {/* My Applications Section */}
        {activeSection === "myApplications" && (
          <section className="applications-section">
            <h2>My Applications</h2>
            <div className="application-filters">
              <button className="filter-btn active">All</button>
              <button className="filter-btn">Submitted</button>
              <button className="filter-btn">In Review</button>
              <button className="filter-btn">Interview</button>
              <button className="filter-btn">Rejected</button>
            </div>
            {applications.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📄</div>
                <h3>No Applications Yet</h3>
                <p>
                  You haven't submitted any job applications yet. Browse our job
                  listings to find your next opportunity.
                </p>
                <button
                  className="cta-button"
                  onClick={() => handleNavClick("jobs")}
                >
                  Browse Jobs
                </button>
              </div>
            ) : (
              <div className="applications-list">
                {applications.map((app) => (
                  <div key={app.id} className="application-card">
                    <div className="application-header">
                      <h3>{app.jobTitle}</h3>
                      <span
                        className={`status-badge ${app.status
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        {app.status}
                      </span>
                    </div>
                    <p className="company">{app.company}</p>
                    <div className="application-details">
                      <div className="detail-item">
                        <span className="detail-label">Applied on:</span>
                        <span className="detail-value">{app.date}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Resume:</span>
                        <span className="detail-value">
                          {app.resume?.name || "resume.pdf"}
                        </span>
                      </div>
                    </div>
                    <div className="application-actions">
                      <button className="view-button">View Details</button>
                      <button className="withdraw-button">Withdraw</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>JobConnect</h3>
            <p>
              Connecting talented professionals with their dream jobs since
              2023.
            </p>
            <div className="social-media">
              <a href="#" aria-label="Facebook">
                <i className="social-icon">📘</i>
              </a>
              <a href="#" aria-label="Twitter">
                <i className="social-icon">🐦</i>
              </a>
              <a href="#" aria-label="LinkedIn">
                <i className="social-icon">🔗</i>
              </a>
              <a href="#" aria-label="Instagram">
                <i className="social-icon">📷</i>
              </a>
            </div>
          </div>
          <div className="footer-section">
            <h4>For Candidates</h4>
            <ul>
              <li>
                <a href="#">Browse Jobs</a>
              </li>
              <li>
                <a href="#">Candidate Dashboard</a>
              </li>
              <li>
                <a href="#">Job Alerts</a>
              </li>
              <li>
                <a href="#">Career Advice</a>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>For Employers</h4>
            <ul>
              <li>
                <a href="#">Post a Job</a>
              </li>
              <li>
                <a href="#">Browse Candidates</a>
              </li>
              <li>
                <a href="#">Pricing Plans</a>
              </li>
              <li>
                <a href="#">Recruitment Solutions</a>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Company</h4>
            <ul>
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
          <p className="copyright">© 2023 JobConnect. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
