import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import Search from '@/app/ui/search';
import { UpdatePatient, DeletePatient } from '@/app/ui/patients/buttons';
import { fetchFilteredPatients } from '@/app/lib/data';

export default async function PatientsTable({
    query,
    currentPage,
  }: {
    query: string;
    currentPage: number;
  }) {
    
  const patients = await fetchFilteredPatients(query, currentPage);

  return (
    <div className="w-full">
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
              <div className="md:hidden">
                {patients?.map((patient) => (
                  <div
                    key={patient.id}
                    className="mb-2 w-full rounded-md bg-white p-4"
                  >
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <div className="mb-2 flex items-center">
                          <div className="flex items-center gap-3">
                            <Image
                              src={patient.image_url}
                              className="rounded-full"
                              alt={`${patient.firstname} ${patient.lastname}'s profile picture`}
                              width={28}
                              height={28}
                            />
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">
                          {patient.firstname}
                        </p>
                        <p className="text-sm text-gray-500">
                          {patient.lastname}
                        </p>
                        <p className="text-sm text-gray-500">
                          {patient.email}
                        </p>
                        <p className="text-sm text-gray-500">
                          {patient.age}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                        <UpdatePatient id={patient.id} />
                        <DeletePatient id={patient.id} />
                    </div>
                  </div>
                ))}
              </div>
              <table className="hidden min-w-full rounded-md text-gray-900 md:table">
                <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-medium">
                      Patient
                    </th>
                    <th scope="col" className="px-4 py-3 font-medium">
                      First Name
                    </th>
                    <th scope="col" className="px-4 py-3 font-medium">
                      Last Name
                    </th>
                    <th scope="col" className="px-3 py-3 font-medium">
                      Email
                    </th>
                    <th scope="col" className="px-3 py-3 font-medium">
                      Age
                    </th>
                    <th scope="col" className="relative py-3 pl-6 pr-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-gray-900">
                  {patients.map((patient) => (
                    <tr key={patient.id} className="group">
                      <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                        <div className="flex items-center gap-3">
                          <Image
                            src={patient.image_url}
                            className="rounded-full"
                            alt={`${patient.firstname} ${patient.lastname}'s profile picture`}
                            width={28}
                            height={28}
                          />
                        </div>
                      </td>
                      <td className="whitespace-nowrap bg-white px-3 py-3 text-sm">
                        {patient.firstname}
                      </td>
                      <td className="whitespace-nowrap bg-white px-3 py-3 text-sm">
                        {patient.lastname}
                      </td>
                      <td className="whitespace-nowrap bg-white px-3 py-3 text-sm">
                        {patient.email}
                      </td>
                      <td className="whitespace-nowrap bg-white px-3 py-3 text-sm">
                        {patient.age}
                      </td>
                      <td className="whitespace-nowrap py-3 pl-6 pr-3">
                        <div className="flex justify-end gap-3">
                          <UpdatePatient id={patient.id} />
                          <DeletePatient id={patient.id} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
