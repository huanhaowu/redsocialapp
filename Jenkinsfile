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
                            sh 'git config --global credential.helper "!f() { echo username=jpbrugal; echo password=$GIT_TOKEN; }; f"'
                            sh 'git checkout desarrollo'
                            sh 'git fetch origin master:master'
                            sh 'git merge master'
                            sh 'git push origin desarrollo'
                            // Reset the credential helper configuration after use
                            sh 'git config --global --unset credential.helper'
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
                    withCredentials([usernamePassword(credentialsId: 'jenkinsgit', usernameVariable: 'GIT_USERNAME', passwordVariable: 'GIT_PASSWORD')]) {
                        try {
                            def qaActions = {
                                sh 'git checkout qa'
                                sh 'git merge desarrollo'
                                sh "git push https://${GIT_USERNAME}:${GIT_PASSWORD}@${REPO_URL.replace('https://', '')} qa"
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
