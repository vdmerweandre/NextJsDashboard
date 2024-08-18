type SignInFormProps = {
    email: string;
    password: string;
  };
  
  export default function SignInForm({ email, password }: SignInFormProps) {
    return (
      <form method="POST" action="/api/auth/callback/credentials">
        <input
          type="email"
          name="email"
          defaultValue={email}
          required
        />
        <input
          type="password"
          name="password"
          defaultValue={password}
          required
        />
        <button type="submit">Sign In</button>
      </form>
    );
  };
  
  