import React, { useState, useEffect } from 'react';

function SearchUsers() {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [debounceTimer, setDebounceTimer] = useState(null); 

  const fetchUsers = async (searchQuery) => {
    if (!searchQuery) {
      setUsers([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users?name_like=${searchQuery}`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    const newTimer = setTimeout(() => {
      fetchUsers(query);
    }, 500);
    setDebounceTimer(newTimer);

    return () => {
      clearTimeout(newTimer);
    };
  }, [query]);

  return (
    <div>
      <h1>Buscar Usuarios</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar por nombre"
      />
      {loading && <p>Cargando...</p>}
      <ul>
        {users.length === 0 && !loading && <li>Usuarios no encontrados.</li>}
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default SearchUsers;
