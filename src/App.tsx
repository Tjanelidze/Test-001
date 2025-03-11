import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { UserType } from './types/user.type';
import { UsersList } from './components/UsersList/UsersList';

function App() {
  const [users, setUsers] = useState<UserType[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/users'
        );
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Box p={3}>
      <UsersList users={users} />
    </Box>
  );
}

export default App;
