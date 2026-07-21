import { useEffect, useState } from 'react';
import { buildApiUrl, normalizeApiResponse } from './api';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    const loadLeaderboard = async () => {
      try {
        const response = await fetch(buildApiUrl('leaderboard'));
        if (!response.ok) {
          throw new Error(`Unable to load leaderboard (${response.status})`);
        }

        const payload = await response.json();
        if (!ignore) {
          setEntries(normalizeApiResponse(payload));
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message || 'Failed to load leaderboard.');
        }
      }
    };

    loadLeaderboard();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <section>
      <h2 className="h4 mb-3">Leaderboard</h2>
      {error ? (
        <div className="alert alert-danger">{error}</div>
      ) : entries.length === 0 ? (
        <div className="alert alert-secondary">No leaderboard entries found.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>User</th>
                <th>Score</th>
                <th>Streak</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry._id || entry.id || entry.userId}>
                  <td>{entry.userName || entry.userId}</td>
                  <td>{entry.score}</td>
                  <td>{entry.streak}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default Leaderboard;
