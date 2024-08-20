'use client';

import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { createPatient } from '@/app/lib/actions';

export default function CreatePatientForm() {
  return (
    <form action={createPatient}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6 text-gray-500">
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            New Patient
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              {/* First Name */}
              <div className="mb-4">
                <label htmlFor="firstName" className="mb-2 block text-sm font-bold">
                  First Name
                </label>
                <div className="relative mt-2 rounded-md border border-gray-200">
                  <div className="relative">
                    <input
                      type="text"
                      name="firstName"
                      required
                    />
                  </div>
                </div>
              </div>
              {/* Last Name */}
              <div className="mb-4">
                <label htmlFor="lastName" className="mb-2 block text-sm font-bold">
                  Last Name
                </label>
                <div className="relative mt-2 rounded-md border border-gray-200">
                  <div className="relative">
                    <input
                      type="text"
                      name="lastName"
                      required
                    />
                  </div>
                </div>
              </div>
              {/* Email */}
              <div className="mb-4">
                <label htmlFor="email" className="mb-2 block text-sm font-bold">
                  Email
                </label>
                <div className="relative mt-2 rounded-md border border-gray-200">
                  <div className="relative">
                    <input
                      type="text"
                      name="email"
                      required
                    />
                  </div>
                </div>
              </div>
              {/* Age */}
              <div className="mb-4">
                <label htmlFor="age" className="mb-2 block text-sm font-bold">
                  Age
                </label>
                <div className="relative mt-2 rounded-md border border-gray-200">
                  <div className="relative">
                    <input
                      type="number"
                      name="age"
                      required
                      step="1"
                    />
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="mb-4">
                <label htmlFor="age" className="mb-2 block text-sm font-bold">
                  Image url
                </label>
                <div className="relative mt-2 rounded-md border border-gray-200">
                  <div className="relative">
                    <input
                      type="text"
                      name="image_url"
                      required
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </fieldset>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/patients"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Add Patient</Button>
      </div>
    </form>
  );
}
