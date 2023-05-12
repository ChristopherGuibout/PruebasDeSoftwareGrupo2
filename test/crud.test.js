//Chai
var chai = require('chai');
var assert = chai.assert;

var expect = chai.expect;
const chaiHttp = require('chai-http');

const app = require('../server');

const Book = require('../models/book.js');

chai.should();
chai.use(chaiHttp);

//Testing
//Mocha

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

let libros = [{
        title: "a",
        author: "a",
        published_date: Date.now(),
        state: "a",
        avail: "a"
    },
    {
        title: "let libro = 1",
        author: "SELECT * FROM data",
        published_date: Date.now(),
        state: "a",
        avail: "a"
    },
    {
        title: "123%&bbb bbbb",
        author: "123aa%$bbbb bbb",
        published_date: Date.now(),
        state: "a",
        avail: "a"
    },
    {
        title: "Jurassic Park",
        author: "Lucas Film",
        published_date: Date.now(),
        state: "a",
        avail: "a"
    },
    {
        title: "0123456789",
        author: "0123456789",
        published_date: Date.now(),
        state: "a",
        avail: "a"
        
    },
    {
        title: "0123dasoidaodb456789",
        author: "0123dasoidaodb456789",
        published_date: Date.now(),
        state: "a",
        avail: "a"
    }
]

describe('Agregar libros',() =>{
    it("Deberia crear libros", () => {
        const promises = libros.map((libro) =>{
            return chai.request('http://localhost:3000')
            .post('/books')
            .send(libro)
            .then((res) => {
                expect(res.status).to.eq(200);
            });
        });
        Promise.all(promises).then(() => {
            done();
        }).catch((err) => {
            done(err);
        });
    });
});

describe('Revisar Elementos', () => {
    it('Deberia mostrar la lista de libros', () =>{
        chai.request('http://localhost:3000').get('/books/data').end((err,res) => {
            expect(res.status).to.eq(200);
            let i = 0
            for (libro of res.body){
                i++;
            }
        });
        }
    )
});


describe('Modificar Elementos', () => {
    it('Deberia modificarse un elemento', async () => {
      // Create a new book
      let newBook = await Book.create({
        title: "Modificar",
        author: "mod",
        published_date: Date.now(),
        state: "modif",
        avail: "mongas"
      });
      
      // Update the book
      let res = await chai.request('http://localhost:3000')
        .put('/books/' + newBook.id.toString())
        .send({
          title: newBook.title,
          author: "DDRaceNetwork",
          state: newBook.state,
          avail: newBook.avail,
        });
        console.log(res.status);
      // Check response status
      expect(res).to.have.status(200);
    });
  });
  
  
  
  

describe('Borrar libros',() =>{
    it('Debería borrar', () => {
        Book.create({
            title: "Amongus",
            author: "amogus",
            published_date: Date.now(),
            state: "moggy",
            avail: "sus"
                }).then(newBook => {chai.request('http://localhost:3000').delete('/books/'+newBook.id.toString()).end((err,res) => {
                    expect(res.status).to.eq(200);
                    })})    
        }
    ) 
});