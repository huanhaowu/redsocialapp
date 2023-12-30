pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Check out source code from your Git repository
                checkout scm
            }
        }

        stage('Install dependencies') {
            steps {
                // Install Node.js and dependencies
                sh 'nvm install 14' // Example: using Node.js version 14
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                // Run your test suite
                sh 'npm test'
            }
        }
    }

    post {
        always {
            // Perform actions like archiving artifacts, logs, or cleanup
            echo 'Build process completed.'
        }
        success {
            // Actions to perform on successful build
            echo 'Tests run successfully.'
        }
        failure {
            // Actions to perform on build failure
            echo 'Tests failed.'
        }
    }
}
