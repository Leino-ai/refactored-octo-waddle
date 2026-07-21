import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeApiResponse } from './api';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    const loadActivities = async () => {
      try {
        const apiUrl = '/api/activities/';
        const response = await fetch(`${getApiBaseUrl()}${apiUrl}`);
        if (!response.ok) {
          throw new Error(`Unable to load activities (${response.status})`);
        }

        const payload = await response.json();
        if (!ignore) {
          setActivities(normalizeApiResponse(payload));
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message || 'Failed to load activities.');
        }
      }
    };

    loadActivities();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <section>
      <h2 className="h4 mb-3">Activities</h2>
      {error ? (
        <div className="alert alert-danger">{error}</div>
      ) : activities.length === 0 ? (
        <div className="alert alert-secondary">No activities found.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>Type</th>
                <th>Duration</th>
                <th>Calories</th>
                <th>User ID</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id || activity.id || `${activity.type}-${activity.userId}`}>
                  <td>{activity.type}</td>
                  <td>{activity.durationMinutes} min</td>
                  <td>{activity.calories}</td>
                  <td>{activity.userId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default Activities;
