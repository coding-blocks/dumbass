module.exports = {
  apps: [
    {
      name: 'email-service',
      script: 'src/index.js',
      node_args: '--require dotenv/config',
      env: {
        NODE_PATH: 'src',
        PORT: 5001,
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '300M',
    },
  ],
}
