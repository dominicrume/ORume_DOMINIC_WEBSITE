import React, { useEffect, useState } from 'react'

export default function App() {
  const [activeTab, setActiveTab] = useState('hitl') // 'hitl' | 'growth' | 'pipeline'
  const [stats, setStats] = useState(null)
  const [salesStats, setSalesStats] = useState(null)
  const [leads, setLeads] = useState([])
  const [learnings, setLearnings] = useState([])
  
  // HITL State
  const [hitlQueue, setHitlQueue] = useState([])
  const [selectedAction, setSelectedAction] = useState(null)
  const [declineFeedback, setDeclineFeedback] = useState('')
  const [proofs, setProofs] = useState([])
  
  // Growth State
  const [growthStats, setGrowthStats] = useState(null)
  const [growthSources, setGrowthSources] = useState([])
  const [growthInsights, setGrowthInsights] = useState(null)
  const [importing, setImporting] = useState(false)
  const [notification, setNotification] = useState(null)

  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      const [statsRes, salesRes, leadsRes, learningsRes, gStatsRes, gSourcesRes, gInsightsRes, queueRes, proofsRes] = await Promise.all([
        fetch('http://localhost:3001/api/stats').catch(() => ({ json: () => null })),
        fetch('http://localhost:3001/api/sales/stats').catch(() => ({ json: () => null })),
        fetch('http://localhost:3001/api/leads').catch(() => ({ json: () => [] })),
        fetch('http://localhost:3001/api/learnings').catch(() => ({ json: () => ({ decisions: [] }) })),
        fetch('http://localhost:3001/api/growth/stats').catch(() => ({ json: () => null })),
        fetch('http://localhost:3001/api/growth/sources').catch(() => ({ json: () => [] })),
        fetch('http://localhost:3001/api/growth/insights').catch(() => ({ json: () => null })),
        fetch('http://localhost:3001/api/queue').catch(() => ({ json: () => [] })),
        fetch('http://localhost:3001/api/proofs').catch(() => ({ json: () => [] }))
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

      const queueData = await queueRes.json()
      if (Array.isArray(queueData)) {
        setHitlQueue(queueData)
        // Auto-select first item if none selected and queue is populated
        if (!selectedAction && queueData.length > 0) {
          setSelectedAction(queueData[0])
        } else if (selectedAction && !queueData.find(q => q.id === selectedAction.id)) {
          setSelectedAction(null)
        }
      }

      const proofsData = await proofsRes.json()
      if (Array.isArray(proofsData)) setProofs(proofsData)

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
          className={`tab-btn ${activeTab === 'hitl' ? 'active' : ''}`} 
          onClick={() => setActiveTab('hitl')}
        >
          ⚡ Control Room (HITL)
        </button>
        <button 
          className={`tab-btn ${activeTab === 'audits' ? 'active' : ''}`} 
          onClick={() => setActiveTab('audits')}
        >
          🔒 KYA Audits
        </button>
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
          ⚙️ Pipeline & Leads
        </button>
      </div>

      {activeTab === 'hitl' && (
        <div className="tab-content hitl-container">
          <div className="panel" style={{ display: 'flex', gap: '20px', minHeight: '600px' }}>
            {/* LEFT: Queue List */}
            <div style={{ width: '30%', borderRight: '1px solid var(--border-color)', paddingRight: '20px' }}>
              <div className="panel-header">Pending Approval ({hitlQueue.length})</div>
              <div className="queue-list" style={{ marginTop: '15px' }}>
                {hitlQueue.length === 0 ? (
                  <p style={{ color: 'var(--text-secondary)' }}>No actions pending review.</p>
                ) : (
                  hitlQueue.map(item => (
                    <div 
                      key={item.id} 
                      onClick={() => setSelectedAction(item)}
                      style={{ 
                        padding: '12px', 
                        marginBottom: '10px', 
                        background: selectedAction?.id === item.id ? 'rgba(0, 255, 255, 0.1)' : 'var(--bg-darker)',
                        border: selectedAction?.id === item.id ? '1px solid var(--accent-cyan)' : '1px solid transparent',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}>
                      <div style={{ fontWeight: 'bold' }}>{item.action_type === 'social_post' ? 'Omni-Channel Social Post' : item.action_type}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                        {new Date(item.created_at).toLocaleString()}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* RIGHT: Action Details */}
            <div style={{ width: '70%', paddingLeft: '10px' }}>
              {selectedAction ? (
                <div>
                  <div className="panel-header" style={{ marginBottom: '20px', color: 'var(--accent-cyan)' }}>
                    Reviewing: {selectedAction.action_type === 'social_post' ? 'Omni-Channel Social Post' : selectedAction.action_type}
                  </div>
                  
                  <div className="payload-preview" style={{ background: 'var(--bg-darker)', padding: '20px', borderRadius: '8px', marginBottom: '20px', maxHeight: '500px', overflowY: 'auto' }}>
                    {selectedAction.action_type === 'social_post' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {Object.entries(JSON.parse(selectedAction.payload_json)).map(([key, value]) => (
                          <div key={key}>
                            <div style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--accent-purple)', marginBottom: '8px', fontWeight: 'bold', letterSpacing: '0.5px' }}>
                              {key.replace('_', ' ')}
                            </div>
                            <textarea 
                              style={{ 
                                width: '100%', 
                                minHeight: '100px', 
                                background: '#111', 
                                color: '#e0e0e0', 
                                border: '1px solid #333', 
                                padding: '12px', 
                                borderRadius: '6px',
                                fontFamily: 'monospace',
                                fontSize: '13px',
                                lineHeight: '1.5'
                              }}
                              defaultValue={value}
                              id={`edit-${key}`}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="hitl-actions" style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                    <button className="action-btn" style={{ background: 'var(--accent-green)', borderColor: 'var(--accent-green)', padding: '10px 20px', fontWeight: 'bold' }} onClick={async () => {
                      let updatedPayload = {}
                      if (selectedAction.action_type === 'social_post') {
                        Object.keys(JSON.parse(selectedAction.payload_json)).forEach(k => {
                          updatedPayload[k] = document.getElementById(`edit-${k}`).value
                        })
                      } else {
                        updatedPayload = JSON.parse(selectedAction.payload_json)
                      }
                      
                      setImporting(true)
                      try {
                        const res = await fetch(`http://localhost:3001/api/queue/${selectedAction.id}/approve`, {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ payload_json: JSON.stringify(updatedPayload) })
                        })
                        if(res.ok) {
                           setNotification('✅ Approved and fired to Make.com!')
                           setSelectedAction(null)
                           fetchData()
                        }
                      } catch (err) {
                        setNotification('❌ Failed to approve')
                      }
                      setImporting(false)
                    }}>
                      ✅ Approve & Fire
                    </button>
                    
                    <div style={{ display: 'flex', gap: '10px', marginLeft: 'auto' }}>
                      <input 
                        type="text" 
                        placeholder="Reason for decline..." 
                        value={declineFeedback}
                        onChange={e => setDeclineFeedback(e.target.value)}
                        style={{ padding: '8px 12px', background: '#111', border: '1px solid #444', color: '#fff', borderRadius: '4px', width: '250px' }}
                      />
                      <button className="action-btn" style={{ background: '#ff4444', borderColor: '#cc0000', color: 'white' }} onClick={async () => {
                        if (!declineFeedback) return alert('Provide feedback for declining.')
                        setImporting(true)
                        try {
                          await fetch(`http://localhost:3001/api/queue/${selectedAction.id}/decline`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ feedback: declineFeedback })
                          })
                          setNotification('❌ Declined and feedback logged')
                          setSelectedAction(null)
                          setDeclineFeedback('')
                          fetchData()
                        } catch(e){}
                        setImporting(false)
                      }}>
                        ❌ Decline & Teach
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-secondary)' }}>
                  Select an item from the queue to review.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'audits' && (
        <div className="tab-content">
          <div className="panel leads-panel">
            <div className="panel-header-row">
              <span className="panel-header" style={{ color: 'var(--accent-purple)' }}>🔒 KYA Audits: Cryptographic Proofs</span>
              <span className="badge-info">Unbroken Chain of Accountability</span>
            </div>
            {proofs.length > 0 ? (
              <table style={{ marginTop: '20px' }}>
                <thead>
                  <tr>
                    <th>Action Type</th>
                    <th>Cryptographic Seal (SHA-256)</th>
                    <th>Previous Seal Link</th>
                    <th>Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {proofs.map((proof, i) => (
                    <tr key={proof.id} style={{ fontFamily: 'monospace', fontSize: '13px' }}>
                      <td style={{ color: 'var(--accent-cyan)' }}>{proof.action_type}</td>
                      <td style={{ color: 'var(--accent-green)', letterSpacing: '0.5px' }}>{proof.payload_hash}</td>
                      <td style={{ color: 'var(--text-secondary)' }}>{proof.prev_hash === 'GENESIS_BLOCK' ? 'GENESIS_BLOCK' : proof.prev_hash.substring(0, 16) + '...'}</td>
                      <td>{new Date(proof.sealed_at).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div style={{ padding: '40px 0', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '14px' }}>
                No cryptographic proofs generated yet. Approve an action in the Control Room.
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'growth' && (
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
      )}

      {activeTab === 'pipeline' && (
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
