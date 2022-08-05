## inventory-use-case

### How To Use The App

#### A sample reference implementation of an AWS Microservce developed with a serverless and automated approach with a React-Typescript front-end.

* Access the site here:
  * [Warehouse Dashboard Bucket](http://intllpnt-iapps-ucase-dev-infra-damarabucket-k8405x8uoi20.s3-website-us-east-1.amazonaws.com/upload)

* On the side nav menu, select management the supported files:
  * Warehouse - Warehouse.CSV 
  * Product - Product.CSV 
  * Inventory - Inventory.csv

* Select the File Type and the appropriate file upload.

* Once all three files have been uploaded, selec the "Analytics" link. 
* Review the stats and info related from the graphql query.


Note - even though mutliple graphql endpoints where exposed, in the end, everything
could be done in a single query which is what you will find in the client application.

Note #2 - The site is **NOT RESPONSIVE** and is on my todos list. It will support large
and xl large screens currently but is not mobile ready.


## Requirements

* Docker installed
* AWS CLI is already configured and working properly.
* AWS SAM CLI is installed.
* A solid understanding of IAM.
* Node is installed.
* Clone this project.

## Setup Process

Here is how you can get the project up and running relatively quickly.

## Local Quick Start

### Setting up dynamoDB locally

1. Navigate the local-setup folder
```aidl
root
    | - opalach
    | - scripts 
            | - local-setup 
```

2. Install dynamodb local

```aidl
  install-dynamodb-local.bat
```

3. Create the dynamodb table
```aidl
  create-table.bat
```

### Running The Microservice Locally
1. Navigate the project structure and locate the lambda-handler folder:

```aidl
root
    | - opalach
    | - scripts
```

2. Run the installation command:

```aidl
npm install
```

3. Run Live-Reload:
```aidl
    npm run start:dev 
```

## Endpoints:

### Graphql Endpoints
```aidl
    http://localhost:3000/inventory/graphql
```

### Upload Endpoint (Locally) 
```aidl
    http://localhost:3000/upload
```


### Deploying to AWS

Ensure you are a valid aws user/assumed role that has the
appropriate IAM permissions or you will run into problems deploying.

### 1.) Deploying the infrastructure with AWS SAM
1. Navigate to the scripts/infra directory.
```aidl
aws-nestjs-restapi-demo
    | - opalach
    | - scripts
            
```

2. Run the build script
```aidl
infra.bat
```

### 2.) Deploying the Application
1. Navigate the scripts directory

2. Build the project

```aidl
 npm run build
```

3. Build & Deploy the project
```aidl
handler.bat
```

Note - for this to work, you must have a user or assumed role configured with AWS API, Cognito, Lmbda, SNS, SQS and SES permissions.

## Tech Stack (Back-End)

#### This implementation is composed of various AWS Services and Frameworks. Most notably are the following:
* TypeScript
* NestJS
* AWS Lambda
* AWS API Gateway
* AWS SAM Based Cloudformation Templates (YAML)
* AWS DynamoDB
* GraphQL 

### A high-level walk through of each element listed here is as follows...

### TypeScript

This implementation uses TypeScript. TypeScript proves
to be an amazing language that gives us some control
over what can be some wild javascript unpredictability
with variables. For small systems, it may not be that big of a deal.

However, the focus is to know what we are dealing with when looking
at a thousand lines of code. We want to know that if we declare
duck, it is really a duck and not something else that
overwrote it only to find out that it's a giraffe.

### NestJS

The NestJS framework is used in this stack is being used to serve the content and interface with the AWS ecosystem. The framework is setup as a microservice and handles all the HTTP Verb requests sent to the API Gateway.

This rest service contains a Swagger OpenSpec 3.0 specification endpoint when hitting the api-json endpoint.

Locally, the NestJS application will boot up using the default approach, however, on the AWS environment, it will bootstrap using the ExpressAdapter utilizing aws-serverless-express and passing the loaded application to the aws lambda-handler.
The determination of which to use is configured through the run.sh script.

### GraphQL 

To get an idea of the exposed endpoints available:
```aidl
http://localhost:3000/inventory/graphql
```

For a detailed walk through of NestJS, see the readme file in the opalach folder for documentation.

### AWS API Gateway

The API Gateway is exposed as an internal endpoint which is configured as a proxy passthrough.
Since this is a rest-api, it also serves content. Note that this endpoint is only available on the real AWS environment.
This makes the endpoint callable and available to the public.

The endpoint is instrumented in the infra.yaml stack.

### AWS Lambda

The NestJS application sits inside an exposed AWS Lambda function.
The function is responsible for interfacing with all the other AWS native services.
The NestJS is able to interact with these services through the use of environment variables
injected onto the runtime application. This also happens through the use of build deployment scripts.

NestJS exposes endpoints through an annotation based approach. This means there is no actual
graphql files, instead, those are generated using TypeScript decorators.

NestJS also exposes an upload endpoint for file purposes. 

### DynamoDB

The AWS Service is used to house NoSQL data.
The implementation attempts to apply the advanced single-table pattern for data access.
It makes use of composite sorting keys and primary keys.
The combination of these allow for crud operations while supporting the ability to store multiple entities in a single table.

# Architecture

The goal of this implementation is to create a clean, maintainable and robust application
that can scale infinitely while having minimal downtime and be HA compliant.

## Serverless

### Highly Scalable, Available and Redundant
With Minimal Administration, this is the intention of using serverless architecture. Namely, API Gateway,
Lambda, DynamoDB. Each of these are managed by AWS and can
scale with little to no management.

### Single-Table NoSQL Data Access Approach
The single table pattern makes use of utilizing the Primary Key in combination
with the sorting key. In this implementation, we utilize a job name with an epoch timestamp.
This allows us to make use of querying data by name and dates. Utilizing composite keys,
we can not only search for date and time but also company.

The sorting looks like this:

```aidl
PK: `${name}`
SK: `${timestamp}#${company}`
```

The table stores all types of entities utilizing the combination fo PK and SK to create uniqueness.

This implies that a unique record will consist of the warehouse, inventory or product associated with the record.
This allows the ability to traverse multiple timelines within a single table without
relying on GSI or LSI. That said, those could also be added to support other queries.

The advantage of this approach is if we wanted to introduce a new entity, we are able to do so
without adding a new table. This means we can have a one-stop-shop for our data storage.

### Frameworks

The cloud community is very divded on whether we should be using framework or not. At the end of the day,
I'm usually not the one who makes that call...this means I need to know both ways to meet deadlines.
For a reference implementation that deliberately avoids frameworks, see the event-handler project.
This was built with home-grown frameworks that accomplish a similar approach.

#### The argument for them:

Using a framework like NestJS is awesome in my opinion. It is an excellent way to
use an ecosystem of tools and utilities that take care of many concerns the average developer
doesn't have to think or know about. Frameworks deal with challenging problems
that many developers take for granted. While frameworks can bloat your lambda function
which is especially true for node, aws provides lambda layers. This implementation
utilizes those to solve a developers typical set of issues with NestJS sizes.

This will give you a read out of each npm library and what consumes it.

### AWS SDK

This implementation makes use of AWS SDK V3. This is a major, and I mean, MAJOR
improvement in many ways to importing everything as * into your application.
As a fun test you can prove to yourself how much space it takes up, run your
app with the import * as AWS from 'aws-sdk'.

The main advantage of v3 is that we can have more granular control over what
services we want to integrate with and deal with. Additionally, the
implementation of these is clean and uses the command pattern approach.
That means interacting with each service essentially follows the same pattern...
for the most part. This brought the storage constraints down to 1/4 the original size.

To reduce build time and create a consistent runtime environment similar to docker,
this implementation makes use of aws lambda layers.

### AWS SAM Templates

The following templates exist in the application:
* infra.yaml
* layer.yaml
* handler.yaml

### The reason for the separation of templates is as follows:

In order to prevent accidental deletions of resources that do not change over time and
to increase over all build time, I wanted to separate out the infrastructure
from the application code. If you think about it, we don't really need to change
a user dynamoDB table that often when compared to an API Gateway or Lambda function.
The same holds true of SNS or SQS. Once these integrations are completed, generally speaking,
they don't really change much. That's where the infra stack comes into play.

### infra.yaml

The infra stack is a collection of AWS Resources that seldom change once they're stood up.
This is pretty much a one and done. We don't want to build a dyanmodb table on every
deployment nor do we want that as a deployment step in our process.

Deployments are expensive and we want to make use of those seconds because over
a year they add up to days.

### handler.yaml

This template consist of the changing resources and is the main template. This contains the API Gateway, Lambda and Role appropriate
for the lambda function to carry out its execution.

### Convention Over Configuration

#### Stack Naming Convention
The naming pattern for the stacks following the scheme:

````aidl
${organization}-${applicationType}-${environment}-${AWS resourceType}
````

where:

* organization - represents the company.
* applicationType - represents a department or application type.
* environment - represents the environment that the function is targeted for.
* resourceType - represents what aws service it is.

Here is an example:

A lambda function will have the following stack-name:
```aidl
acme-financeApp-dev-lambda
```

The naming convention is chosen to clearly convey what the intention of this lambda function is.
It also convey's where it belongs, what environment it uses and what type of aws service it represents.

### Application Organization

If you are familiar with NestJS, this is one of the general concerns
it addresses as an opinionated framework. I agree with most
of these opinions given my general background as a java developer.

In short, this is a pod-style layout. Each entity or component
of the system contains controllers, services, models and
test cases.

For my example, you can find the graphql nestjs code here:

GraphQL
```aidl
opalach
        |- src
            |- inventory
                - inventory.entity.ts
                - inventory.model.ts
                - inventory.resolver.ts
                - inventory.module.ts
                - inventory.ts
                - inventory.service
```
By naming convention of each extension, it's clear
that each file is responsible for the overall behavior
while decoupling each from each other.

#### Entity VS Model
Entities represent dynamoDB entities while Models represent consuming contract definitions.


### Common
```aidl
opalach
        |- common
            |- dyanomdb-util
             - transform-util
             - constants
```

In addition, general utilities that are used across
components have been abstracted to a common directory
For this application, since we are utilizing the aws
ecosystem with AWS SDK V3, this folder is dedicated
to common functions and wrappers needed across the app.

These are developed utilizing abstraction and providing
an additional layer to avoid the intricacies of using
the sdk client libraries. Also, it handles and deals
with the pk and sk formation.


# Business Function

This is a sample dashboard management application for overlooking warehouses. 
This back-end supports graphql operations and an upload endpoint to deal with 
file handling.

To see the application entirely in action goto here:
- http://intllpnt-iapps-ucase-dev-infra-damarabucket-k8405x8uoi20.s3-website-us-east-1.amazonaws.com/upload

## Application: Opalach

The back-end application code name is Opalach and it is responsible for consuming api requests utilizing
graphql on aws serverless technology.

# System Design

The system architecture and design is exposed as the following two systems.

![System Design](https://github.com/agentVargas2012R/inventory-case-study/blob/master/system.png)
As you might expect, this is a traditional AWS microservice.

If we wanted to extend the systems to others internal/external,
other systems could subscribe to an SNS topic or could integrate with
EventBridge to receive incoming events. This allows us to follow 
the fire-and-forget design pattern.

Doing so decouples the microservices from one another.
Also, we can have multiple consumers receive the same event
without changing code. They would simply subscribe to our topic.

### File Upload

I choose to go with a traditional file upload approach rather than graphql 
because it is alot more straightforward in NestJS. File Uploads. When the 
file is received on the aws lambda function, it is converted from csv to json 
and ultimately to dynamoDB json utilizes parses and frameworks to perform this.

The end goal of this is to create dynamodb unique records utilizing the advanced
single table access pattern. 

#### Note - sorting keys start with '#' symbols. 
Querying data becomes more straight forward when doing so becuase we can perform
```javascript
     let dynamoDBJson = await this.dynamoDBUtil.query("product", "#"); 
```

This returns all products without the use of scans.

# Damara - The Front-End System (React-Typescript)

#### This implementation is built with the following  
* AWS S3 buckets
* TypeScript
* ReactJS
* React-Bootstrap
* Material Design
* GraphQL Request

### Running The Front-End App
1. Navigate the project structure and locate the lambda-handler folder:

```aidl
root
    | - damara
    | - scripts
```

2. Run the installation command:

```aidl
npm install
```

3. Run Live-Reload:
```aidl
    npm start 
```

### 2.) Deploying the Application
1. Assume role/user

2. Navigate to the damara directory and run
```aidl
 npm run build
```

3. Navigate to the scripts directory and run
```aidl
 copy.bat
```



# License

This implementation is a reference app. Its sole purpose is to demo
how you could go about doing so. 

### Author
Michael Vargas
