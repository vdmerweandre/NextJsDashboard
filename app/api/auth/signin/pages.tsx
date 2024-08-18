import { GetServerSideProps } from 'next';
import SignInForm from '../../../ui/signin/signInForm';
import { getCsrfToken } from 'next-auth/react';

export default function Page({ csrfToken }: { csrfToken: string }) {
    return (
        <>
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <SignInForm email="" password="" />
        </>
      );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const csrfToken = await getCsrfToken(context);
    return {
      props: {
        csrfToken,
      },
    };
  };