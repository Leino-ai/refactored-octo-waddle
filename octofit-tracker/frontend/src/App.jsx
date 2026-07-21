import { NavLink, Route, Routes } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  const apiBaseHint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api`
    : 'http://localhost:8000/api';

  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4 p-lg-5">
              <p className="text-uppercase fw-semibold text-primary mb-3">OctoFit Tracker</p>
              <h1 className="display-5 fw-bold mb-3">Modern multi-tier fitness tracking</h1>
              <p className="lead text-muted mb-4">
                A React and Express-powered application for activity logging, teams, leaderboards, and workout planning.
              </p>

              <div className="alert alert-info mb-4" role="status">
                API requests use <strong>{apiBaseHint}</strong>. Define <strong>VITE_CODESPACE_NAME</strong> in <strong>.env.local</strong> for Codespaces support.
              </div>

              <nav className="nav nav-pills flex-wrap gap-2 mb-4">
                <NavLink className="nav-link" to="/users">Users</NavLink>
                <NavLink className="nav-link" to="/teams">Teams</NavLink>
                <NavLink className="nav-link" to="/activities">Activities</NavLink>
                <NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink>
                <NavLink className="nav-link" to="/workouts">Workouts</NavLink>
              </nav>

              <Routes>
                <Route path="/" element={<Users />} />
                <Route path="/users" element={<Users />} />
                <Route path="/teams" element={<Teams />} />
                <Route path="/activities" element={<Activities />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/workouts" element={<Workouts />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
