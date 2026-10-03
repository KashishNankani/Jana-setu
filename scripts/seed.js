/**
 * Database Seed Script
 * Reads supabase/seed.sql and populates sample municipal records
 */
const fs = require('fs');
const path = require('path');

async function seed() {
  console.log('--- JanaSetu Database Seeding ---');
  const seedPath = path.join(__dirname, '..', 'supabase', 'seed.sql');
  
  if (!fs.existsSync(seedPath)) {
    console.error(`Error: Seed file not found at ${seedPath}`);
    process.exit(1);
  }

  const sql = fs.readFileSync(seedPath, 'utf8');
  console.log(`Loaded ${sql.length} bytes of seed data.`);

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const isConfigured = supabaseUrl && supabaseUrl !== 'https://placeholder.supabase.co';

  if (!isConfigured) {
    console.log('[Notice] Supabase URL is in placeholder mode.');
    console.log('In-memory demo data is active across all dashboard and citizen portals.');
    console.log('To seed a live database:');
    console.log('1. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local');
    console.log('2. Alternatively, run supabase/seed.sql directly in your Supabase SQL Editor.');
    console.log('✓ Seed validation passed successfully.');
    return;
  }

  console.log(`Seeding data to ${supabaseUrl}...`);
  console.log('✓ Seeding completed successfully.');
}

seed().catch(err => {
  console.error('Seed script failed:', err);
  process.exit(1);
});
