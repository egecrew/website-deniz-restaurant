#!/usr/bin/env node
/**
 * Test Stitch SDK tool invocation directly
 */

import { stitch } from '@google/stitch-sdk';

async function main() {
  console.log('🔧 Testing Stitch SDK Direct Tool Calls');
  console.log('='.repeat(50));
  
  if (!process.env.STITCH_API_KEY) {
    console.error('❌ STITCH_API_KEY not set');
    process.exit(1);
  }
  
  // List tools with their schemas
  console.log('\n📋 Tool Schemas:');
  const tools = await stitch.listTools();
  
  const generateTool = tools.tools.find(t => t.name === 'generate_screen_from_text');
  if (generateTool) {
    console.log('\n📝 generate_screen_from_text:');
    console.log(JSON.stringify(generateTool, null, 2));
  }
  
  // Try a simple project list
  console.log('\n📦 Projects:');
  const projects = await stitch.projects();
  console.log(`   Found: ${projects.length}`);
  
  // Use the most recent project
  if (projects.length > 0) {
    const project = projects[0];
    console.log(`   Using: ${project.id}`);
    
    // Try calling the raw tool with minimal args
    console.log('\n🎨 Attempting raw generate_screen_from_text...');
    try {
      const result = await stitch.callTool('generate_screen_from_text', {
        projectId: project.id,
        prompt: 'Create a simple landing page with a hero section',
        deviceType: 'DESKTOP'
      });
      console.log('   ✅ Success!');
      console.log(JSON.stringify(result, null, 2));
    } catch (error) {
      console.log(`   ❌ DESKTOP failed: ${error.message}`);
      
      // Try with lowercase deviceType
      try {
        const result = await stitch.callTool('generate_screen_from_text', {
          projectId: project.id,
          prompt: 'Create a simple landing page with a hero section',
          deviceType: 'desktop'
        });
        console.log('   ✅ lowercase worked!');
        console.log(JSON.stringify(result, null, 2));
      } catch (err2) {
        console.log(`   ❌ lowercase failed: ${err2.message}`);
      }
      
      // Try without deviceType
      try {
        const result = await stitch.callTool('generate_screen_from_text', {
          projectId: project.id,
          prompt: 'Create a simple landing page with a hero section'
        });
        console.log('   ✅ no deviceType worked!');
        console.log(JSON.stringify(result, null, 2));
      } catch (err3) {
        console.log(`   ❌ no deviceType failed: ${err3.message}`);
      }
    }
  }
}

main().catch(console.error);
