import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { UserType } from '../../types/user.type';

interface PhotoModalProps {
  selectedUser: UserType | null;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const PhotoModal = ({
  selectedUser,
  open,
  setOpen,
}: PhotoModalProps) => {
  return (
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
  );
};
