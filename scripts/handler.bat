
REM cd ../opalach
REM npm run package

cd ../
call sam build -t handler.yaml
call sam deploy --template-file ./.aws-sam/build/template.yaml --stack-name=intllpnt-iapps-dev-inventory --s3-bucket aws-sam-cli-managed-default-samclisourcebucket-keboggyh76p6 --capabilities CAPABILITY_NAMED_IAM --tags Application="Internal Apps" Environment="dev" buildInfo="v1" --region us-east-1 --no-fail-on-empty-changeset --parameter-overrides deployEnv=dev infraStack=intllpnt-iapps-ucase-dev-infra layerVersion=2