import { VITE_SPOTIFY_CLIENT_ID, VITE_SPOTIFY_CLIENT_SECRET } from '$env/static/private';
import { json } from '@sveltejs/kit';

const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

export async function get_spotify_token() {
	const token = await fetch(TOKEN_ENDPOINT, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: new URLSearchParams({
			grant_type: 'client_credentials',
			client_id: VITE_SPOTIFY_CLIENT_ID,
			client_secret: VITE_SPOTIFY_CLIENT_SECRET
		})
	}).then((res) => res.json());
	return token;
}
