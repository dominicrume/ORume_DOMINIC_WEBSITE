import express from 'express'
import { DB } from '../lib/db.js'
import { logger } from '../lib/logger.js'

export const lifecycleRouter = express.Router()

// POST /api/lifecycle/event
// Endpoint to log a new lifecycle event (booking, checkout, pdf, etc.)
lifecycleRouter.post('/event', (req, res) => {
  const { email, first_name, last_name, event_type, event_data } = req.body

  if (!email || !event_type) {
    return res.status(400).json({ error: 'email and event_type are required' })
  }

  try {
    // 1. Ensure user exists
    DB.lifecycle.upsertUser.run({
      email,
      first_name: first_name || null,
      last_name: last_name || null
    })

    const user = DB.lifecycle.getUserByEmail.get(email)

    // 2. Log the event
    DB.lifecycle.logEvent.run({
      user_id: user.id,
      event_type,
      event_data: event_data ? JSON.stringify(event_data) : null
    })

    logger.info(`[LMS] Logged event ${event_type} for ${email}`)

    return res.json({ success: true, message: 'Event logged successfully' })
  } catch (error) {
    logger.error('[LMS] Error logging event', { error: error.message })
    return res.status(500).json({ error: 'Internal server error' })
  }
})
