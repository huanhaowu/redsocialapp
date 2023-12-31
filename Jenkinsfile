pipeline {
    agent any

    environment {
        // Set the Firebase token as an environment variable
        FIREBASE_TOKEN = 'AIzaSyCwa373ojIxpNADe7jzLgfZjhn1ppwxRTU'
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from the main branch
                git url: 'https://github.com/jpbrugal/redsocialapp', branch: 'main'
            }
        }
        stage('Install Dependencies') {
            steps {
                script {
                    // Install npm dependencies
                    sh 'npm install'
                }
            }
        }

        stage('Lint') {
            steps {
                script {
                    // Run ESLint
                    sh 'npx eslint .'
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    // Build the project
                    sh 'npm run build'
                }
            }
        }

        stage('Deploy to Development') {
            steps {
                script {
                    // Deploy to Firebase (development environment)
                    sh 'firebase deploy --only hosting:development --token ${FIREBASE_TOKEN}'
                }
            }
        }

        stage('Deploy to Staging') {
            steps {
                script {
                    // Deploy to Firebase (staging environment)
                    sh 'firebase deploy --only hosting:staging --token ${FIREBASE_TOKEN}'
                }
            }
        }

        stage('Deploy to Production') {
            steps {
                script {
                    // Deploy to Firebase (production environment)
                    sh 'firebase deploy --only hosting:production --token ${FIREBASE_TOKEN}'
                }
            }
        }
    }

    post {
        always {
            // Actions to perform after pipeline completion
            echo 'Pipeline execution is complete.'
        }
    }
}
