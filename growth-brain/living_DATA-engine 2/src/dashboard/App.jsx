import React, { useEffect, useState } from 'react'

export default function App() {
  const [stats, setStats] = useState(null)
  const [salesStats, setSalesStats] = useState(null)
  const [leads, setLeads] = useState([])
  const [learnings, setLearnings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, salesRes, leadsRes, learningsRes] = await Promise.all([
          fetch('http://localhost:3001/api/stats'),
          fetch('http://localhost:3001/api/sales/stats'),
          fetch('http://localhost:3001/api/leads'),
          fetch('http://localhost:3001/api/learnings')
        ])
        
        setStats(await statsRes.json())
        setSalesStats(await salesRes.json())
        setLeads(await leadsRes.json())
        setLearnings((await learningsRes.json()).decisions || [])
      } catch (err) {
        console.error('Failed to fetch data:', err)
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
    // Poll every 30 seconds
    const interval = setInterval(fetchData, 30000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return <div className="loading">Initializing Living Engine...</div>
  }

  // Format currency
  const formatGBP = (num) => new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(num || 0)

  return (
    <div className="dashboard-container">
      <header>
        <div className="title-area">
          <h1><span className="pulse"></span> LIVING ENGINE</h1>
          <p>ICM Layer 0 — Agentic AI Lead Generation System</p>
        </div>
        <div className="status-badge">● SYSTEM OPERATIONAL</div>
      </header>

      <div className="grid">
        {/* STATS ROW */}
        <div className="stats-grid">
          <div className="panel stat-card">
            <div className="panel-header">Pipeline Value</div>
            <div className="stat-value cyan">{formatGBP(salesStats?.matches?.pipeline_value)}</div>
            <div style={{color: 'var(--text-secondary)', fontSize: 12}}>Active Potential Revenue</div>
          </div>
          
          <div className="panel stat-card">
            <div className="panel-header">Realised Revenue</div>
            <div className="stat-value green">{formatGBP(salesStats?.revenue?.total)}</div>
            <div style={{color: 'var(--text-secondary)', fontSize: 12}}>Towards £8M Goal</div>
          </div>

          <div className="panel stat-card">
            <div className="panel-header">Qualified Leads</div>
            <div className="stat-value purple">{stats?.leads?.hot || 0}</div>
            <div style={{color: 'var(--text-secondary)', fontSize: 12}}>Score 80+</div>
          </div>

          <div className="panel stat-card">
            <div className="panel-header">Conversion Rate</div>
            <div className="stat-value orange">
              {stats?.leads?.converted && stats?.leads?.replied 
                ? Math.round((stats.leads.converted / stats.leads.replied) * 100) 
                : 0}%
            </div>
            <div style={{color: 'var(--text-secondary)', fontSize: 12}}>From Reply to Close</div>
          </div>
        </div>

        {/* LEADS PANEL */}
        <div className="panel leads-panel">
          <div className="panel-header">Recent High-Signal Leads</div>
          {leads.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Store / Brand</th>
                  <th>Niche</th>
                  <th>MX Provider</th>
                  <th>AI Score</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {leads.slice(0, 8).map(lead => (
                  <tr key={lead.id}>
                    <td>
                      <div style={{fontWeight: 500}}>{lead.store_name || lead.domain}</div>
                      <div style={{fontSize: 12, color: 'var(--text-secondary)'}}>{lead.email}</div>
                    </td>
                    <td>{lead.niche}</td>
                    <td><span className="mx-badge">{lead.email_provider || lead.mx_provider}</span></td>
                    <td><span className="score-badge">{lead.score}</span></td>
                    <td style={{textTransform: 'uppercase', fontSize: 12}}>{lead.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div style={{padding: '40px 0', textAlign: 'center', color: 'var(--text-secondary)', fontSize: 14}}>
              No leads processed yet. Await cycle completion.
            </div>
          )}
        </div>

        {/* AI LEARNING MEMORY */}
        <div className="panel memory-panel">
          <div className="panel-header" style={{color: 'var(--accent-purple)'}}>AI Agent Decisions</div>
          <div className="learning-log">
            {learnings.length > 0 ? learnings.slice(0, 4).map((learn, i) => (
              <div key={i} className="learning-item">
                <h4>{learn.stage}: {learn.decision}</h4>
                <p>{learn.reasoning}</p>
              </div>
            )) : (
              <div style={{color: 'var(--text-secondary)', fontSize: 13}}>
                Memory empty. The agent will log decisions here after the first cycle.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
