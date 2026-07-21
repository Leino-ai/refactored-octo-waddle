import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeApiResponse } from './api';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    const loadWorkouts = async () => {
      try {
        const apiUrl = '/api/workouts/';
        const response = await fetch(`${getApiBaseUrl()}${apiUrl}`);
        if (!response.ok) {
          throw new Error(`Unable to load workouts (${response.status})`);
        }

        const payload = await response.json();
        if (!ignore) {
          setWorkouts(normalizeApiResponse(payload));
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message || 'Failed to load workouts.');
        }
      }
    };

    loadWorkouts();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <section>
      <h2 className="h4 mb-3">Workouts</h2>
      {error ? (
        <div className="alert alert-danger">{error}</div>
      ) : workouts.length === 0 ? (
        <div className="alert alert-secondary">No workouts found.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>Title</th>
                <th>Difficulty</th>
                <th>Duration</th>
                <th>Focus</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout) => (
                <tr key={workout._id || workout.id || workout.title}>
                  <td>{workout.title}</td>
                  <td>{workout.difficulty}</td>
                  <td>{workout.durationMinutes} min</td>
                  <td>{workout.focus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default Workouts;
