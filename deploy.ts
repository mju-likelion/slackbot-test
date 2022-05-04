import { App } from '@slack/bolt';
import dotenv from 'dotenv';

dotenv.config();
const port = 3000;
console.log("1");


if (!process.env.SLACK_SIGNING_SECRET) {
    throw Error("some error")
}

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
});

// 채널에 익명으로 게시
app.command('/test', async ({ command, say }) => {
    await say(`${command.text}`);
});

(async () => {
    await app.start(port);
    console.log('⚡️ Bolt app is running!');
})();
