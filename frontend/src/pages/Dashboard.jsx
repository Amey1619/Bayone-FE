import { useEffect, useState } from "react";
import { getDashboardData } from "../services/dashboard.api";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import Navbar from "../components/Navbar";
import profilePic from "../assets/profile.png";
import "../dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardData()
      .then((res) => {
        if (res.success) {
          setPosts(res.posts);
        } else {
          setError(res.message);
        }
      })
      .catch(() => setError("Failed to load dashboard"))
      .finally(() => setLoading(false));
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="loader-container">
        <ClipLoader size={50} />
      </div>
    );
  }

  return (
    <div className="dashboard">
      <Navbar
        profilePic={profilePic}
        username="John Doe"
        onLogout={logout}
      />

      {error && (
  <>
    <p className="error">{error}</p>
    <button onClick={fetchData}>Retry</button>
  </>
)}


      <div className="posts-list">
        {posts.map((post) => (
          <div className="posts-card" key={post.id}>
            <h4>{post.title}</h4>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
