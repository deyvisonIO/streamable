import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { resetIngresses } from '@/actions/ingress'
import { env } from '@/env/server.mjs'

export async function POST(req: Request) {
	const WEBHOOK_SECRET = env.CLERK_WEBHOOK_SECRET

	if (!WEBHOOK_SECRET) throw new Error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')

	// Get Headers
	const headerPayload = headers();
	const svix_id = headerPayload.get("svix-id");
	const svix_timestamp = headerPayload.get("svix-timestamp");
	const svix_signature = headerPayload.get("svix-signature");

	// Return Error if headers are empty
	if (!svix_id || !svix_timestamp || !svix_signature) {
		return new Response('Error occured -- no svix headers', {
			status: 400
		})
	}

	// Get Body
	const payload = await req.json();
	const body = JSON.stringify(payload);

	// Create a new svix instance with secret
	const wh = new Webhook(WEBHOOK_SECRET);

	let evt: WebhookEvent;

	try {
		evt = wh.verify(body, {
			"svix-id": svix_id,
			"svix-timestamp": svix_timestamp,
			"svix-signature": svix_signature,
		}) as WebhookEvent
	} catch (err) {
		console.error('Error verifying webhook:', err);
		return new Response('Error occured', {
			status: 400
		})
	}

	// Get the ID and type
	const eventType = evt.type;

	switch (eventType) {
		case 'user.created':
			await db.user.create({
				data: {
					externalUserId: payload.data.id,
					username: payload.data.username,
					imageUrl: payload.data.image_url,
					stream: {
						create: {
							name: `${payload.data.username}'s stream`
						}
					}
				}
			})
			return new Response('User Created!', { status: 200 })
		case 'user.updated':
			const updatedUser = await db.user.update({
				where: {
					externalUserId: payload.data.id,
				},
				data: {
					username: payload.data.username || undefined,
					imageUrl: payload.data.image_url || undefined,
					bio: payload.data.bio || undefined,
				}
			});

			if (!updatedUser) {
				return new Response('User not found!', { status: 404 });
			}
			return new Response('User updated!', { status: 200 })
		case 'user.deleted':
			await resetIngresses(payload.data.id);

			const deletedUser = await db.user.delete({
				where: {
					externalUserId: payload.data.id,
				}
			});
			if(!deletedUser) return new Response('User not found!', { status: 404 });
			return new Response('User Deleted!', {status: 200})
	}

	return new Response('', { status: 200 })
}
