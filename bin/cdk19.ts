#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { SecurityGroupstack } from '../lib/SecurityGroupstack';
import { eksStack } from '../lib/eksStack';

const envUSA  = { account: '17xxxxxxx', region: 'us-east-1' };
const app = new cdk.App();
const sgstack =new SecurityGroupstack(app, 'sgStack1',{ env: envUSA });
new eksStack(app, 'eksStack1' , {env: envUSA, sg:sgstack.secg})