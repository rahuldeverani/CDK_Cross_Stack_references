#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { Cdk19Stack } from '../lib/cdk19-stack';

const app = new cdk.App();
new Cdk19Stack(app, 'Cdk19Stack');
