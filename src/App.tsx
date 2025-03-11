import { Box, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useEffect, useState } from 'react';
import { UserType } from './types/user.type';
import { UsersList } from './components/UsersList/UsersList';

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

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{selectedUser?.name}'s Photos</DialogTitle>
        <DialogContent>
          {selectedUser && (
            <img
              src={`https://robohash.org/${selectedUser.id}?size=200x200`}
              alt={`${selectedUser.name} avatar`}
            />
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default App;
