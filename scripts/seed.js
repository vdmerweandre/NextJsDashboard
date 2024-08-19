const { db, sql } = require('@vercel/postgres');
const { doctors } = require('../app/lib/models/doctor-data.ts');
const { patients } = require('../app/lib/models/patient-data.ts');
const { users } = require('../app/lib/models/user-data.ts');
const bcrypt = require('bcrypt');

async function seedUsers(client) {
    try {
      await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
      // Create the "users" table if it doesn't exist
      const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS users (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          firstName VARCHAR(255) NOT NULL,
          lastName VARCHAR(255) NOT NULL,
          email TEXT NOT NULL UNIQUE,
          password TEXT NOT NULL
        );
      `;
  
      console.log(`Created "users" table`);
  
      // Insert data into the "users" table
      const insertedUsers = await Promise.all(
        users.map(async (user) => {
          const hashedPassword = await bcrypt.hash(user.password, 10);
          return client.sql`
          INSERT INTO users (id, firstName, lastName, email, password)
          VALUES (${user.id}, ${user.firstName}, ${user.lastName}, ${user.email}, ${hashedPassword})
          ON CONFLICT (id) DO NOTHING;
        `;
        }),
      );
  
      console.log(`Seeded ${insertedUsers.length} users`);
  
      return {
        createTable,
        users: insertedUsers,
      };
    } catch (error) {
      console.error('Error seeding users:', error);
      throw error;
    }
  }

  async function seedDoctors(client) {
    try {
      await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  
      // Create the "doctors" table if it doesn't exist
      const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS doctors (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          firstName VARCHAR(255) NOT NULL,
          lastName VARCHAR(255) NOT NULL,
          email TEXT NOT NULL UNIQUE,
          ref VARCHAR(255) NOT NULL
        );
      `;
  
      console.log(`Created "doctors" table`);
  
      // Insert data into the "doctors" table
      const insertedDoctors = await Promise.all(
        doctors.map(
          (doctor) => client.sql`
          INSERT INTO doctors (id, firstName, lastName, email, ref)
          VALUES (${doctor.id}, ${doctor.firstName}, ${doctor.lastName}, ${doctor.email}, ${doctor.ref})
          ON CONFLICT (id) DO NOTHING;
        `,
        ),
      );
  
      console.log(`Seeded ${insertedDoctors.length} doctors`);
  
      return {
        createTable,
        customers: insertedDoctors,
      };
    } catch (error) {
      console.error('Error seeding doctors:', error);
      throw error;
    }
  }

  async function seedPatients(client) {
    try {
      await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  
      // Create the "patients" table if it doesn't exist
      const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS patients (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          firstName VARCHAR(255) NOT NULL,
          lastName VARCHAR(255) NOT NULL,
          email TEXT NOT NULL UNIQUE,
          age INT NOT NULL
        );
      `;
  
      console.log(`Created "patients" table`);
  
      // Insert data into the "patients" table
      const insertedPatients = await Promise.all(
        patients.map(
          (patient) => client.sql`
          INSERT INTO patients (id, firstName, lastName, email, age)
          VALUES (${patient.id}, ${patient.firstName}, ${patient.lastName}, ${patient.email}, ${patient.age})
          ON CONFLICT (id) DO NOTHING;
        `,
        ),
      );
  
      console.log(`Seeded ${insertedPatients.length} patients`);
  
      return {
        createTable,
        customers: insertedPatients,
      };
    } catch (error) {
      console.error('Error seeding patients:', error);
      throw error;
    }
  }

  async function dropTablesBeforeSeed(client) {
    console.log(`dropping table users`);
    await client.sql`DROP TABLE IF EXISTS users;`;

    console.log(`dropping table doctors`);
    await client.sql`DROP TABLE IF EXISTS doctors;`;

    console.log(`dropping table patients`);
    await client.sql`DROP TABLE IF EXISTS patients;`;
  }

  async function main() {
    const client = await db.connect();

    //const { rows } = await client.sql`SELECT * FROM user;`;

    await dropTablesBeforeSeed(client);

    await seedUsers(client);
    await seedDoctors(client);
    await seedPatients(client);
    
    await client.end();
  }
  
  main().catch((err) => {
    console.error(
      'An error occurred while attempting to seed the database:',
      err,
    );
  });
  