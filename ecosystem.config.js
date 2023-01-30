module.exports = {
  apps: [
    {
      name: 'vrai-server',
      script: 'dist/apps/server/main.js',
      instances: 2,
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      time: true,
      env: {
        NODE_ENV: process.env.NODE_ENV,
      },
    },
  ],
};
