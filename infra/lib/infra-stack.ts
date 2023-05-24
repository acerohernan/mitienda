import * as cdk from "aws-cdk-lib";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as iam from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";
import { readFileSync } from "fs";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    /* First, create the bucket */
    /* new s3.Bucket(this, "mitienda-tenant-images-bucket", {
      bucketName: "mitienda-tenant-images-bucket",
      publicReadAccess: true,
    }); */

    /* Getting the default vpc */
    const vpc = ec2.Vpc.fromLookup(this, "vpc", {
      isDefault: true,
    });

    /* Creating the security group for the EC2 Instance */
    const webServerSG = new ec2.SecurityGroup(this, "webserver-sg", {
      vpc,
      allowAllOutbound: true,
    });

    webServerSG.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(22),
      "allow SSH access from anywhere"
    );

    webServerSG.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(80),
      "allow HTTP trafic form anywhere"
    );

    webServerSG.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(443),
      "allow HTTPS trafic from anywhere"
    );

    /* Create a role for the instance */
    const webServerRole = new iam.Role(this, "webserver-role", {
      assumedBy: new iam.ServicePrincipal("ec2.amazonaws.com"),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName("AmazonS3ReadOnlyAccess"),
      ],
    });

    /* Create the instance */
    const ec2Instance = new ec2.Instance(this, "ec2-instance", {
      vpc,
      role: webServerRole,
      securityGroup: webServerSG,
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.BURSTABLE2,
        ec2.InstanceSize.MICRO
      ),
      machineImage: new ec2.AmazonLinuxImage({
        generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2,
      }),
      keyName: "mitienda-key-pair",
    });

    const userDataScript = readFileSync("./lib/user-data.sh", "utf8");

    ec2Instance.addUserData(userDataScript);
  }
}
