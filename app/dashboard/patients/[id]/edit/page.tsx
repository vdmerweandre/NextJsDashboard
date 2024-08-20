import EditPatientForm from '@/app/ui/patients/edit-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchPatientById } from '@/app/lib/data';
 
export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const patient = await fetchPatientById(id);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Patients', href: '/dashboard/patients' },
          {
            label: 'Edit Patient',
            href: `/dashboard/patients/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditPatientForm patient={patient} />
    </main>
  );
}