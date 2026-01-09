import "../navbar.css";

const Navbar = ({username, profilePic, onLogout }) => {
  return (
    <nav className="navbar">
      <h2 className="logo">Dashboard</h2>

      <div className="nav-right">
        <div className="profile">
          <img
            src={profilePic}
            alt="profile"
            className="profile-pic"
          />
        </div>
        <span className="username">{username}</span>
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
