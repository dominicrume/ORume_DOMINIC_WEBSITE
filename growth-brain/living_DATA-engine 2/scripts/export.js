// Export leads to CSV
import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { DB } from '../src/lib/db.js'

const args     = process.argv.slice(2)
const minScore = args.includes('--min-score') ? Number(args[args.indexOf('--min-score')+1]) : 0
const format   = args.includes('--format') ? args[args.indexOf('--format')+1] : 'csv'

fs.mkdirSync('./exports', { recursive: true })
const leads   = DB.leads.forOutreach.all(minScore, 9999)
const ts      = new Date().toISOString().slice(0,10)
const outFile = `./exports/leads-${ts}.${format}`

if (format === 'json') {
  fs.writeFileSync(outFile, JSON.stringify(leads, null, 2))
} else {
  const headers = ['domain','store_name','email','email_verified','email_provider','mx_provider','first_name','last_name','job_title','niche','score','pain_point','buy_signal','email_hook','status']
  const rows = leads.map(l => headers.map(h => JSON.stringify(l[h] ?? '')).join(','))
  fs.writeFileSync(outFile, [headers.join(','), ...rows].join('\n'))
}
console.log(`✓ Exported ${leads.length} leads → ${outFile}`)
