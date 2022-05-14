export default class GotService {
    constructor() {
        this._apiBase = "https://www.anapioficeandfire.com/api/";     //нижнее подчеркивание означает статичные данные котор. нельзя трогать
    this._transformCharacter = this._transformCharacter.bind(this);
    }
    getResource = async (url) => {                                          //метод для получения запроса по url
        const res = await fetch(`${this._apiBase}${url}`);                                 //fetch без options это обычный GET запрос

        if (!res.ok) {                                                //метод ОК возвращает true если код ответа [200...299]
            throw new Error(`Could not fetch ${url}, 
            status: ${res.status}`);                                  //создаем сообщение об ошибке
        }
        return await res.json();                                      //перем. содержит ответ в формате JSON
    }
    getAllCharacters = async () => {                                              //возвратит всех персонажей игры престолов
        const res = await this.getResource(`/characters?page=5&pageSize=10`);
        return res.map(this._transformCharacter);
    }                                                                 //?page=5&pageSize=10 в строке вернет 10 персонажей начиная со страницы 5
    getCharacter = async (id) => {                                                //возвратит персонажа по id
        const character = await this.getResource(`/characters/${id}`);
        return this._transformCharacter(character);
    }                                                                 //${id} в строке вернет персонажа по id
    getAllHouses = async () =>{                                                
        const res = await this.getResource(`/houses`);
        return res.map(this._transformHouse);
    }             
    getHouse = async (id) => {                                                
        const house = await this.getResource(`/houses/${id}`);
        return this._transformHouse(house);
    }                                                      
    getAllBooks = async () => {                                                
        const res = await this.getResource(`/books`);
        return res.map(this._transformBook);
    }             
    getBook = async (id) => {                                                
        const book = await this.getResource(`/books/${id}`);
        return this._transformBook(book);
    }  
    _transformCharacter = (char) => {
        this._noSpace(char);
        
        return {
            id: char.url.slice(char.url.indexOf('/characters/') + 12),
            name: char.name,
            gender: char.gender,
            born: char.born,
            died: char.died,
            culture: char.culture
        }
    }
    _transformHouse = (house) => {
        this._noSpace(house);
        return {
            id: house.url.slice(house.url.indexOf('/houses/') + 8),
            name: house.name,
            region: house.region,
            words: house.words,
            titles: house.titles,
        }
    }
    _transformBook = (book) => {
        this._noSpace(book);
        return {
            id: book.url.slice(book.url.indexOf('/books/') + 7),
            name: book.name,
            numberOfPages: book.numberOfPages,
            country: book.country,
            released: book.released,
            authors: book.authors
        }
    }
    _noSpace = (item) => {
        for (var key in item) {
            if (item[key] === '') {item[key] = 'unknown data'}
          }
    }
}