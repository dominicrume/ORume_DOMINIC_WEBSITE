import React, { useEffect, useState } from 'react'

export default function App() {
  const [activeTab, setActiveTab] = useState('growth') // 'growth' | 'pipeline'
  const [stats, setStats] = useState(null)
  const [salesStats, setSalesStats] = useState(null)
  const [leads, setLeads] = useState([])
  const [learnings, setLearnings] = useState([])
  
  // Growth State
  const [growthStats, setGrowthStats] = useState(null)
  const [growthSources, setGrowthSources] = useState([])
  const [growthInsights, setGrowthInsights] = useState(null)
  const [importing, setImporting] = useState(false)
  const [notification, setNotification] = useState(null)

  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      const [statsRes, salesRes, leadsRes, learningsRes, gStatsRes, gSourcesRes, gInsightsRes] = await Promise.all([
        fetch('http://localhost:3001/api/stats').catch(() => ({ json: () => null })),
        fetch('http://localhost:3001/api/sales/stats').catch(() => ({ json: () => null })),
        fetch('http://localhost:3001/api/leads').catch(() => ({ json: () => [] })),
        fetch('http://localhost:3001/api/learnings').catch(() => ({ json: () => ({ decisions: [] }) })),
        fetch('http://localhost:3001/api/growth/stats').catch(() => ({ json: () => null })),
        fetch('http://localhost:3001/api/growth/sources').catch(() => ({ json: () => [] })),
        fetch('http://localhost:3001/api/growth/insights').catch(() => ({ json: () => null }))
      ])
      
      const statsData = await statsRes.json()
      if (statsData) setStats(statsData)

      const salesData = await salesRes.json()
      if (salesData) setSalesStats(salesData)

      const leadsData = await leadsRes.json()
      if (Array.isArray(leadsData)) setLeads(leadsData)

      const learningsData = await learningsRes.json()
      if (learningsData?.decisions) setLearnings(learningsData.decisions)

      const gStatsData = await gStatsRes.json()
      if (gStatsData) setGrowthStats(gStatsData)

      const gSourcesData = await gSourcesRes.json()
      if (Array.isArray(gSourcesData)) setGrowthSources(gSourcesData)

      const gInsightsData = await gInsightsRes.json()
      if (gInsightsData) setGrowthInsights(gInsightsData)

    } catch (err) {
      console.error('Failed to fetch data:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 15000)
    return () => clearInterval(interval)
  }, [])

  const handleRunGrowthCycle = async () => {
    setImporting(true)
    setNotification('Running AI Growth Brain & CSV ingestion...')
    try {
      const res = await fetch('http://localhost:3001/api/growth/import', { method: 'POST' })
      const data = await res.json()
      if (data.ok) {
        setNotification('✅ AI Growth Cycle Completed & Data Updated!')
        await fetchData()
        setTimeout(() => setNotification(null), 5000)
      } else {
        setNotification('❌ Failed to run growth cycle.')
      }
    } catch (err) {
      setNotification('❌ Error connecting to server.')
      console.error(err)
    } finally {
      setImporting(false)
    }
  }

  if (loading) {
    return <div className="loading">Initializing Living Engine & AI Growth Brain...</div>
  }

  const formatGBP = (num) => new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 2 }).format(num || 0)
  const formatNumber = (num) => new Intl.NumberFormat('en-GB').format(num || 0)

  // Calculate overall conversion rate for growth tab
  const totalVisitors = growthStats?.stats?.visitors || 0
  const totalSubscribers = growthStats?.stats?.subscribers || 0
  const totalRevenue = growthStats?.stats?.revenue || 0
  const convRate = totalVisitors > 0 ? ((totalSubscribers / totalVisitors) * 100).toFixed(1) : '0.0'

  return (
    <div className="dashboard-container">
      <header>
        <div className="title-area">
          <h1><span className="pulse"></span> LIVING ENGINE <span className="version-tag">2.0 AI BRAIN</span></h1>
          <p>Rume Dominic & Vorem Nigeria — Multi-Channel Growth & Revenue Intelligence</p>
        </div>
        <div className="header-actions">
          {notification && <div className="notification-toast">{notification}</div>}
          <button 
            className={`action-btn ${importing ? 'spinning' : ''}`} 
            onClick={handleRunGrowthCycle}
            disabled={importing}
          >
            ⚡ Run AI Growth Cycle
          </button>
          <div className="status-badge">● SYSTEM ALIVE</div>
        </div>
      </header>

      {/* NAVIGATION TABS */}
      <div className="tabs-bar">
        <button 
          className={`tab-btn ${activeTab === 'growth' ? 'active' : ''}`} 
          onClick={() => setActiveTab('growth')}
        >
          📈 Substack & Growth Intelligence
        </button>
        <button 
          className={`tab-btn ${activeTab === 'pipeline' ? 'active' : ''}`} 
          onClick={() => setActiveTab('pipeline')}
        >
          ⚡ Pipeline & Leads (ICM Layer 0)
        </button>
      </div>

      {activeTab === 'growth' ? (
        /* ── SUBSTACK & GROWTH INTELLIGENCE TAB ── */
        <div className="tab-content">
          <div className="stats-grid">
            <div className="panel stat-card">
              <div className="panel-header">Total Visitors</div>
              <div className="stat-value cyan">{formatNumber(totalVisitors)}</div>
              <div className="stat-subtext">Across Substack, Social & Direct</div>
            </div>
            <div className="panel stat-card">
              <div className="panel-header">Substack & Email Subscribers</div>
              <div className="stat-value purple">{formatNumber(totalSubscribers)}</div>
              <div className="stat-subtext">Opt-in Leads Captured</div>
            </div>
            <div className="panel stat-card">
              <div className="panel-header">Overall Opt-in Conversion</div>
              <div className="stat-value orange">{convRate}%</div>
              <div className="stat-subtext">Visitor to Subscriber Rate</div>
            </div>
            <div className="panel stat-card">
              <div className="panel-header">Revenue Generated</div>
              <div className="stat-value green">{formatGBP(totalRevenue)}</div>
              <div className="stat-subtext">Ascension Ladder Sales</div>
            </div>
          </div>

          <div className="growth-grid-2col">
            {/* LEFT: CHANNEL BREAKDOWN TABLE */}
            <div className="panel channel-panel">
              <div className="panel-header-row">
                <span className="panel-header">Channel & Category Breakdown</span>
                <span className="badge-info">{growthStats?.byCategory?.length || 0} Categories</span>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Visitors</th>
                    <th>Subscribers</th>
                    <th>Conv. Rate</th>
                    <th>Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {growthStats?.byCategory && growthStats.byCategory.length > 0 ? (
                    growthStats.byCategory.map((cat, idx) => {
                      const rate = cat.total_visitors > 0 ? ((cat.total_subscribers / cat.total_visitors) * 100).toFixed(1) : '0.0'
                      return (
                        <tr key={idx}>
                          <td><span className="category-badge">{cat.category}</span></td>
                          <td style={{fontWeight: 600}}>{formatNumber(cat.total_visitors)}</td>
                          <td style={{color: 'var(--accent-purple)', fontWeight: 600}}>{formatNumber(cat.total_subscribers)}</td>
                          <td><span className="rate-badge">{rate}%</span></td>
                          <td style={{color: 'var(--accent-green)'}}>{formatGBP(cat.total_revenue)}</td>
                        </tr>
                      )
                    })
                  ) : (
                    <tr><td colSpan="5" style={{textAlign: 'center', padding: 20}}>No channel data recorded. Click Run AI Growth Cycle.</td></tr>
                  )}
                </tbody>
              </table>

              <div className="panel-header" style={{marginTop: 30, marginBottom: 15}}>Top Raw Traffic Streams</div>
              <table>
                <thead>
                  <tr>
                    <th>Specific Source</th>
                    <th>Category</th>
                    <th>Visitors</th>
                    <th>Subscribers</th>
                  </tr>
                </thead>
                <tbody>
                  {growthStats?.bySource && growthStats.bySource.slice(0, 6).map((src, idx) => (
                    <tr key={idx}>
                      <td style={{fontWeight: 500}}>{src.source}</td>
                      <td><span className="category-badge-sm">{src.category}</span></td>
                      <td>{formatNumber(src.visitors)}</td>
                      <td>{formatNumber(src.subscribers)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* RIGHT: AI GROWTH ADVISOR PANEL */}
            <div className="panel advisor-panel">
              <div className="panel-header-row">
                <span className="panel-header" style={{color: 'var(--accent-cyan)'}}>🧠 AI Growth Brain Diagnosis</span>
                {growthInsights?.top_channel && (
                  <span className="top-channel-badge">Top Stream: {growthInsights.top_channel}</span>
                )}
              </div>

              <div className="bottleneck-box">
                <div className="box-label">⚠️ Current Bottleneck & Funnel Friction</div>
                <p>{growthInsights?.bottleneck || 'No bottleneck identified. Run an AI Growth Cycle.'}</p>
              </div>

              <div className="panel-header" style={{fontSize: 14, marginBottom: 15, color: 'var(--text-secondary)'}}>
                🎯 Ascension Ladder Recommendations
              </div>

              <div className="recommendations-list">
                {growthInsights?.recommendations && growthInsights.recommendations.length > 0 ? (
                  growthInsights.recommendations.map((rec, idx) => (
                    <div key={idx} className="rec-card">
                      <div className="rec-header">
                        <span className={`priority-badge priority-${rec.priority?.toLowerCase()}`}>{rec.priority}</span>
                        <span className="tier-badge">{rec.target_tier}</span>
                        <span className="channel-tag">#{rec.channel}</span>
                      </div>
                      <h4 className="rec-action">{rec.action}</h4>
                      <p className="rec-rationale"><strong>Rationale:</strong> {rec.rationale}</p>
                      <div className="rec-impact">💡 <strong>Expected Impact:</strong> {rec.expected_impact}</div>
                    </div>
                  ))
                ) : (
                  <div style={{color: 'var(--text-secondary)', textAlign: 'center', padding: 20}}>
                    No recommendations available. Click Run AI Growth Cycle above.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ── PIPELINE & LEADS TAB ── */
        <div className="tab-content">
          <div className="stats-grid">
            <div className="panel stat-card">
              <div className="panel-header">Pipeline Value</div>
              <div className="stat-value cyan">{formatGBP(salesStats?.matches?.pipeline_value || 0)}</div>
              <div className="stat-subtext">Active Potential Revenue</div>
            </div>
            
            <div className="panel stat-card">
              <div className="panel-header">Realised Revenue</div>
              <div className="stat-value green">{formatGBP(salesStats?.revenue?.total || 0)}</div>
              <div className="stat-subtext">Towards £8M Goal</div>
            </div>

            <div className="panel stat-card">
              <div className="panel-header">Qualified Leads</div>
              <div className="stat-value purple">{stats?.leads?.hot || 0}</div>
              <div className="stat-subtext">Score 80+</div>
            </div>

            <div className="panel stat-card">
              <div className="panel-header">Conversion Rate</div>
              <div className="stat-value orange">
                {stats?.leads?.converted && stats?.leads?.replied 
                  ? Math.round((stats.leads.converted / stats.leads.replied) * 100) 
                  : 0}%
              </div>
              <div className="stat-subtext">From Reply to Close</div>
            </div>
          </div>

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

          <div className="panel memory-panel">
            <div className="panel-header" style={{color: 'var(--accent-purple)'}}>AI Agent Decisions (Learner Brain)</div>
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
      )}
    </div>
  )
}
