module.exports = {
  apps: [
    {
      name: 'earlybird',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 5055',
      cwd: './',
      max_memory_restart: '2G',
      env: {
        NODE_ENV: 'production'
      },
      exec_mode: 'cluster',
      instances: 'max',
      autorestart: true,
      merge_logs: true
    }
  ]
}
