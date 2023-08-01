import { json } from '@sveltejs/kit';
import { get_spotify_token } from '$lib/auth';
import colorthief from 'colorthief';

const PLAYLIST_ITEM_ENDPOINT = `https://api.spotify.com/v1/playlists`;
// Returned when for some reason the album art for a track can not be fetched
const UNDEFINED_ART_COLOR = [197, 197, 197];

export async function GET({ params, fetch, setHeaders }) {
	// Cache the response so other people fetching the same playlist won't hammer the Spotify servers
	setHeaders({
		'Cache-Control': 'max-age=0, s-maxage=86400'
	});

	// Token is needed for authentication with the Spotify API
	const token = await get_spotify_token();

	// Main logic, if an unknown error occurs it is caught and returned as a 500 status code
	try {
		// Fetch the track information from the spotify API using the authentication token
		let response = await fetch(
			`${PLAYLIST_ITEM_ENDPOINT}/${params.playlist_id}/tracks?fields=total,items(track(album(images,name),name,artists(name)))&limit=50&offset=${params.offset}`,
			{
				headers: {
					Authorization: `Bearer ${token.access_token}`
				}
			}
		);

		// Check the status as returned by Spotify and fetch response as JSON
		const status = response.status;
		response = await response.json();

		// If not succefull, this API echoes the error as given by the Spotify web API
		if (status != 200) {
			return json({ message: response?.error?.message }, { status });
		}

		// If track info is returned, then we loop over all tracks and asynchronously fetch the dominant
		// colors using colorthief
		const res = await Promise.all(
			response.items.map(async (item) => {
				const images = item?.track?.album?.images;
				if (!images || images.length == 0) {
					return UNDEFINED_ART_COLOR;
				}

				const image_url = images[0]?.url;
				if (!image_url) {
					return UNDEFINED_ART_COLOR;
				}

				return await colorthief.getColor(image_url);
			})
		);

		// Return the final result
		return json({
			total: response.total,
			colors: res
		});
	} catch (e) {
		// Some uncaught error, is returned as a generic 500 status code
		return json(
			{
				message: 'Internal server error'
			},
			{ status: 500 }
		);
	}
}
