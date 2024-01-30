/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import VoiceResponse from 'twilio/lib/twiml/VoiceResponse';

export interface Env {
	PUSHOVER_APP_TOKEN: string;
	PUSHOVER_USER_TOKEN: string;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		let twiml = new VoiceResponse();

		twiml.say('Buzzing in');

		twiml.play({
			digits: 'ww9w9',
		});

		const pushover_params = {
			token: env.PUSHOVER_APP_TOKEN,
			user: env.PUSHOVER_USER_TOKEN,
			title: 'Buzz-In',
			message: 'Somebody buzzed in at the gate!',
		};

		try {
			const response = await fetch('https://api.pushover.net/1/messages.json', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(pushover_params),
			});
		} catch (error) {
			console.log('Error:', error);
		}

		return new Response(twiml.toString(), { headers: { 'Content-Type': 'application/xml' } });
	},
};
