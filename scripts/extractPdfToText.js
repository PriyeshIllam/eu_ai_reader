import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import PDFParser from 'pdf2json'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function extractPdfSimple() {
  return new Promise((resolve, reject) => {
    const pdfPath = path.join(__dirname, '../data/eu_ai_act.pdf')
    
    if (!fs.existsSync(pdfPath)) {
      console.error('❌ Error: PDF file not found at:', pdfPath)
      console.log('\nPlease place your EU AI Act PDF at: data/eu_ai_act.pdf')
      return reject(new Error('PDF not found'))
    }
    
    console.log('📄 Starting PDF extraction...\n')
    console.log('📖 Reading PDF file...')
    
    const pdfParser = new PDFParser()
    
    pdfParser.on('pdfParser_dataError', errData => {
      console.error('❌ Error:', errData.parserError)
      reject(errData.parserError)
    })
    
    pdfParser.on('pdfParser_dataReady', pdfData => {
      console.log('📊 PDF loaded:', pdfData.Pages.length, 'pages\n')
      
      let fullText = ''
      
      // Extract text from each page with error handling
      pdfData.Pages.forEach((page, pageIndex) => {
        console.log(`📄 Processing page ${pageIndex + 1}/${pdfData.Pages.length}...`)
        
        page.Texts.forEach(textItem => {
          textItem.R.forEach(textRun => {
            try {
              // Try to decode the URI component
              const decoded = decodeURIComponent(textRun.T)
              fullText += decoded + ' '
            } catch (error) {
              // If decoding fails, use the raw text
              console.log(`⚠️  Warning: Could not decode text on page ${pageIndex + 1}, using raw text`)
              fullText += textRun.T + ' '
            }
          })
        })
        fullText += '\n\n'
      })
      
      console.log('\n✨ Cleaning up text...')
      
      // Clean up the text
      let cleanedText = fullText
        // Normalize whitespace
        .replace(/\s+/g, ' ')
        // Remove page numbers
        .replace(/Page \d+ of \d+/gi, '')
        // Remove common PDF artifacts
        .replace(/%[0-9A-F]{2}/g, '')
        // Normalize paragraph breaks
        .replace(/\n\s*\n\s*\n+/g, '\n\n')
        .trim()
      
      const outputPath = path.join(__dirname, '../data/eu-ai-act.txt')
      fs.writeFileSync(outputPath, cleanedText, 'utf-8')
      
      console.log('\n✅ Success! Text saved to:', outputPath)
      console.log('📝 Total characters:', cleanedText.length)
      console.log('📊 Total pages extracted:', pdfData.Pages.length)
      console.log('\n🎉 Ready for ingestion! Run: npm run ingest\n')
      
      resolve()
    })
    
    pdfParser.loadPDF(pdfPath)
  })
}

extractPdfSimple().catch(err => {
  console.error('Failed:', err)
  process.exit(1)
})