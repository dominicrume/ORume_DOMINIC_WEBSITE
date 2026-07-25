// ═══════════════════════════════════════════════════════════════
// LIVING ENGINE 2.0 & AI GROWTH BRAIN — PM2 ECOSYSTEM CONFIG
// Zero-downtime clustering & automated memory management
// ═══════════════════════════════════════════════════════════════

module.exports = {
  apps: [
    {
      name: 'living-engine-api',
      script: 'src/api/server.js',
      instances: 1, // 1 instance for SQLite WAL write safety; scale UI horizontally if separated
      exec_mode: 'fork',
      watch: false,
      max_memory_restart: '500M',
      env_production: {
        NODE_ENV: 'production',
        PORT: 3001,
      },
      env_development: {
        NODE_ENV: 'development',
        PORT: 3001,
      },
      error_file: 'logs/pm2-error.log',
      out_file: 'logs/pm2-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      autorestart: true,
      restart_delay: 4000,
      expbackoff_restart_delay: 100,
    },
    {
      name: 'living-engine-worker',
      script: 'src/agent/agent.js',
      args: '--once',
      cron_restart: '0 * * * *', // Run hourly AI diagnostic & pipeline cycle automatically
      instances: 1,
      exec_mode: 'fork',
      watch: false,
      autorestart: false, // Managed by cron_restart schedule
      max_memory_restart: '300M',
      error_file: 'logs/pm2-worker-error.log',
      out_file: 'logs/pm2-worker-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    }
  ]
};
