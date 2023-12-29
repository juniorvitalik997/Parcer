const cheerio = require('cheerio'); //Парсинг сайтів

const express = require('express'); //Фреймворк для сервера

const axios = require('axios');//Для створення запитів 

const cors = require('cors');//Для надання доступу між (серверами,клієнтами)

const app = express();

const port = 3000;

app.use(cors());

const url = 'https://yavir.fm/';

app.get('/music',(req,res)=>{

    axios.get(url)
    .then(response => {
        let data = [];
        const html = response.data;
        const $ = cheerio.load(html);
        $('audio').each((index,element)=>{
            const src = $(element).attr('src');
            if(src.includes('.mp3')){
                data.push(src)
            }
        }

        )
        console.log(data)
        res.json(data);
    }
    
    )
})

app.listen(port,()=>{
    console.log('server work on port 3000')
})