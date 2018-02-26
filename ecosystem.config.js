module.exports = {
    apps: [{
      name: 'alloy-strength-server',
      script: './src/app.js'
    }],
    deploy: {
      production: {
        user: 'ubuntu',
        host: 'ec2-54-197-11-241.compute-1.amazonaws.com',
        key: '~/.ssh/AlloyStrengthKeyPair.pem',
        ref: 'origin/master',
        repo: 'git@github.com:asitwala/alloy-strength-server.git',
        path: '/home/ubuntu/alloy-strength-server',
        'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
      }
    }
}