import { User } from '../../lib/models/user';

type SignUpFormProps = {
    user: User;
  };

export default function SignUpForm({ user }: SignUpFormProps) {
    return (
        <form method="POST" action="/api/signup">
          <input
            type="email"
            name="email"
            defaultValue={user.email}
            required
          />
          <input
            type="password"
            name="password"
            defaultValue={user.password}
            required
          />
          <input
            type="firstName"
            name="firstName"
            defaultValue={user.firstName}
            required
          />
          <input
            type="lastName"
            name="LastName"
            defaultValue={user.lastName}
            required
          />
          <input
            type="age"
            name="age"
            defaultValue={user.age}
            required
          />
          <select name="userType" defaultValue={user.type} required>
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
          </select>
          <button type="submit">Sign Up</button>
        </form>
      );
};