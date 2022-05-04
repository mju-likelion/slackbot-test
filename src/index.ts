import { App } from '@slack/bolt';
import dotenv from 'dotenv';

dotenv.config();
const port = 3000;

if (!process.env.SLACK_SIGNING_SECRET) {
    throw Error("some error")
}

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
});

app.command('/test', async ({ command, say }) => {
    console.log("command");
    await say(`${command.text}`);
});

app.message('a', async ({ message, say }) => {
    console.log("message");
    // say() sends a message to the channel where the event was triggered
    await say(`Hey there <@${message.user}>!`);
});

(async () => {
    await app.start(port);
    console.log('⚡️ src dev');
})();


