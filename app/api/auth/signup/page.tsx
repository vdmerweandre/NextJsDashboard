import { GetServerSideProps } from 'next';
import SignUpForm from '../../../ui/signup/signUpForm';
import { User} from '../../../lib/models/user';

export default function Page(user: User) {
    return <SignUpForm user={user} />;
};

export const getServerSideProps: GetServerSideProps = async () => {
    return {
        props: {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            age: '',
            type: 'patient'
        },
    };
};