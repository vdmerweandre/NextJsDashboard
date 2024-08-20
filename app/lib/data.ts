import { sql } from '@vercel/postgres';
import { formatCurrency } from './utils';
import { unstable_noStore as noStore } from 'next/cache';
import { PatientTable } from './definitions';

/*
import { Doctor } from './models/doctor';
import { Patient } from './models/patient';
import { User } from './models/user';
*/

export async function fetchCardData() {
    noStore();
    try {
      // You can probably combine these into a single SQL query
      // However, we are intentionally splitting them to demonstrate
      // how to initialize multiple queries in parallel with JS.
      const patientCountPromise = sql`SELECT COUNT(*) FROM patients`;
      const doctorCountPromise = sql`SELECT COUNT(*) FROM doctors`;
      const userCountPromise = sql`SELECT COUNT(*) FROM users`;
  
      const data = await Promise.all([
        patientCountPromise,
        doctorCountPromise,
        userCountPromise,
      ]);

      console.log('row count ' + data[0].rows[0].count);
      const numberOfPatients = Number(data[0].rows[0].count ?? '0');
      const numberOfDoctors = Number(data[1].rows[0].count ?? '0');
      const numberOfUsers = Number(data[2].rows[0].count ?? '0');
      const totalCustomers = numberOfPatients + numberOfDoctors + numberOfUsers;

      console.log('numberOfPatients ' + numberOfPatients);
  
      return {
        numberOfPatients,
        numberOfDoctors,
        numberOfUsers,
        totalCustomers,
      };
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch card data.');
    }
  }

  const ITEMS_PER_PAGE = 6;

  export async function fetchPatientsPages(query: string) {
    noStore();
    try {
      const count = await sql`SELECT COUNT(*)
      FROM patients
      WHERE
        patients.firstName ILIKE ${`%${query}%`} OR
        patients.lastName ILIKE ${`%${query}%`} OR
        patients.email ILIKE ${`%${query}%`}
    `;
  
      const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
      return totalPages;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch total number of patients.');
    }
  }

  export async function fetchFilteredPatients(
    query: string,
    currentPage: number,
  ) {
    noStore();
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  
    try {
      const patients = await sql<PatientTable>`
        SELECT *
        FROM patients
        WHERE
          patients.firstName ILIKE ${`%${query}%`} OR
          patients.lastName ILIKE ${`%${query}%`} OR
          patients.email ILIKE ${`%${query}%`}
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
      `;
  
      return patients.rows;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch patients.');
    }
  }