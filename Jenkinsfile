pipeline {
    agent any

    environment {
        REPO_URL = "https://github.com/jpbrugal/redsocialapp"
    }

    stages {
        stage('Desarrollo') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'jenkinsGitHubToken', variable: 'GIT_TOKEN')]) {
                        try {
                            def desarrolloActions = {
                            sh 'git config --global credential.helper "!f() { echo username=jpbrugal; echo password=$GIT_TOKEN; }; f"'
                            sh 'git checkout desarrollo'
                            sh 'git fetch origin master:master'
                            sh 'git merge master'
                            sh 'git push origin desarrollo'
                            // Reset the credential helper configuration after use
                            sh 'git config --global --unset credential.helper'
                            }
                            desarrolloActions.call()

                        def developmentTests = {
                            sh 'npm install'
                           //sh 'firebase emulators:start --only firestore'
                            sh 'npm test || true'
                            sh 'npm run build'
                            // Ensure to stop the Firebase emulator
                           // sh 'firebase emulators:stop'
                        }
                        developmentTests.call()
                        } catch (Exception e) {
                            echo "Error in Desarrollo stage: ${e.message}"
                            throw e
                        }
                    }
                }
            }
        }

        stage('QA') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'jenkinsGitHubToken', variable: 'GIT_TOKEN')]) {
                        try {
                            def qaActions = {
                                sh 'git config --global credential.helper "!f() { echo username=jpbrugal; echo password=$GIT_TOKEN; }; f"'
                                sh 'git checkout qa'
                                sh 'git fetch origin desarrollo:desarrollo'
                                sh 'git merge desarrollo'
                                sh 'git push origin qa'
                                sh 'git config --global --unset credential.helper'
                            }
                            qaActions.call()

                            def qaTests = {
                                sh 'npx eslint /src'
                                sh 'npx jest'
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
        }

        stage('Producción') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'jenkinsgit', usernameVariable: 'GIT_USERNAME', passwordVariable: 'GIT_PASSWORD')]) {
                        try {
                            def produccionActions = {
                                sh 'git checkout produccion'
                                sh 'git merge qa'
                                sh "git push https://${GIT_USERNAME}:${GIT_PASSWORD}@${REPO_URL.replace('https://', '')} produccion"
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
            sh 'git checkout main'
            sh 'firebase emulators:exec --only firestore "echo Firestore Emulator stopped"'
        }
    }
}
