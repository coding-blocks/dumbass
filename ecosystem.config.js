require('dotenv').config({ path: require('path').resolve(__dirname, '.env') })

module.exports = {
  apps: [
    {
      name: 'email-service',
      script: 'src/index.js',
      env: {
        NODE_PATH: 'src',
        PORT: process.env.PORT || 5001,
        MONGODB_URI: process.env.MONGODB_URI,
        DATABASE_NAME: process.env.DATABASE_NAME,
        SENDGRID_KEY: process.env.SENDGRID_KEY,
        SENDGRID_SENDER_EMAIL: process.env.SENDGRID_SENDER_EMAIL,
        SENDGRID_SENDER_NAME: process.env.SENDGRID_SENDER_NAME,
        SENDGRID_TEMPLATE_ID: process.env.SENDGRID_TEMPLATE_ID,
        TWO_FACTOR_ENDPOINT: process.env.TWO_FACTOR_ENDPOINT,
        TWO_FACTOR_NAMESPACE: process.env.TWO_FACTOR_NAMESPACE,
        TWO_FACTOR_SECRET: process.env.TWO_FACTOR_SECRET,
        SENTRY_DSN: process.env.SENTRY_DSN,
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '300M',
    },
  ],
}
