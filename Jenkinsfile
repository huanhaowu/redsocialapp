pipeline {
    agent any

    environment {
        // Define your repository URL here
        REPO_URL = 'https://github.com/jpbrugal/redsocialapp'
    }

    stages {
        stage('Desarrollo') {
            steps {
                // Checking out from the main branch
                checkout([$class: 'GitSCM', branches: [[name: 'main']], userRemoteConfigs: [[url: REPO_URL]]])

                script {
                    // Merge and push to desarrollo branch
                    sh 'git checkout desarrollo'
                    sh 'git merge main'
                    sh 'git push origin desarrollo'
                }
                script {
                    // Run development tests
                    sh 'npm install'
                    sh 'firebase emulators:start --only firestore'
                    sh 'npm test'
                    sh 'npm run build'                    
                }
            }
        }

        stage('QA') {
            steps {
                script {
                    // Merge and push to qa branch
                    sh 'git checkout qa'
                    sh 'git merge desarrollo'
                    sh 'git push origin qa'
                }
                script {
                    // Run QA tests
                    sh 'npx eslint /src'
                }
            }
        }

        stage('Producción') {
            steps {
                script {
                    // Merge and push to produccion branch
                    sh 'git checkout produccion'
                    sh 'git merge qa'
                    sh 'git push origin produccion'
                }
                script {
                    // Run production tests
                }
            }
        }

        stage('Deploy to Firebase') {
            when {
                expression { currentBuild.resultIsBetterOrEqualTo('SUCCESS') }
            }
            steps {
                script {
                    // Deploy to Firebase
                }
            }
        }
    }

    post {
        always {
            // Post-build actions
            sh 'git checkout main'
            sh 'firebase emulators:exec --only firestore "echo Firestore Emulator stopped"'
        }
    }
}

