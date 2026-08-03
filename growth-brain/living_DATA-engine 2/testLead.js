import { DB } from './src/lib/db.js'

DB.leads.insert.run({
  domain: 'test-kya.com',
  niche: 'Apparel',
  store_name: 'Test KYA Store',
  email: 'founder@test-kya.com',
  email_source: 'test',
  email_provider: 'google',
  mx_provider: 'google',
  bsr: 100,
  est_rev_month: 50000,
  review_count: 50
})

const lead = DB.leads.all.all().find(l => l.domain === 'test-kya.com')
DB.leads.updateEnrich.run({
  id: lead.id,
  email_verified: 1,
  first_name: 'John',
  last_name: 'Doe',
  job_title: 'Founder',
  linkedin_url: '',
  company_size: '1-10',
  pain_point: 'High cart abandonment',
  buy_signal: 'Recently updated theme',
  email_hook: 'Loved your recent theme update on test-kya.com'
})

DB.leads.updateScore.run({
  id: lead.id,
  score: 95,
  score_reason: 'Testing'
})

DB.leads.updateStatus.run(lead.id, 'new')
console.log('Inserted dummy lead for testing KYA outreach.');
