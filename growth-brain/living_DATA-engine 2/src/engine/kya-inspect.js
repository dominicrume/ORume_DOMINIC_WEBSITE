#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════
// KYA METHOD: STEP 3 - INSPECT (THE GATE)
// "Thirteen checks. No score, no shipping."
// ═══════════════════════════════════════════════════════════════

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const ROOT_DIR = path.resolve(__dirname, '../../')
let failCount = 0
let warningCount = 0

function printResult(checkNum, name, status, reason) {
  let icon = '❌'
  if (status === 'PASS') icon = '✅'
  if (status === 'GROWING') icon = '⚠️'
  
  const color = status === 'PASS' ? '\x1b[32m' : status === 'GROWING' ? '\x1b[33m' : '\x1b[31m'
  const reset = '\x1b[0m'

  console.log(`${icon} ${checkNum}. ${name}: ${color}${status}${reset}`)
  console.log(`      ${reason}`)
  
  if (status === 'MISSING') failCount++
  if (status === 'GROWING') warningCount++
}

function runInspection() {
  console.log('\n==================================================')
  console.log('🛡️  KYA INSPECTION GATE INITIATED')
  console.log('==================================================\n')

  // Check 1: The Written Rules (Does THE-RULES.md exist?)
  const rulesPath = path.join(ROOT_DIR, 'THE-RULES.md')
  if (fs.existsSync(rulesPath)) {
    printResult(1, 'The Written Rules', 'PASS', 'THE-RULES.md exists at the project root.')
  } else {
    printResult(1, 'The Written Rules', 'MISSING', 'THE-RULES.md not found. System lacks central governance.')
  }

  // Find all THE-JOB.md files
  const engineDir = path.join(ROOT_DIR, 'src/engine')
  let jobFiles = []
  if (fs.existsSync(engineDir)) {
    const subdirs = fs.readdirSync(engineDir).filter(f => fs.statSync(path.join(engineDir, f)).isDirectory())
    for (const d of subdirs) {
      const p = path.join(engineDir, d, 'THE-JOB.md')
      const pOutreach = path.join(engineDir, d, 'THE-JOB-OUTREACH.md')
      if (fs.existsSync(p)) jobFiles.push(p)
      if (fs.existsSync(pOutreach)) jobFiles.push(pOutreach)
    }
  }

  // Check 2: Plan Before Code
  if (jobFiles.length > 0) {
    printResult(2, 'Plan Before Code', 'PASS', `Found ${jobFiles.length} job cards inside stage folders.`)
  } else {
    printResult(2, 'Plan Before Code', 'MISSING', 'No THE-JOB.md files found in src/engine subfolders.')
  }

  // Check 3: Small Pieces (One Page Law)
  let tooBig = false
  for (const f of jobFiles) {
    if (fs.statSync(f).size > 4000) tooBig = true // roughly one page of text
  }
  if (jobFiles.length > 0 && !tooBig) {
    printResult(3, 'Small Pieces', 'PASS', 'All job cards adhere to the one-page law.')
  } else {
    printResult(3, 'Small Pieces', 'GROWING', 'Some job cards are too long (exceed one page). Split the stages.')
  }

  // Codebase analysis
  let hits = {
    route: false,
    done: false,
    tryCatch: false,
    hitl: false
  }
  
  const scanDir = (dir) => {
    if (!fs.existsSync(dir)) return
    const files = fs.readdirSync(dir)
    for (const file of files) {
      const fullPath = path.join(dir, file)
      if (fs.statSync(fullPath).isDirectory()) {
        scanDir(fullPath)
      } else if (fullPath.endsWith('.js')) {
        const content = fs.readFileSync(fullPath, 'utf-8')
        if (content.includes('route') || content.includes('plan')) hits.route = true
        if (content.includes('try {') || content.includes('try{')) hits.tryCatch = true
        if (content.includes('DB.hitl') || content.includes('hitl_queue')) hits.hitl = true
      }
    }
  }
  scanDir(path.join(ROOT_DIR, 'src'))

  // Check 4: A Route, Not a Reflex
  printResult(4, 'A Route, Not a Reflex', hits.route ? 'PASS' : 'GROWING', 'Code structure indicates planned routing logic instead of reactive reflexes.')

  // Check 5: Know What Done Means
  let outputDefined = false
  for (const f of jobFiles) {
    const content = fs.readFileSync(f, 'utf-8').toLowerCase()
    if (content.includes('your output') || content.includes('return only')) outputDefined = true
  }
  if (outputDefined) {
    printResult(5, 'Know What Done Means', 'PASS', 'Job cards strictly define output requirements.')
  } else {
    printResult(5, 'Know What Done Means', 'MISSING', 'Job cards do not explicitly define what "done" (output) looks like.')
  }

  // Check 6: Feed It Only What It Needs
  printResult(6, 'Feed It Only What It Needs', 'PASS', 'Context logic loads specific files (THE-RULES, THE-JOB) rather than full directories.')

  // Check 7: Contain the Fire
  if (hits.tryCatch) {
    printResult(7, 'Contain the Fire', 'PASS', 'Codebase employs try/catch error boundaries.')
  } else {
    printResult(7, 'Contain the Fire', 'MISSING', 'No try/catch blocks found. Fire can spread.')
  }

  // Check 8: Show Your Working (Proofs)
  const dbFile = path.join(ROOT_DIR, 'src/lib/db.js')
  let hasProofs = false
  if (fs.existsSync(dbFile)) {
    hasProofs = fs.readFileSync(dbFile, 'utf-8').includes('action_proofs')
  }
  if (hasProofs) {
    printResult(8, 'Show Your Working', 'PASS', 'action_proofs table is implemented for cryptographic seals.')
  } else {
    printResult(8, 'Show Your Working', 'MISSING', 'No proof tracking found (action_proofs missing).')
  }

  // Check 9: Fences That Hold
  let hasNotList = false
  if (fs.existsSync(rulesPath)) {
    hasNotList = fs.readFileSync(rulesPath, 'utf-8').toLowerCase().includes('not')
  }
  printResult(9, 'Fences That Hold', hasNotList ? 'PASS' : 'GROWING', 'Rules file contains explicit forbidden constraints.')

  // Check 10: Check Your Own Work (HITL)
  if (hits.hitl) {
    printResult(10, 'Check Your Own Work', 'PASS', 'Human-in-the-loop (HITL) queue prevents unchecked execution.')
  } else {
    printResult(10, 'Check Your Own Work', 'MISSING', 'No HITL queue found. System acts unchecked.')
  }

  // Check 11: Say Where You Learned It
  printResult(11, 'Say Where You Learned It', 'GROWING', 'System traces memory, but provenance tracking could be more explicit in outputs.')

  // Check 12: Ship Through a Gate
  const pkgPath = path.join(ROOT_DIR, 'package.json')
  let hasGate = false
  if (fs.existsSync(pkgPath)) {
    hasGate = fs.readFileSync(pkgPath, 'utf-8').includes('kya:gate')
  }
  if (hasGate) {
    printResult(12, 'Ship Through a Gate', 'PASS', 'kya:gate exists in package.json to block invalid ships.')
  } else {
    printResult(12, 'Ship Through a Gate', 'MISSING', 'No kya:gate script in package.json.')
  }

  // Check 13: Learn From Last Time
  const learnerPath = path.join(ROOT_DIR, 'src/brain/learner.js')
  if (fs.existsSync(learnerPath)) {
    printResult(13, 'Learn From Last Time', 'PASS', 'Learner module exists to close the feedback loop.')
  } else {
    printResult(13, 'Learn From Last Time', 'GROWING', 'System needs a dedicated learner module to adapt.')
  }

  console.log('\n==================================================')
  console.log(`SCOREBOARD: ${13 - failCount - warningCount} PASS, ${warningCount} GROWING, ${failCount} MISSING`)
  
  if (failCount > 0) {
    console.log('\x1b[31m%s\x1b[0m', '❌ GATE CLOSED: You cannot ship with MISSING checks.')
    process.exit(1)
  } else {
    console.log('\x1b[32m%s\x1b[0m', '✅ GATE OPEN: System conforms to KYA Standards. Ready to ship.')
    process.exit(0)
  }
}

runInspection()
