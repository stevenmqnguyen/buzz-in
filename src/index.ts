import VoiceResponse from 'twilio/lib/twiml/VoiceResponse';

export interface Env {}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		let twiml = new VoiceResponse();

		twiml.say('Buzzing in');

		twiml.play({
			digits: 'ww9w9',
		});

		return new Response(twiml.toString(), { headers: { 'Content-Type': 'application/xml' } });
	},
};
