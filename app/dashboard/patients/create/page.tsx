import CreatePatientForm from '@/app/ui/patients/create-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
 
export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Patients', href: '/dashboard/patients' },
          {
            label: 'New Patient',
            href: '/dashboard/patients/create',
            active: true,
          },
        ]}
      />
      <CreatePatientForm />
    </main>
  );
}