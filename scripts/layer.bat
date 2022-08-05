cd ../aws-nodejs14x-nestjs-graphql-layer
rmdir /S /Q node_modules
npm install
cd ../scripts

sam build -t ./layer.yaml
sam deploy --template-file ./.aws-sam/build/template.yaml --stack-name=intllpnt-iapps-graph-dev-runtime --s3-bucket aws-sam-cli-managed-default-samclisourcebucket-keboggyh76p6 --capabilities CAPABILITY_NAMED_IAM --tags Application="Internal Apps GraphQL Standardized Runtime" Environment="dev" buildInfo=`v1` --region us-east-1 --no-fail-on-empty-changeset --parameter-overrides deployEnv=dev infraStack=intllpnt-iapps-ucase-dev-infra