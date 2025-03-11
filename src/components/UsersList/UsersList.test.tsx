import { render, screen, fireEvent } from '@testing-library/react';
import { UsersList } from './UsersList';
import { UserType } from '../../types/user.type';

describe('UsersList Component', () => {
  const mockHandleUserClick = jest.fn();

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

  beforeEach(() => {
    mockHandleUserClick.mockClear();
  });

  it('renders the list of users with their addresses and buttons', () => {
    render(<UsersList users={users} handleUserClick={mockHandleUserClick} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(
      screen.getByText('Address: 123 Main St, Apt 1, New York, 10001')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Address: 456 Elm St, Suite 200, Los Angeles, 90001')
    ).toBeInTheDocument();

    const buttons = screen.getAllByRole('button', { name: /view photo/i });
    expect(buttons.length).toBe(users.length);
  });

  it('calls handleUserClick with the correct user when the button is clicked', () => {
    render(<UsersList users={users} handleUserClick={mockHandleUserClick} />);

    const buttons = screen.getAllByRole('button', { name: /view photo/i });
    fireEvent.click(buttons[0]);

    expect(mockHandleUserClick).toHaveBeenCalledTimes(1);
    expect(mockHandleUserClick).toHaveBeenCalledWith(users[0]);
  });
});
