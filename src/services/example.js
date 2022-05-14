// let url = 'https://jsonplaceholder.typicode.com/posts/',
//     data = {username: 'example'};

// fetch(url, {                                                //url по которому будет запрос
//     method: 'POST',                                         //вид запроса (GET, PUT, итд)
//     body: JSON.stringify(data),                             //тело запроса
//     headers: {                                              //заголовки необходимые при запросе
//         'Content-Type':'application/json'
//     }
// })
//     .then((response) => response.json())                    //декодирует ответ в формате JSON
//     .then((myJson) => console.log('Success', myJson))       //возвратит объект
//     .catch((error) => console.log('Error', error));         //возвратит функцию в случае ошибки


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const getResource = async (url) => {                              //функция для получения запроса по url
//     const res = await fetch(url),                                 //fetch без options это обычный GET запрос
//           some = await res.json();                                //перем. содержит ответ в формате JSON
//     return some;
// };

// getResource('https://jsonplaceholder.typicode.com/posts/1')
//     .then((res) => console.log('Success', res))                   //возвратит объект
//     .catch((error) => console.log('Error', error));               //возвратит функцию в случае ошибки

// чтобы код выполнился, функцию getResource превращаем в асинхронную т.к. fetch - асинхронная ф-ия
// перед fetch(url), res.json() пишем await, чтобы наша ф-ия дождалась результата


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



const getResource = async (url) => {                              //функция для получения запроса по url
    const res = await fetch(url);                                 //fetch без options это обычный GET запрос

    if (!res.ok) {                                                //метод ОК возвращает true если код ответа [200...299]
        throw new Error(`Could not fetch ${url}, 
        status: ${res.status}`);                                  //создаем сообщение об ошибке
    }
    const some = await res.json();                                //перем. содержит ответ в формате JSON
    return some;
};

getResource('https://jsonplaceholder.typicode.com/posts/1')
    .then((res) => console.log('Success', res))                   //возвратит объект
    .catch((error) => console.log('Error', error));               //возвратит функцию в случае ошибки