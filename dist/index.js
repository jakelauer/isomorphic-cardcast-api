"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("isomorphic_fetch");
class CardCastApi {
    static paramsToQuery(params) {
        const kvps = Object.keys(params).map(k => `${k}=${params[k]}`).join("&");
        return `?${kvps}`;
    }
    static doGet(url, params) {
        const query = params
            ? this.paramsToQuery(params)
            : "";
        return fetch(url + query)
            .then(r => r.json());
    }
    static buildUrl(path) {
        return `https://api.cardcastgame.com${path}`;
    }
    static searchDecks(params) {
        const url = this.buildUrl(`/decks/`);
        return this.doGet(url, params);
    }
    static getDeck(deckId) {
        const url = this.buildUrl(`/decks/${deckId}`);
        return this.doGet(url);
    }
    static getDeckCards(deckId) {
        return __awaiter(this, void 0, void 0, function* () {
            const gets = [
                this.getDeckCalls(deckId),
                this.getDeckResponses(deckId)
            ];
            const results = yield Promise.all(gets);
            return {
                calls: results[0],
                responses: results[1]
            };
        });
    }
    static getDeckCalls(deckId) {
        const url = this.buildUrl(`/decks/${deckId}/calls`);
        return this.doGet(url);
    }
    static getDeckResponses(deckId) {
        const url = this.buildUrl(`/decks/${deckId}/responses`);
        return this.doGet(url);
    }
}
exports.CardCastApi = CardCastApi;
