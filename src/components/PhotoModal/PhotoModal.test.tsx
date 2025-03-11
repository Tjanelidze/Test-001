import { render, screen } from '@testing-library/react';
import { PhotoModal } from './PhotoModal';

const mockUser = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  phone: '123-456-7890',
  username: 'johndoe',
  website: 'example.com',
  address: {
    street: 'Main St',
    suite: 'Apt 1',
    city: 'Anytown',
    zipcode: '12345',
    geo: { lat: '0', lng: '0' },
  },
  company: {
    name: 'Example Inc',
    catchPhrase: 'Making examples',
    bs: 'example bs',
  },
};

describe('PhotoModal', () => {
  const setOpenMock = jest.fn();

  it('should not render when closed', () => {
    render(
      <PhotoModal selectedUser={mockUser} open={false} setOpen={setOpenMock} />
    );

    expect(
      screen.queryByText(`${mockUser.name}'s Photos`)
    ).not.toBeInTheDocument();
  });

  it('should render user photo when open', () => {
    render(
      <PhotoModal selectedUser={mockUser} open={true} setOpen={setOpenMock} />
    );

    expect(screen.getByText(`${mockUser.name}'s Photos`)).toBeInTheDocument();

    const image = screen.getByAltText(`${mockUser.name} avatar`);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      'src',
      `https://robohash.org/${mockUser.id}?size=200x200`
    );
  });

  it('should handle null user', () => {
    render(
      <PhotoModal selectedUser={null} open={true} setOpen={setOpenMock} />
    );

    expect(screen.getByText(`'s Photos`)).toBeInTheDocument();

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});
