/**
 * Script to embed digitaltwin.json into Upstash Vector database
 * Run this script to populate your vector database with profile data
 */

import { Index } from '@upstash/vector';
import * as fs from 'fs';
import * as path from 'path';

// Load environment variables
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' }); // Fallback to .env

interface ContentChunk {
  id: string;
  title: string;
  content: string;
  type: string;
  category: string;
}

async function embedProfile() {
  console.log('🚀 Starting profile embedding process...\n');

  // Check environment variables
  if (!process.env.UPSTASH_VECTOR_REST_URL || !process.env.UPSTASH_VECTOR_REST_TOKEN) {
    console.error('❌ Missing Upstash Vector credentials in .env.local');
    console.error('Please set UPSTASH_VECTOR_REST_URL and UPSTASH_VECTOR_REST_TOKEN');
    process.exit(1);
  }

  // Initialize Upstash Vector
  const index = new Index({
    url: process.env.UPSTASH_VECTOR_REST_URL,
    token: process.env.UPSTASH_VECTOR_REST_TOKEN,
  });

  console.log('✅ Connected to Upstash Vector\n');

  // Load digitaltwin.json
  const profilePath = path.join(process.cwd(), 'digitaltwin.json');
  const profileData = JSON.parse(fs.readFileSync(profilePath, 'utf-8'));

  console.log('📄 Loaded digitaltwin.json\n');

  // Create content chunks from profile data
  const chunks: ContentChunk[] = [];

  // Personal summary
  if (profileData.personal) {
    chunks.push({
      id: 'personal_summary',
      title: 'Professional Summary',
      content: `${profileData.personal.name} is a ${profileData.personal.title} based in ${profileData.personal.location}. ${profileData.personal.summary}`,
      type: 'summary',
      category: 'overview',
    });

    if (profileData.personal.elevator_pitch) {
      chunks.push({
        id: 'elevator_pitch',
        title: 'Elevator Pitch',
        content: profileData.personal.elevator_pitch,
        type: 'summary',
        category: 'overview',
      });
    }
  }

  // Experience
  if (profileData.experience && Array.isArray(profileData.experience)) {
    profileData.experience.forEach((exp: any, index: number) => {
      if (exp.company && exp.title) {
        const achievements = exp.achievements_star?.map((a: any) => a.result).join('. ') || '';
        const skills = exp.technical_skills_used?.join(', ') || '';
        
        chunks.push({
          id: `experience_${index}`,
          title: `${exp.title} at ${exp.company}`,
          content: `Worked as ${exp.title} at ${exp.company} (${exp.duration}). ${exp.company_context || ''}. ${achievements} Technical skills: ${skills}`,
          type: 'experience',
          category: 'work_history',
        });
      }
    });
  }

  // Skills
  if (profileData.skills?.technical?.programming_languages) {
    const languages = profileData.skills.technical.programming_languages
      .map((lang: any) => `${lang.language} (${lang.years} years, ${lang.proficiency} level)`)
      .join(', ');
    
    chunks.push({
      id: 'programming_skills',
      title: 'Programming Languages',
      content: `Programming expertise: ${languages}`,
      type: 'skills',
      category: 'technical',
    });
  }

  if (profileData.skills?.technical?.databases) {
    chunks.push({
      id: 'database_skills',
      title: 'Database Skills',
      content: `Database experience: ${profileData.skills.technical.databases.join(', ')}`,
      type: 'skills',
      category: 'technical',
    });
  }

  if (profileData.skills?.soft_skills) {
    chunks.push({
      id: 'soft_skills',
      title: 'Soft Skills',
      content: `Soft skills: ${profileData.skills.soft_skills.join(', ')}`,
      type: 'skills',
      category: 'personal',
    });
  }

  // Education
  if (profileData.education) {
    Object.keys(profileData.education).forEach((key) => {
      const edu = profileData.education[key];
      if (edu.degree && edu.school) {
        chunks.push({
          id: `education_${key}`,
          title: edu.degree,
          content: `${edu.degree} from ${edu.school} (${edu.dates}). ${edu.highlights?.join(', ') || ''}`,
          type: 'education',
          category: 'background',
        });
      }
    });
  }

  // Career goals
  if (profileData.career_goals) {
    chunks.push({
      id: 'career_goals',
      title: 'Career Goals',
      content: `Short-term: ${profileData.career_goals.short_term}. Long-term: ${profileData.career_goals.long_term}. Learning focus: ${profileData.career_goals.learning_focus?.join(', ') || 'N/A'}. Interested in: ${profileData.career_goals.industries_interested?.join(', ') || 'N/A'}`,
      type: 'goals',
      category: 'career',
    });
  }

  // Location preferences
  if (profileData.salary_location) {
    chunks.push({
      id: 'location_preferences',
      title: 'Location and Work Preferences',
      content: `Location preferences: ${profileData.salary_location.location_preferences?.join(', ')}. Remote experience: ${profileData.salary_location.remote_experience}. Willing to relocate: ${profileData.salary_location.relocation_willing}. Travel availability: ${profileData.salary_location.travel_availability}`,
      type: 'preferences',
      category: 'logistics',
    });
  }

  console.log(`📊 Created ${chunks.length} content chunks\n`);

  // Prepare vectors for upload
  const vectors = chunks.map((chunk) => ({
    id: chunk.id,
    data: `${chunk.title}: ${chunk.content}`, // Upstash will auto-embed this text
    metadata: {
      title: chunk.title,
      content: chunk.content,
      type: chunk.type,
      category: chunk.category,
    },
  }));

  // Upload to Upstash Vector
  console.log('⬆️  Uploading vectors to Upstash...\n');

  try {
    await index.upsert(vectors);
    console.log('✅ Successfully uploaded all vectors!\n');

    // Verify upload
    const info = await index.info();
    console.log(`📈 Database info:`);
    console.log(`   - Total vectors: ${info.vectorCount}`);
    console.log(`   - Dimension: ${info.dimension}`);
    console.log(`   - Similarity function: ${info.similarityFunction}\n`);

    console.log('🎉 Profile embedding complete!');
    console.log('Your AI assistant is now ready to answer questions.\n');
  } catch (error) {
    console.error('❌ Error uploading vectors:', error);
    process.exit(1);
  }
}

// Run the script
embedProfile().catch(console.error);
