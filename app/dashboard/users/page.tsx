import { GetServerSideProps } from 'next';
import { User } from '../../lib/models/user';
import UserList from '../../ui/users/list';

type UsersPageProps = {
  users: User[];
};

export default function Users({ users }: UsersPageProps) {
  return <UserList users={users} />;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`);
  const users = await res.json();

  return {
    props: {
      users,
    },
  };
};