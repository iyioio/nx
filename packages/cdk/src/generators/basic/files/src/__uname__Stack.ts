import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
// import * as ag from "aws-cdk-lib/aws-apigateway";
// import * as cognito from "aws-cdk-lib/aws-cognito";
// import * as db from "aws-cdk-lib/aws-dynamodb";
// import * as ec2 from 'aws-cdk-lib/aws-ec2';
// import * as efs from 'aws-cdk-lib/aws-efs';
// import * as events from "aws-cdk-lib/aws-events";
// import * as iam from "aws-cdk-lib/aws-iam";
// import * as lambda from "aws-cdk-lib/aws-lambda";
// import * as les from "aws-cdk-lib/aws-lambda-event-sources";
// import * as s3Deployment from 'aws-cdk-lib/aws-s3-deployment';
// import * as rds from "aws-cdk-lib/aws-rds";
// import * as s3 from "aws-cdk-lib/aws-s3";
// import * as secrets from 'aws-cdk-lib/aws-secretsmanager';
// import * as sns from "aws-cdk-lib/aws-sns";
// import * as snsSubs from "aws-cdk-lib/aws-sns-subscriptions";
// import * as sqs from "aws-cdk-lib/aws-sqs";
// import * as targets from "aws-cdk-lib/aws-events-targets";

export class <%- uname %>Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new s3.Bucket(this,'test',{
        removalPolicy:cdk.RemovalPolicy.DESTROY
    })

  }
}
