pipeline {
    agent any

    environment {
        // Define your repository URL here
        REPO_URL = "https://github.com/jpbrugal/redsocialapp"
    }

    stages {
        stage('Desarrollo') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: 'master']],
                 userRemoteConfigs: [[ url: "${REPO_URL}", credentialsId: 'GitHubJenkins']]
                ])

                script {
                    try {
                        def desarrolloActions = {
                            sh 'git config --global credential.helper store'
                            sh 'git checkout desarrollo'
                            sh 'git merge master'
                            sh 'git push origin desarrollo'
                        }
                        desarrolloActions.call()

                        def developmentTests = {
                            sh 'npm install'
                            sh 'firebase emulators:start --only firestore'
                            sh 'npm test'
                            sh 'npm run build'
                            // Ensure to stop the Firebase emulator
                            sh 'firebase emulators:stop'
                        }
                        developmentTests.call()
                    } catch (Exception e) {
                        // Handle any errors in this stage
                        echo "Error in Desarrollo stage: ${e.message}"
                        throw e
                    }
                }
            }
        }

        stage('QA') {
            steps {
                script {
                    try {
                        def qaActions = {
                            sh 'git checkout qa'
                            sh 'git merge desarrollo'
                            sh 'git push origin qa'
                        }
                        qaActions.call()

                        def qaTests = {
                            sh 'npx eslint /src'
                        // Add additional QA test commands here
                        }
                        qaTests.call()
                    } catch (Exception e) {
                        echo "Error in QA stage: ${e.message}"
                        throw e
                    }
                }
            }
        }

        stage('Producción') {
            steps {
                script {
                    try {
                        def produccionActions = {
                            sh 'git checkout produccion'
                            sh 'git merge qa'
                            sh 'git push origin produccion'
                        }
                        produccionActions.call()

                    // Add any production tests or steps here
                    } catch (Exception e) {
                        echo "Error in Producción stage: ${e.message}"
                        throw e
                    }
                }
            }
        }

        stage('Deploy to Firebase') {
            when {
                expression { currentBuild.resultIsBetterOrEqualTo('SUCCESS') }
            }
            steps {
                script {
                    try {
                    // Add Firebase deployment commands here
                    // Example: sh 'firebase deploy --only hosting'
                    } catch (Exception e) {
                        echo "Error in Deploy stage: ${e.message}"
                        throw e
                    }
                }
            }
        }
    }

    post {
        always {
            // Post-build actions
            sh 'git checkout main'
            // Ensure the Firestore emulator is stopped
            sh 'firebase emulators:exec --only firestore "echo Firestore Emulator stopped"'
        }
    }
}
