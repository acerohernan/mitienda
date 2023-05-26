import * as cdk from "aws-cdk-lib";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as iam from "aws-cdk-lib/aws-iam";
import * as route53 from "aws-cdk-lib/aws-route53";
import { Construct } from "constructs";
import { readFileSync } from "fs";
import path = require("path");

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    /* Create the bucket for the images */
    /*    const s3Bucket = new s3.Bucket(this, "mitienda-bucket", {
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

    const dockerConfig = ec2.InitFile.fromAsset(
      "/app/docker-compose.yml",
      path.resolve(__dirname, "..", "resources", "docker-compose.yml"),
      {}
    );

    const envFile = ec2.InitFile.fromAsset(
      "/app/docker.env",
      path.resolve(__dirname, "..", "resources", "docker.env")
    );

    const nginxConfig = ec2.InitFile.fromAsset(
      "/app/nginx.conf",
      path.resolve(__dirname, "..", "resources", "nginx.conf")
    );

    /* Create init configuratin instance */
    const init = ec2.CloudFormationInit.fromElements(
      dockerConfig,
      envFile,
      nginxConfig
    );

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
      keyName: "ubuntu-key-pair",
      init,
    });

    const userDataScript = readFileSync(
      path.resolve(__dirname, "..", "resources", "user-data.sh"),
      "utf8"
    );

    ec2Instance.addUserData(userDataScript);

    /* Create the instance's elastic ip address */
    const elasticIP = new ec2.CfnEIP(this, "ec2-instance-ip");

    new ec2.CfnEIPAssociation(this, "ec2-ip-association", {
      eip: elasticIP.ref,
      instanceId: ec2Instance.instanceId,
    });

    /* Get the hosted zone for "station.lat" */
    const hostedZone = route53.HostedZone.fromLookup(this, "ec2-hosted-zone", {
      domainName: "station.lat",
    });

    /* Add an A" Record with the actual elastic ip address of the instance */
    new route53.ARecord(this, "ARecord", {
      zone: hostedZone,
      target: route53.RecordTarget.fromIpAddresses(elasticIP.ref),
      recordName: "api-mitienda.station.lat",
    });
  }
}
