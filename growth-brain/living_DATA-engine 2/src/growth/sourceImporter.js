// src/growth/sourceImporter.js — Living Data Engine Source Importer (Root #7 / H1)
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { DB } from '../lib/db.js'
import { logger } from '../lib/logger.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DEFAULT_CSV_PATH = path.join(__dirname, '../../data/growth_sources.csv')

export class SourceImporter {
  static normalizeCategory(source, category) {
    const s = (source || '').toLowerCase()
    const c = (category || '').toLowerCase()

    if (c.includes('substack') || s.includes('substack')) return 'Substack'
    if (c.includes('social') || ['facebook', 'linkedin', 'twitter', 'instagram', 'tiktok'].some(x => s.includes(x))) return 'Social'
    if (c.includes('messaging') || ['whatsapp', 'telegram', 'sms'].some(x => s.includes(x))) return 'Messaging'
    if (c.includes('email') || s.includes('email') || s.includes('brevo') || s.includes('newsletter')) return 'Email'
    if (s.includes('direct') || c.includes('direct')) return 'Direct'
    return 'Other'
  }

  static parseCSVLine(line) {
    const result = []
    let cur = ''
    let inQuotes = false
    for (let i = 0; i < line.length; i++) {
      const char = line[i]
      if (char === '"') {
        inQuotes = !inQuotes
      } else if (char === ',' && !inQuotes) {
        result.push(cur.trim())
        cur = ''
      } else {
        cur += char
      }
    }
    result.push(cur.trim())
    return result
  }

  static async importFromCSV(filePath = DEFAULT_CSV_PATH) {
    if (!fs.existsSync(filePath)) {
      logger.error('Growth sources CSV file not found', { filePath })
      throw new Error(`CSV file not found at ${filePath}`)
    }

    const content = fs.readFileSync(filePath, 'utf-8')
    const lines = content.split(/\r?\n/).filter(line => line.trim().length > 0)
    
    if (lines.length <= 1) {
      logger.warn('CSV empty or header only', { filePath })
      return { imported: 0, visitors: 0, subscribers: 0, revenue: 0 }
    }

    // Skip header line (Date,Source,Category,Unique visitors,New subscribers,New revenue)
    const dataLines = lines.slice(1)
    
    let totalVisitors = 0
    let totalSubscribers = 0
    let totalRevenue = 0
    let rowCount = 0

    // Root #7 — Atomic transaction for data integrity
    const insertMany = DB.growth.upsert.database.transaction((rows) => {
      for (const row of rows) {
        const [date, source, rawCat, visitorsStr, subsStr, revStr] = this.parseCSVLine(row)
        if (!date || !source) continue

        const visitors = parseInt(visitorsStr || '0', 10) || 0
        const subscribers = parseInt(subsStr || '0', 10) || 0
        const revenue = parseFloat(revStr || '0') || 0
        const category = this.normalizeCategory(source, rawCat)

        DB.growth.upsert.run({
          date,
          source,
          category,
          unique_visitors: visitors,
          new_subscribers: subscribers,
          new_revenue: revenue
        })

        totalVisitors += visitors
        totalSubscribers += subscribers
        totalRevenue += revenue
        rowCount++
      }
    })

    try {
      insertMany(dataLines)
      logger.info('Growth sources successfully imported into Living Engine', {
        rowCount,
        totalVisitors,
        totalSubscribers,
        totalRevenue,
        filePath
      })
      return { imported: rowCount, visitors: totalVisitors, subscribers: totalSubscribers, revenue: totalRevenue }
    } catch (err) {
      logger.error('Failed to import growth sources CSV', { error: err.message })
      throw err
    }
  }
}

// Allow CLI execution
if (process.argv[1] && process.argv[1].endsWith('sourceImporter.js')) {
  SourceImporter.importFromCSV()
    .then(stats => {
      console.log('✅ Import Complete:', stats)
      process.exit(0)
    })
    .catch(err => {
      console.error('❌ Import Failed:', err)
      process.exit(1)
    })
}
