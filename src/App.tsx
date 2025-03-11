import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { UserType } from './types/user.type';
import { UsersList } from './components/UsersList/UsersList';
import { PhotoModal } from './components/PhotoModal/PhotoModal';

function App() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [open, setOpen] = useState(false);

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

  const handleUserClick = async (user: UserType) => {
    setSelectedUser(user);
    setOpen(true);
  };

  return (
    <Box p={3}>
      <UsersList handleUserClick={handleUserClick} users={users} />

      <PhotoModal open={open} setOpen={setOpen} selectedUser={selectedUser} />
    </Box>
  );
}

export default App;
