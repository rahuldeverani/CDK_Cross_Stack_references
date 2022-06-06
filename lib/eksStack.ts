import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as subs from 'aws-cdk-lib/aws-sns-subscriptions';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2'
import * as ecs from 'aws-cdk-lib/aws-ecs'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import {FilterPattern, LogGroup, RetentionDays, SubscriptionFilter} from "aws-cdk-lib/aws-logs";
import {LambdaDestination} from "aws-cdk-lib/aws-logs-destinations";
import * as secretsManager from 'aws-cdk-lib/aws-secretsmanager'
import * as amazonmq from 'aws-cdk-lib/aws-amazonmq'
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as eks from 'aws-cdk-lib/aws-eks'
import * as cdk from 'aws-cdk-lib'
import * as cr from 'aws-cdk-lib/custom-resources'
import * as SecurityGroupstack from './SecurityGroupstack'
import * as iam from 'aws-cdk-lib/aws-iam';

interface eksStackProps extends cdk.StackProps {
    sg: ec2.ISecurityGroup;
  }
  

export class eksStack extends Stack {
  constructor(scope: Construct, id: string,  props: eksStackProps) {
    super(scope, id, props);

 
    const myVpc = ec2.Vpc.fromLookup(this, 'external-vpc', {
      vpcName: 'Rahul11ssss/Cluster/Vpc',
    });

    const cluster =new eks.Cluster(this, 'HelloEKS', {
      version: eks.KubernetesVersion.V1_21,
      vpc: myVpc,
      vpcSubnets: [{ subnetType: ec2.SubnetType.PRIVATE_WITH_NAT }],
      securityGroup:  props.sg
    });

     

  }
}
