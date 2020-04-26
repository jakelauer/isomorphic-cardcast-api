import "isomorphic_fetch";

export type DeckCategory = "books" | "community" | "gaming" | "movies" | "music" | "sports" | "technology" | "television" | "translation" | "other" | "random";

interface IDeckParams
{
	category: undefined | DeckCategory;
	direction: "asc" | "desc";
	limit: number;
	nsfw: boolean;
	offset: number;
	search: string;
	sort: "rating" | "name" | "size" | "created_at";
}

interface ICard
{
	id: string;
	text: string[];
	created_at: string;
	nsfw: boolean;
}

interface IDeckBase
{
	name: string;
	code: string;
	created_at: string;
	updated_at: string;
	category: DeckCategory;
	external_copyright: boolean;
	call_count: string;
	response_count: string;
	author: {
		id: string;
		username: string;
	};
	rating: string;
}

interface IDeck extends IDeckBase
{
	description: string;
	unlisted: boolean;
	copyright_holder_url: string | null;
}

interface IDeckSearchResult extends IDeckBase
{
	has_nsfw_cards: boolean;
	sample_calls: ICard[];
	sample_responses: ICard[];
}

interface IDeckSearchResults
{
	total: number;
	results: {
		count: number;
		offset: number;
		data: IDeckSearchResult[]
	}
}

interface ICallResponseSet
{
	calls: ICard[];
	responses: ICard[];
}

export class Index
{
	private static paramsToQuery(params: any)
	{
		const kvps = Object.keys(params).map(k => `${k}=${params[k]}`).join("&");
		return `?${kvps}`;
	}

	public static doGet<T>(url: string, params?: any)
	{
		const query = params
			? this.paramsToQuery(params)
			: "";

		return fetch(url + query)
			.then(r => r.json()) as Promise<T>;
	}

	private static buildUrl(path: string)
	{
		return `https://api.cardcastgame.com${path}`;
	}

	public static searchDecks(params: IDeckParams): Promise<IDeckSearchResults>
	{
		const url = this.buildUrl(`/decks/`);

		return this.doGet(url, params);
	}

	public static getDeck(deckId: string): Promise<IDeck>
	{
		const url = this.buildUrl(`/decks/${deckId}`);

		return this.doGet(url);
	}

	public static async getDeckCards(deckId: string): Promise<ICallResponseSet>
	{
		const gets = [
			this.getDeckCalls(deckId),
			this.getDeckResponses(deckId)
		];

		const results = await Promise.all(gets);

		return {
			calls: results[0],
			responses: results[1]
		};
	}

	public static getDeckCalls(deckId: string): Promise<ICard[]>
	{
		const url = this.buildUrl(`/decks/${deckId}/calls`);

		return this.doGet(url);
	}

	public static getDeckResponses(deckId: string): Promise<ICard[]>
	{
		const url = this.buildUrl(`/decks/${deckId}/responses`);

		return this.doGet(url);
	}
}