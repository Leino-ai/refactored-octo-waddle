import { useEffect, useState } from 'react';
import { buildApiUrl, normalizeApiResponse } from './api';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    const loadUsers = async () => {
      try {
        const response = await fetch(buildApiUrl('users'));
        if (!response.ok) {
          throw new Error(`Unable to load users (${response.status})`);
        }

        const payload = await response.json();
        if (!ignore) {
          setUsers(normalizeApiResponse(payload));
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message || 'Failed to load users.');
        }
      }
    };

    loadUsers();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <section>
      <h2 className="h4 mb-3">Users</h2>
      {error ? (
        <div className="alert alert-danger">{error}</div>
      ) : users.length === 0 ? (
        <div className="alert alert-secondary">No users found.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Fitness goal</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id || user.id || `${user.name}-${user.email}`}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.fitnessGoal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default Users;
