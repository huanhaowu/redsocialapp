pipeline {
    agent any

    environment {
        // Define environment variables
        // Ensure FIREBASE_TOKEN is securely set in Jenkins credentials
        FIREBASE_TOKEN = credentials('FIREBASE_TOKEN')
    }

    stages {
        stage('Checkout') {
            steps {
                // Check out source code from your Git repository
                checkout scm
            }
        }

        stage('Install dependencies') {
            steps {
                // Use correct Node.js version (adjust as per your project's need)
                sh 'nvm install 14' // Example: using Node.js version 14
                sh 'npm install'
            }
        }

        stage('Build Tailwind CSS') {
            steps {
                // Build your Tailwind CSS (if you have a specific build script for it)
                sh 'npm run build:tailwind'
            }
        }

        stage('Lint') {
            steps {
                // Run ESLint or other linters
                sh 'npm run lint'
            }
        }

        stage('Test') {
            steps {
                // Run your test suite
                sh 'npm test'
            }
        }

        stage('Build React App') {
            steps {
                // Build your React application
                sh 'npm run build'
            }
        }

        stage('Deploy to Firebase') {
            when {
                // Define conditions for deployment, e.g., only from the main branch
                branch 'main'
            }
            steps {
                // Deploy to Firebase
                sh 'firebase deploy --only hosting --token $FIREBASE_TOKEN'
            }
        }
    }

    post {
        always {
            // Archive build artifacts, logs, or perform cleanup
            archiveArtifacts artifacts: 'build/**/*', fingerprint: true
        }
        success {
            // Actions to perform on successful build
            echo 'Build and deployment successful!'
        }
        failure {
            // Actions to perform on build failure
            echo 'Build or deployment failed.'
        }
    }
}
