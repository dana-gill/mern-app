import { useEffect, useState } from 'react'
import './App.css'
import type { User, HandleSubmitEvent } from './types'

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };


  const handleSubmit = async (e: HandleSubmitEvent): Promise<void> => {
    e.preventDefault();
    try {
      setLoading(true);
      await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });      
      setFormData({ name: '', email: '' });
      fetchUsers();
    } catch (error) {
      console.error('Error creating user:', error);
    } finally {
      setLoading(false);
    }
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
     <div className="App">
      <header className="App-header">
        <h1>MERN Stack App</h1>
        
        <div className="form-container">
          <h2>Add New User</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Adding...' : 'Add User'}
            </button>
          </form>
        </div>

        <div className="users-container">
          <h2>Users List</h2>
          {loading && <p>Loading...</p>}
          {users.length === 0 && !loading ? (
            <p>No users found</p>
          ) : (
            <ul>
              {users.map((user) => (
                <li key={user._id}>
                  <strong>{user.name}</strong> - {user.email}
                  <small> (Created: {new Date(user.createdAt).toLocaleDateString()})</small>
                </li>
              ))}
            </ul>
          )}
        </div>
      </header>
    </div>
    </>
  )
}

export default App
