pipeline {
    agent { label 'web-ui' }
    parameters {
        string(name: 'BRANCH_NAME', defaultValue: 'master', description: 'Branch name')
    }
    stages {
        stage('Clean') {
            steps {
                sh '''#sudo npm cache clean
                  #bower cache clean
                  sudo chown jenkins:jenkins -R ../*'''
                step([$class: 'WsCleanup'])
            }
        }

        stage('Build') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: BRANCH_NAME]], doGenerateSubmoduleConfigurations: false, extensions: [[$class: 'RelativeTargetDirectory', relativeTargetDir: 'cloudify-stage']], submoduleCfg: [], userRemoteConfigs: [[credentialsId: '9f6aca75-ebff-4045-9919-b8ec6b5ccf9d', url: 'https://github.com/cloudify-cosmo/cloudify-stage.git']]])
                dir('cloudify-stage') {
                    sh '''sudo npm install
                          sudo npm install webpack -g
                          sudo npm install bower -g
                          sudo npm install gulp -g
                          sudo npm install grunt-cli -g
                          bower install'''
                    dir('semantic') {
                        sh 'gulp build'
                    }
                    sh 'grunt build'
                    dir('backend') {
                        sh 'npm install'
                    }
                    sh 'webpack --config webpack.config-prod.js --bail'
                    sh 'sudo chown jenkins:jenkins -R .'
                }
            }
        }

        stage('Pack') {
            steps {
                dir('cloudify-stage') {
                    sh 'sudo npm run zip'
                }
                sh '''first=$(echo $BRANCH_NAME | cut -d. -f1)
                      if [ "$first" -gt 17 ] || [ "$first" -eq 17 ] ; then REPO="cloudify-versions" ; else REPO="cloudify-premium" ; fi
                      . ${JENKINS_HOME}/jobs/credentials.sh > /dev/null 2>&1
                      curl -u $GITHUB_USERNAME:$GITHUB_PASSWORD https://raw.githubusercontent.com/cloudify-cosmo/${REPO}/${BRANCH_NAME}/packages-urls/common_build_env.sh -o ./common_build_env.sh
                      . $PWD/common_build_env.sh
                      mv cloudify-stage/stage.tar.gz  cloudify-stage-$VERSION-$PRERELEASE.tgz'''

            }
        }

        stage('Upload package to S3') {
            steps {
                sh '''first=$(echo $BRANCH_NAME | cut -d. -f1)
                      if [ "$first" -gt 17 ] || [ "$first" -eq 17 ] ; then REPO="cloudify-versions" ; else REPO="cloudify-premium" ; fi
                      . ${JENKINS_HOME}/jobs/credentials.sh > /dev/null 2>&1
                      curl -u $GITHUB_USERNAME:$GITHUB_PASSWORD https://raw.githubusercontent.com/cloudify-cosmo/${REPO}/${BRANCH_NAME}/packages-urls/common_build_env.sh -o ./common_build_env.sh
                      . $PWD/common_build_env.sh
                      s3cmd put --access_key=${AWS_ACCESS_KEY_ID} --secret_key=${AWS_ACCESS_KEY} --human-readable-sizes --acl-public \\
                      cloudify-stage-$VERSION-$PRERELEASE.tgz \\
                      s3://$AWS_S3_BUCKET/$AWS_S3_PATH/'''
            }
        }
    }

    post {
        always {
          sh 'sudo chown jenkins:jenkins -R ../*'
          deleteDir()
        }

        failure {
          //mail(from: "jenkins-master-on-aws@gigaspaces.com",
          //     to: "kinneret@gigaspaces.com, limor@gigaspaces.com",
          //     subject: "UI build failed!",
          //     body: "For more information see the build log.")
          emailext attachLog: true, body: 'For more information see the build log.', recipientProviders: [[$class: 'FirstFailingBuildSuspectsRecipientProvider'], [$class: 'DevelopersRecipientProvider']], subject: 'UI build failed!', to: 'kinneret@gigaspaces.com,limor@gigaspaces.com'
        }
      }

      // The options directive is for configuration that applies to the whole job.
      options {
        buildDiscarder(logRotator(numToKeepStr:'30'))
        timeout(time: 60, unit: 'MINUTES')
        disableConcurrentBuilds()
        timestamps()
      }
}
