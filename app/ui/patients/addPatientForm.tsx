type AddPatientFormProps = {
    userId: string;
    name: string;
    age: number;
  };

export default function AddPatientForm({ userId, name, age }: AddPatientFormProps) {
    return (
        <form method="POST" action="/api/patients">
          <input type="hidden" name="userId" value={userId} />
          <input
            type="text"
            name="name"
            defaultValue={name}
            required
          />
          <input
            type="number"
            name="age"
            defaultValue={age}
            required
          />
          <button type="submit">Add Patient</button>
        </form>
      );
    };