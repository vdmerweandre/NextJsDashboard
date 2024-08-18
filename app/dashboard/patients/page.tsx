import AddPatientForm from '../../ui/patients/addPatientForm';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

export default function Page({ userId }: { userId: string }) {
  return <AddPatientForm userId={userId} name="" age={0} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    };
  }

  return {
    props: {
      userId: session.user!.id,
    },
  };
};