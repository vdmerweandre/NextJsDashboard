import { User } from '../../lib/models/user';

type UserListProps = {
    users: User[];
};

export default function UserList({ users }: UserListProps) {
    return (
        <ul>
        {users.map((user) => (
            <li key={user.id}>{user.email}</li>
        ))}
        </ul>
    );
};
  