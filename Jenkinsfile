pipeline {
  agent any
  stages {
    stage('拉取代码') { 
      steps { 
        checkout([$class: 'GitSCM', branches: [[name: '*/${branchName}']], extensions: [], userRemoteConfigs: [[credentialsId: 'GDPAY-H5-123', url: 'https://test.byty888.com/wali/gdpayh5-web.git']]])
        script {
          if (after != commit_id) {
            currentBuild.result = 'ABORTED'
            error('Pipeline aborted.')
          }
        }
      } 
    }
    stage('构建打包') {
      steps {
        nodejs('NodeJS v20') {
          sh '''
              pnpm install --no-frozen-lockfile --ignore-scripts
              pnpm build:pre-release
            '''
        }
      }
    }
    stage('ftp上传') {
      steps {
        ftpPublisher    alwaysPublishFromMaster: false,
                        masterNodeName: 'ftp_server_sit',
                        paramPublish: [ parameterName: "" ],
                        continueOnError: false,
                        failOnError: false,
                        publishers: [[
                            configName: 'GDPAY-H5-ftp',
                            transfers: [[
                                asciiMode: false,
                                cleanRemote: false,
                                excludes: '',
                                flatten: false,
                                makeEmptyDirs: false,
                                noDefaultExcludes: false,
                                patternSeparator: '[, ]+',
                                remoteDirectory: 'dist',
                                remoteDirectorySDF: false,
                                removePrefix: 'dist',
                                sourceFiles: 'dist/**/*'
                            ]],
                            usePromotionTimestamp: false,
                            useWorkspaceInPromotion: false,
                            verbose: true
                        ]]
      }
    }
    
  }
}