export type Entry = {
	date: string; // "mm/dd"
	name: string; // "player name"
	char: string; // char png filename (no extension)
	score: string; // "x-y"
	youtubeVod?: string; // "yt vod url"
	twitchVod?: string; // "tw vod url"
};

// manually edit this data
export const entries: Entry[] = [
	{
		date: '11/24',
		name: 'Hungrybox',
		char: 'Puff',
		score: '30-50',
		youtubeVod: '',
		twitchVod: 'https://www.twitch.tv/videos/2627223891'
	},
	{
		date: '11/21',
		name: 'Cody (friendlies)',
		char: 'Fox',
		score: '21-16',
		youtubeVod: '',
		twitchVod: 'https://www.twitch.tv/videos/2624489249?t=03h22m34s'
	},
	{
		date: '11/21',
		name: 'Mono',
		char: 'Yoshi',
		score: '2-50',
		youtubeVod: 'https://www.youtube.com/watch?v=OCDri4zkj9o',
		twitchVod: 'https://www.twitch.tv/videos/2624353907'
	},
	{
		date: '11/20',
		name: 'Krudo',
		char: 'Sheik',
		score: '24-50',
		youtubeVod: 'https://www.youtube.com/watch?v=PDKKI8_26tI',
		twitchVod: 'https://www.twitch.tv/videos/2623638696'
	},
	{
		date: '11/18',
		name: 'Moky',
		char: 'Fox',
		score: '29-50',
		youtubeVod: 'https://www.youtube.com/watch?v=ly1WcFr7Nq4',
		twitchVod: 'https://www.twitch.tv/videos/2621957420'
	},
	{
		date: '11/18',
		name: 'Moky (reverse mains)',
		char: 'Marth',
		score: '50-26',
		youtubeVod: 'https://www.youtube.com/watch?v=T9v2MrW4-L8',
		twitchVod: 'https://www.twitch.tv/videos/2621957420?t=04h06m49s'
	},
	{
		date: '11/17',
		name: 'KJH',
		char: 'Falco',
		score: '9-50',
		youtubeVod: 'https://www.youtube.com/watch?v=VKbulnKryC0',
		twitchVod: 'https://www.twitch.tv/videos/2621097956'
	},
	{
		date: '11/14',
		name: 'Ludwig',
		char: 'Puff',
		score: '0-100',
		youtubeVod: 'https://www.youtube.com/watch?v=3zFxFTqZ34Y',
		twitchVod: 'https://www.twitch.tv/videos/2618594039'
	},
	{
		date: '11/13',
		name: 'Swift',
		char: 'Pikachu',
		score: '19-50',
		youtubeVod: 'https://www.youtube.com/watch?v=lxO671cBilk',
		twitchVod: 'https://www.twitch.tv/videos/2617792451'
	},
	{
		date: '11/12',
		name: 'SirMeris',
		char: 'Peach',
		score: '8-50',
		youtubeVod: 'https://www.youtube.com/watch?v=hcGZxEDrEVU',
		twitchVod: 'https://www.twitch.tv/videos/2616794276'
	},
	{
		date: '11/11',
		name: 'DarkGenex',
		char: 'Icies',
		score: '5-50',
		youtubeVod: 'https://www.youtube.com/watch?v=aFa9JevcHtU',
		twitchVod: 'https://www.twitch.tv/videos/2615769677'
	},
	{
		date: '11/10',
		name: 'Soonsay',
		char: 'Fox',
		score: '12-50',
		youtubeVod: 'https://www.youtube.com/watch?v=ZDXmUTRU3bQ',
		twitchVod: 'https://www.twitch.tv/videos/2615022948'
	},
	{
		date: '11/07',
		name: 'Bobbybigballz',
		char: 'Falco',
		score: '4-50',
		youtubeVod: 'https://www.youtube.com/watch?v=Xll93Ljt6PY',
		twitchVod: 'https://www.twitch.tv/videos/2612258479'
	},
	{
		date: '10/16',
		name: 'Kevin',
		char: 'Falco',
		score: '1-274',
		youtubeVod: '',
		twitchVod: 'https://www.twitch.tv/videos/2593361548'
	}
];

export const keyFor = (entry: Entry) => `${entry.date}|${entry.name}`;
