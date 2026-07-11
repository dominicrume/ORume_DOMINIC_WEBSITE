// scripts/showMemory.js — Show current agent memory state
import 'dotenv/config'
import { Memory } from '../src/lib/memory.js'

const snap = Memory.getFullSnapshot()
console.log('\n⚡ LIVING ENGINE — AGENT MEMORY\n')
console.log('STATE:', JSON.stringify(snap.state, null, 2))
console.log('\nNICHE PERFORMANCE:', JSON.stringify(snap.niche_performance, null, 2))
console.log('\nPROVIDER PERFORMANCE:', JSON.stringify(snap.provider_performance, null, 2))
console.log('\nRECENT LEARNINGS:', JSON.stringify(snap.recent_learnings, null, 2))
