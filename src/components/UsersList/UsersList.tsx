import { List, ListItem, ListItemText } from '@mui/material';
import { UserType } from '../../types/user.type';

export const UsersList = ({ users }: { users: UserType[] }) => {
  return (
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
  );
};
