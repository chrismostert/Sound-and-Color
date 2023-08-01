import { json } from '@sveltejs/kit';
import { get_spotify_token } from '$lib/auth';
import colorthief from 'colorthief';

const PLAYLIST_ITEM_ENDPOINT = `https://api.spotify.com/v1/playlists`;
const UNDEFINED_ART_COLOR = [197, 197, 197];

export async function GET({ params, fetch, setHeaders }) {
	setHeaders({
		'Cache-Control': 'max-age=0, s-maxage=86400'
	});

	const token = await get_spotify_token();
	const response = await fetch(
		`${PLAYLIST_ITEM_ENDPOINT}/${params.playlist_id}/tracks?fields=total,items(track(album(images,name),name,artists(name)))&limit=50&offset=${params.offset}`,
		{
			headers: {
				Authorization: `Bearer ${token.access_token}`
			}
		}
	).then((res) => res.json());

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

	return json({
		total: response.total,
		colors: res
	});
}
