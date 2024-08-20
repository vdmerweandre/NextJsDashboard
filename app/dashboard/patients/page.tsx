import AddPatientForm from '../../ui/patients/addPatientForm';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Search from '@/app/ui/search';
import Table from '@/app/ui/patients/table';
import Pagination from '@/app/ui/pagination';
import { lusitana } from '@/app/ui/fonts';
import { CreatePatient } from '@/app/ui/patients/buttons';
import { PatientsTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchPatientsPages } from '@/app/lib/data';

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchPatientsPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Patients</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search patients..." />
        <CreatePatient />
      </div>
      <Suspense key={query + currentPage} fallback={<PatientsTableSkeleton />}>
        {/* @ts-expect-error Server Component */}
        <Table query={query} currentPage={currentPage} />
      </Suspense> 
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const session = await getSession(context);
//   if (!session) {
//     return {
//       redirect: {
//         destination: '/api/auth/signin',
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {
//       userId: session.user!.id,
//     },
//   };
// };