// CI/CD for Smart Expense Tracker:
// Checkout -> SonarQube scan -> Quality Gate -> Docker build -> Trivy scan -> deploy on http://localhost:8081
pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()      // one deploy at a time
    }

    // Jenkins on a laptop can't receive GitHub webhooks, so it checks GitHub for new commits every ~2 minutes.
    triggers {
        pollSCM('H/2 * * * *')
    }

    environment {
        IMAGE         = 'expense-tracker'
        APP_CONTAINER = 'expense-tracker-app'
        APP_PORT      = '8081'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('SonarQube Analysis') {
            environment {
                SCANNER_HOME = tool 'sonar-scanner'      // Manage Jenkins > Tools
            }
            steps {
                withSonarQubeEnv('sonarqube') {          // Manage Jenkins > System; injects the URL and token
                    sh '"$SCANNER_HOME/bin/sonar-scanner"'
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true   // result arrives through the SonarQube webhook
                }
            }
        }

        stage('Docker Build') {
            steps {
                sh 'docker build -t "$IMAGE:$BUILD_NUMBER" -t "$IMAGE:latest" .'
            }
        }

        stage('Trivy Scan') {
            steps {
                // Fails the build on HIGH/CRITICAL vulnerabilities that already have a fix.
                sh '''
                    docker run --rm \
                      -v /var/run/docker.sock:/var/run/docker.sock \
                      -v trivy-cache:/root/.cache/ \
                      aquasec/trivy:latest image \
                      --exit-code 1 --severity HIGH,CRITICAL --ignore-unfixed --no-progress \
                      "$IMAGE:$BUILD_NUMBER"
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    docker rm -f "$APP_CONTAINER" 2>/dev/null || true
                    docker run -d --name "$APP_CONTAINER" -p "$APP_PORT:80" --restart unless-stopped "$IMAGE:$BUILD_NUMBER"
                '''
            }
        }
    }

    post {
        success {
            echo "PIPELINE SUCCEEDED: build #${env.BUILD_NUMBER} is live at http://localhost:${env.APP_PORT}"
        }
        failure {
            echo "PIPELINE FAILED: build #${env.BUILD_NUMBER} was not deployed; the previous version keeps running. Open the red stage for details."
        }
    }
}
