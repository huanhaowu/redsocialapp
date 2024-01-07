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
                    // Add explicit closure to avoid ambiguity
                    def desarrolloActions = {
                        // Merge and push to desarrollo branch
                        sh 'git checkout desarrollo'
                        sh 'git merge main'
                        sh 'git push origin desarrollo'
                    }
                    desarrolloActions.call()

                    def developmentTests = {
                        // Run development tests
                        sh 'npm install'
                        sh 'firebase emulators:start --only firestore'
                        sh 'npm test'
                        sh 'npm run build'
                    }
                    developmentTests.call()
                }
            }
        }

        stage('QA') {
            steps {
                script {
                    def qaActions = {
                        // Merge and push to qa branch
                        sh 'git checkout qa'
                        sh 'git merge desarrollo'
                        sh 'git push origin qa'
                    }
                    qaActions.call()

                    def qaTests = {
                        // Run QA tests
                        sh 'npx eslint /src'
                    }
                    qaTests.call()
                }
            }
        }

        stage('Producción') {
            steps {
                script {
                    def produccionActions = {
                        // Merge and push to produccion branch
                        sh 'git checkout produccion'
                        sh 'git merge qa'
                        sh 'git push origin produccion'
                    }
                    produccionActions.call()

                    // Add any production tests here
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
                    // Add deployment commands here
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
