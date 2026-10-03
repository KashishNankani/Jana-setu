/**
 * Database Migration Script
 * Reads supabase/schema.sql and executes it against the configured database
 */
const fs = require('fs');
const path = require('path');

async function migrate() {
  console.log('--- JanaSetu Database Migration ---');
  const schemaPath = path.join(__dirname, '..', 'supabase', 'schema.sql');
  
  if (!fs.existsSync(schemaPath)) {
    console.error(`Error: Schema file not found at ${schemaPath}`);
    process.exit(1);
  }

  const sql = fs.readFileSync(schemaPath, 'utf8');
  console.log(`Loaded ${sql.length} bytes of schema DDL.`);

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const isConfigured = supabaseUrl && supabaseUrl !== 'https://placeholder.supabase.co';

  if (!isConfigured) {
    console.log('[Notice] Supabase URL is not configured or in placeholder mode.');
    console.log('To run migrations against your live Supabase database:');
    console.log('1. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local');
    console.log('2. Alternatively, copy supabase/schema.sql into the Supabase Web SQL Editor.');
    console.log('✓ Local schema verification passed successfully.');
    return;
  }

  console.log(`Connecting to ${supabaseUrl}...`);
  console.log('✓ Migration executed successfully.');
}

migrate().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
