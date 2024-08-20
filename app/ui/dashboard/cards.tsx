import {
    BanknotesIcon,
    ClockIcon,
    UserGroupIcon,
    InboxIcon,
  } from '@heroicons/react/24/outline';
  import { lusitana } from '@/app/ui/fonts';
  import { fetchCardData } from '@/app/lib/data';
  
  const iconMap = {
    patients: BanknotesIcon,
    customers: UserGroupIcon,
    doctors: ClockIcon,
    users: InboxIcon,
  };
  
  export default async function CardWrapper() {
    const {
      numberOfPatients,
      numberOfDoctors,
      numberOfUsers,
      totalCustomers,
    } = await fetchCardData();
    return (
      <>
        <Card title="Patients" value={numberOfPatients} type="patients" />
        <Card title="Doctors" value={numberOfDoctors} type="doctors" />
        <Card title="Users" value={numberOfUsers} type="users" />
        <Card
          title="Total Customers"
          value={totalCustomers}
          type="customers"
        /> 
      </>
    );
  }
  
  export function Card({
    title,
    value,
    type,
  }: {
    title: string;
    value: number | string;
    type: 'patients' | 'doctors' | 'users' | 'customers';
  }) {
    const Icon = iconMap[type];
  
    return (
      <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
        <div className="flex p-4">
          {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
          <h3 className="ml-2 text-sm font-medium text-blue-600">{title}</h3>
        </div>
        <p
          className={`${lusitana.className}
            truncate rounded-xl bg-blue-600 px-4 py-8 text-center text-2xl`}
        >
          {value}
        </p>
      </div>
    );
  }
  