import { createClient } from '@supabase/supabase-js'
import OpenAI from 'openai'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const openai = new OpenAI({
  apiKey: process.env.VITE_OPENAI_API_KEY
})

async function generateEmbedding(text) {
  const response = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: text,
  })
  return response.data[0].embedding
}

async function ingestInChunks() {
  console.log('🚀 Starting EU AI Act ingestion (streaming mode)...\n')
  
  const documentPath = path.join(__dirname, '../data/eu-ai-act.txt')
  const documentText = fs.readFileSync(documentPath, 'utf-8')
  
  console.log('📄 Document size:', documentText.length, 'characters')
  
  const CHUNK_SIZE = 1000
  const OVERLAP = 200
  
  let position = 0
  let chunkCount = 0
  
  while (position < documentText.length) {
    // Extract one chunk
    const end = Math.min(position + CHUNK_SIZE, documentText.length)
    const chunk = documentText.substring(position, end)
    
    chunkCount++
    console.log(`\n📊 Chunk ${chunkCount} (pos: ${position})`)
    
    try {
      // Generate embedding
      console.log('  🤖 Generating embedding...')
      const embedding = await generateEmbedding(chunk)
      
      // Extract metadata
      const articleMatch = chunk.match(/Article\s+(\d+[a-z]?)/i)
      const articleNumber = articleMatch ? articleMatch[1] : null
      
      // Insert into database
      console.log('  💾 Inserting into database...')
      const { error } = await supabase
        .from('eu_ai_act_chunks')
        .insert({
          content: chunk,
          embedding,
          article_number: articleNumber,
          chunk_index: chunkCount - 1,
          metadata: {
            document_name: 'EU AI Act',
            position: position
          }
        })
      
      if (error) {
        console.error('  ❌ Database error:', error)
        throw error
      }
      
      console.log('  ✅ Success!')
      
    } catch (error) {
      console.error('  ❌ Error processing chunk:', error.message)
      break
    }
    
    // Move to next chunk
    position += (CHUNK_SIZE - OVERLAP)
    
    // Small delay
    await new Promise(r => setTimeout(r, 200))
  }
  
  console.log(`\n✅ Completed! Processed ${chunkCount} chunks`)
}

ingestInChunks()