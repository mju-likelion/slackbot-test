import { App, AwsLambdaReceiver } from '@slack/bolt';
import { AwsCallback, AwsEvent } from "@slack/bolt/dist/receivers/AwsLambdaReceiver";
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.SLACK_SIGNING_SECRET) {
    throw Error("some error")
}

const awsLambdaReceiver = new AwsLambdaReceiver({
    signingSecret: process.env.SLACK_SIGNING_SECRET,
});

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    receiver: awsLambdaReceiver,
});

// 채널에 익명으로 게시
app.command('/test', async ({ command, ack, say }) => {
    await ack();
    await say(`${command.text}`);
});

app.message('s', async ({ message, say }) => {
    console.log("message - deploy test");
    // say() sends a message to the channel where the event was triggered
    await say(`Hey there <@${message.user}>!`);
});

export const handler = async (event: AwsEvent, context: any, callback: AwsCallback) => {
    const handle = await awsLambdaReceiver.start();
    return handle (event, context, callback);
}
console.log("deploy test");

