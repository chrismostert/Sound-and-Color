import { json } from '@sveltejs/kit';
import { get_spotify_token } from '$lib/auth';

const PLAYLIST_INFO_ENDPOINT = `https://api.spotify.com/v1/playlists`;

export async function GET({ params, fetch, setHeaders }) {
	setHeaders({
		'Cache-Control': 'max-age=0, s-maxage=86400'
	});

	const token = await get_spotify_token();
	const { name, description, owner } = await fetch(
		`${PLAYLIST_INFO_ENDPOINT}/${params.playlist_id}?fields=name,description,owner`,
		{
			headers: {
				Authorization: `Bearer ${token.access_token}`
			}
		}
	).then((res) => res.json());

	return json({
		name,
		description,
		owner: owner.displayname || owner.id
	});
}
