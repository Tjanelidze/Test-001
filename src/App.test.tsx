import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import App from './App';
import { UserType } from './types/user.type';

const users: UserType[] = [
  {
    id: 1,
    name: 'John Doe',
    address: {
      street: '123 Main St',
      suite: 'Apt 1',
      city: 'New York',
      zipcode: '10001',
      geo: {
        lat: '',
        lng: '',
      },
    },
    username: '',
    email: '',
    phone: '',
    website: '',
    company: {
      name: '',
      catchPhrase: '',
      bs: '',
    },
  },
  {
    id: 2,
    name: 'Jane Smith',
    address: {
      street: '456 Elm St',
      suite: 'Suite 200',
      city: 'Los Angeles',
      zipcode: '90001',
      geo: {
        lat: '',
        lng: '',
      },
    },
    username: '',
    email: '',
    phone: '',
    website: '',
    company: {
      name: '',
      catchPhrase: '',
      bs: '',
    },
  },
];

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(users),
  })
) as jest.Mock;

jest.mock('./components/PhotoModal/PhotoModal', () => ({
  PhotoModal: ({
    open,
    selectedUser,
  }: {
    open: boolean;
    selectedUser: UserType;
    setOpen: boolean;
  }) => (
    <div data-testid="photo-modal">
      {open && selectedUser
        ? `Modal Open: ${selectedUser.name}`
        : 'Modal Closed'}
    </div>
  ),
}));

describe('App Component', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it('fetches and renders the list of users', async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('opens the PhotoModal when a user is clicked', async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    const viewPhotoButtons = screen.getAllByRole('button', {
      name: /view photo/i,
    });
    fireEvent.click(viewPhotoButtons[0]);

    expect(await screen.findByTestId('photo-modal')).toHaveTextContent(
      'Modal Open: John Doe'
    );
  });
});
