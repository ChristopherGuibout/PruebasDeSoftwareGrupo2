//Chai
var chai = require('chai');
var assert = chai.assert;

var expect = chai.expect;
const chaiHttp = require('chai-http');

const app = require('../index.js');

const models = require('../models/index.js');
const Book = models.Book;

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
    }
]


let librosinnombre = {
    author: "Autor1",
    published_date: Date.now(),
    state: "Estado1",
    avail: "Avail1"
}

let librosinautor = {
    title : "Titulo2",
    published_date: Date.now(),
    state: "Estado2",
    avail: "Avail2"
}

let librosinestado = {
    title : "Titulo3",
    author: "Autor3",
    published_date: Date.now(),
    avail: "Avail3"
}

let librosinfecha = {
    title : "Titulo6",
    author: "Autor6",
    state: "Estado6",
    avail: "Avail6"
}


let librosinavail = {
    title : "Titulo4",
    author: "Autor4",
    published_date: Date.now(),
    state: "Estado4"
}


let buenlibro = {
    title : "Titulo5",
    author: "Autor5",
    published_date: Date.now(),
    state: "Estado5",
    avail: "Avail5"
}

describe('Agregar libros',() =>{
    it("No deberia crear libros sin titulo", () => {
        const promises = libros.map((libro) =>{
            return chai.request('http://localhost:3000')
            .post('/books')
            .send(librosinnombre)
            .then((res) => {
                expect(res.status).to.not.eq(200);
            });
        });
        Promise.all(promises).then(() => {
            done();
        }).catch((err) => {
            done(err);
        });
    });
    it("No deberia crear libros sin autor", () => {
        const promises = libros.map((libro) =>{
            return chai.request('http://localhost:3000')
            .post('/books')
            .send(librosinautor)
            .then((res) => {
                expect(res.status).to.not.eq(200);
            });
        });
        Promise.all(promises).then(() => {
            done();
        }).catch((err) => {
            done(err);
        });
    });
    it("No deberia crear libros sin estado", () => {
        const promises = libros.map((libro) =>{
            return chai.request('http://localhost:3000')
            .post('/books')
            .send(librosinestado)
            .then((res) => {
                expect(res.status).to.not.eq(200);
            });
        });
        Promise.all(promises).then(() => {
            done();
        }).catch((err) => {
            done(err);
        });
    });
    it("No deberia crear libros sin fecha", () => {
        const promises = libros.map((libro) =>{
            return chai.request('http://localhost:3000')
            .post('/books')
            .send(librosinfecha)
            .then((res) => {
                expect(res.status).to.not.eq(200);
            });
        });
        Promise.all(promises).then(() => {
            done();
        }).catch((err) => {
            done(err);
        });
    });
    it("No deberia crear libros sin avail", () => {
        const promises = libros.map((libro) =>{
            return chai.request('http://localhost:3000')
            .post('/books')
            .send(librosinavail)
            .then((res) => {
                expect(res.status).to.not.eq(200);
            });
        });
        Promise.all(promises).then(() => {
            done();
        }).catch((err) => {
            done(err);
        });
    });
    it("Deberia crear libros", () => {
        const promises = libros.map((libro) =>{
            return chai.request('http://localhost:3000')
            .post('/books')
            .send(buenlibro)
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
        chai.request('http://localhost:3000').get('/books').end((err,res) => {
            expect(res.status).to.eq(200);
        });
        }
    );
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
      chai.request('http://localhost:3000')
        .put('/books/' + newBook.id.toString())
        .send({
          title: newBook.title,
          author: "DDRaceNetwork",
          state: newBook.state,
          avail: newBook.avail,
        }).end((err,res) =>{
            expect(res.status).to.eq(200);
        })
      // Check response status
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
    it('No debería borrar', () => {
        chai.request('http://localhost:3000').delete('/books/-1').end((err,res) => {
                    expect(res.status).to.not.eq(200);            
        })
    }
    );
});
