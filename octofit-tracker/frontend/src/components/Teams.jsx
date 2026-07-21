import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeApiResponse } from './api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    const loadTeams = async () => {
      try {
        const apiUrl = '/api/teams/';
        const response = await fetch(`${getApiBaseUrl()}${apiUrl}`);
        if (!response.ok) {
          throw new Error(`Unable to load teams (${response.status})`);
        }

        const payload = await response.json();
        if (!ignore) {
          setTeams(normalizeApiResponse(payload));
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message || 'Failed to load teams.');
        }
      }
    };

    loadTeams();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <section>
      <h2 className="h4 mb-3">Teams</h2>
      {error ? (
        <div className="alert alert-danger">{error}</div>
      ) : teams.length === 0 ? (
        <div className="alert alert-secondary">No teams found.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Members</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr key={team._id || team.id || team.name}>
                  <td>{team.name}</td>
                  <td>{team.category}</td>
                  <td>{team.members?.length ?? 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default Teams;
