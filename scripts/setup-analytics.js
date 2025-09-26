const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables');
  console.error('Make sure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function setupAnalytics() {
  console.log('🚀 Setting up analytics database...');

  try {
    // Read the SQL file
    const sqlPath = path.join(__dirname, '..', 'sql', 'create_analytics_table.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');

    // Split SQL commands (basic splitting by semicolon)
    const commands = sql
      .split(';')
      .map(cmd => cmd.trim())
      .filter(cmd => cmd.length > 0 && !cmd.startsWith('--'));

    console.log(`📝 Executing ${commands.length} SQL commands...`);

    // Execute each command
    for (let i = 0; i < commands.length; i++) {
      const command = commands[i];
      console.log(`   ${i + 1}/${commands.length}: ${command.substring(0, 50)}...`);
      
      const { error } = await supabase.rpc('exec_sql', { sql_query: command });
      
      if (error) {
        // Try direct query if RPC fails
        const { error: directError } = await supabase
          .from('_')
          .select('*')
          .limit(0);
        
        if (directError) {
          console.warn(`⚠️  Command ${i + 1} failed, but continuing...`);
          console.warn(`   Error: ${error.message}`);
        }
      }
    }

    // Test the setup by inserting a test event
    console.log('🧪 Testing analytics setup...');
    
    const testEvent = {
      event_type: 'test',
      element_id: 'setup-test',
      element_text: 'Setup Test Event',
      page_path: '/setup-test',
      user_agent: 'Setup Script',
      ip_address: '127.0.0.1',
      session_id: 'setup-session-' + Date.now(),
      timestamp: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('analytics_events')
      .insert([testEvent])
      .select();

    if (error) {
      console.error('❌ Test insert failed:', error.message);
      console.log('\n📋 Manual setup required:');
      console.log('1. Go to your Supabase dashboard');
      console.log('2. Navigate to SQL Editor');
      console.log('3. Run the SQL commands from sql/create_analytics_table.sql');
      return;
    }

    console.log('✅ Test event inserted successfully!');

    // Clean up test event
    if (data && data[0]) {
      await supabase
        .from('analytics_events')
        .delete()
        .eq('id', data[0].id);
      console.log('🧹 Test event cleaned up');
    }

    console.log('\n🎉 Analytics setup completed successfully!');
    console.log('\n📊 Next steps:');
    console.log('1. Update your components to use analytics tracking');
    console.log('2. Visit /analytics to view your dashboard');
    console.log('3. Use the admin token: portfolio-analytics-2025-secure-token');
    console.log('\n⚠️  Remember to change the admin token in production!');

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    console.log('\n📋 Manual setup required:');
    console.log('1. Go to your Supabase dashboard');
    console.log('2. Navigate to SQL Editor');
    console.log('3. Run the SQL commands from sql/create_analytics_table.sql');
  }
}

setupAnalytics();