import { json } from '@sveltejs/kit';
import { get_spotify_token } from '$lib/auth';

const PLAYLIST_INFO_ENDPOINT = `https://api.spotify.com/v1/playlists`;

export async function GET({ params, fetch, setHeaders }) {
	try {
		// Fetch token and use it to get playlist info
		const token = await get_spotify_token();
		let response = await fetch(
			`${PLAYLIST_INFO_ENDPOINT}/${params.playlist_id}?fields=name,description,owner`,
			{
				headers: {
					Authorization: `Bearer ${token.access_token}`
				}
			}
		);

		// Get status of request and echo any error from the Spotify web API
		const status = response?.status;
		response = await response.json();
		if (status != 200) {
			return json({ message: response?.error?.message }, { status });
		}

		// Unpack the response and return
		const { name, description, owner } = response;
		setHeaders({
			'Cache-Control': 'max-age=0, s-maxage=86400'
		});
		return json({
			name,
			description,
			owner: owner.displayname || owner.id
		});
	} catch (e) {
		// On other error, give back 500 code
		return json(
			{
				message: 'Internal server error'
			},
			{ status: 500 }
		);
	}
}
