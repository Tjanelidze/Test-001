import { Box, List, ListItem, ListItemText } from '@mui/material';
import { useEffect, useState } from 'react';
import { UserType } from './types/user.type';

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
      <List>
        {users.map((user) => (
          <ListItem key={user.id}>
            <ListItemText
              primary={user.name}
              secondary={`Address: ${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default App;
