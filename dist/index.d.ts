import "isomorphic_fetch";
export declare type DeckCategory = "books" | "community" | "gaming" | "movies" | "music" | "sports" | "technology" | "television" | "translation" | "other" | "random";
interface IDeckParams {
    category: undefined | DeckCategory;
    direction: "asc" | "desc";
    limit: number;
    nsfw: boolean;
    offset: number;
    search: string;
    sort: "rating" | "name" | "size" | "created_at";
}
interface ICard {
    id: string;
    text: string[];
    created_at: string;
    nsfw: boolean;
}
interface IDeckBase {
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
interface IDeck extends IDeckBase {
    description: string;
    unlisted: boolean;
    copyright_holder_url: string | null;
}
interface IDeckSearchResult extends IDeckBase {
    has_nsfw_cards: boolean;
    sample_calls: ICard[];
    sample_responses: ICard[];
}
interface IDeckSearchResults {
    total: number;
    results: {
        count: number;
        offset: number;
        data: IDeckSearchResult[];
    };
}
interface ICallResponseSet {
    calls: ICard[];
    responses: ICard[];
}
export declare class CardCastApi {
    private static paramsToQuery;
    static doGet<T>(url: string, params?: any): Promise<T>;
    private static buildUrl;
    static searchDecks(params: IDeckParams): Promise<IDeckSearchResults>;
    static getDeck(deckId: string): Promise<IDeck>;
    static getDeckCards(deckId: string): Promise<ICallResponseSet>;
    static getDeckCalls(deckId: string): Promise<ICard[]>;
    static getDeckResponses(deckId: string): Promise<ICard[]>;
}
export {};
