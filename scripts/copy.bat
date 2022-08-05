cd ../damara/build
call aws s3 cp . s3://intllpnt-iapps-ucase-dev-infra-damarabucket-k8405x8uoi20 --recursive

cd ../../scripts