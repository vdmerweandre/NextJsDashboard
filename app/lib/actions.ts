'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
 
const FormSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  age: z.coerce.number(),
  image_url: z.string(),
});

// Use Zod to update the expected types
const UpdatePatient = FormSchema.omit({ id: true });

export async function updatePatient(id: string, formData: FormData) {
    const { firstName, lastName, email, age, image_url } = UpdatePatient.parse({
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      age: formData.get('age'),
      image_url: formData.get('image_url')
    });
   
    await sql`
      UPDATE patients
      SET id = ${id}, firstName = ${firstName}, lastName = ${lastName}, email = ${email}, age = ${age}, image_url = ${image_url}
      WHERE id = ${id}
    `;
   
    revalidatePath('/dashboard/patients');
    redirect('/dashboard/patients');
  }

export async function deletePatient(id: string) {
    await sql`DELETE FROM patients WHERE id = ${id}`;
    revalidatePath('/dashboard/patients');
  }

  // Use Zod to update the expected types
const CreatePatient = FormSchema.omit({ id: true });

export async function createPatient(formData: FormData) {
    const { firstName, lastName, email, age, image_url } = CreatePatient.parse({
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      age: formData.get('age'),
      image_url: formData.get('image_url')
    });

    await sql`
        INSERT INTO patients (firstName, lastName, email, age, image_url)
        VALUES (${firstName}, ${lastName}, ${email}, ${age}, ${image_url})
    `;
   
    revalidatePath('/dashboard/patients');
    redirect('/dashboard/patients');
  }