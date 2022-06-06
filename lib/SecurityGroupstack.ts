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

import * as iam from 'aws-cdk-lib/aws-iam';
import { Vpc } from 'aws-cdk-lib/aws-ec2';
import * as include from 'aws-cdk-lib/cloudformation-include'

export class SecurityGroupstack extends Stack {

  public readonly secg: ec2.ISecurityGroup; 

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);


    const cfnTemplate = new include.CfnInclude(this, 'Template', {
      templateFile: 'my-template.json',
    });

    const cfnSecurityGroup = cfnTemplate.getResource("InstanceSecurityGroup") as ec2.CfnSecurityGroup
    const sg= ec2.SecurityGroup.fromSecurityGroupId(this, "sa",cfnSecurityGroup.attrGroupId)
     this.secg=sg

  }
}
