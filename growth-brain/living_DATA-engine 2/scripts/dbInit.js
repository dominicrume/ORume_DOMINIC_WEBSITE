// scripts/dbInit.js — Initialise database + memory
import 'dotenv/config'
import { DB } from '../src/lib/db.js'
import { Memory } from '../src/lib/memory.js'
import { logger } from '../src/lib/logger.js'

logger.info('Database initialised')
logger.info('Memory initialised')

const state = Memory.getState()
logger.info('Agent state', {
  cycle_count: state.cycle_count,
  active_niches: state.active_niches?.length,
  min_score: state.min_score_threshold,
})

const stats = DB.leads.stats.get()
logger.info('Lead stats', stats)
