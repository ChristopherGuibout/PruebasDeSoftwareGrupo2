//Chai
var chai = require('chai');
var assert = chai.assert;

var expect = chai.expect;
const chaiHttp = require('chai-http');

const app = require('../index.js');

const models = require('../models/index.js');
const User = models.User;

chai.should();
chai.use(chaiHttp);

describe("Entrada de credenciales Registro",()=>{
    it("No deberia registrar el usuario sin contraseña", ()=>{
        chai.request('http://localhost:3000').post('/register').send({name: "abc",email:"abc@gmail.com"}).end((err,res) => {
            expect(res.status).to.eq(400);
        });
    });
    it("No deberia registrar el usuario sin email", ()=>{
        chai.request('http://localhost:3000').post('/register').send({name: "abc",password:"12345678"}).end((err,res) => {
            expect(res.status).to.eq(401);
        });
    });
    it("No deberia registrar el usuario sin nombre", ()=>{
        chai.request('http://localhost:3000').post('/register').send({email:"abc@gmail.com",password:"12345678"}).end((err,res) => {
            expect(res.status).to.eq(401);
        });
    });
    it("Se deberia registrar correctamente el usuario", ()=>{
        chai.request('http://localhost:3000').post('/register').send({name: "abc",email:"abc@gmail.com",password:"12345678"}).end((err,res) => {
            expect(res.status).to.eq(201);
        });
    });
});

describe("Entrada de credenciales Login",()=>{
    it("No deberia loguearse el usuario sin contraseña", ()=>{
        chai.request('http://localhost:3000').post('/login').send({email:"abc@gmail.com"}).end((err,res) => {
            expect(res.status).to.not.eq(201);
        });
    });
    it("No deberia loguearse el usuario sin email", ()=>{
        chai.request('http://localhost:3000').post('/login').send({password:"12345678"}).end((err,res) => {
            expect(res.status).to.not.eq(201);
        });
    });
    it("No deberia loguearse el usuario sin nombre", ()=>{
        chai.request('http://localhost:3000').post('/login').send({email:"1",password:"1"}).end((err,res) => {
            expect(res.status).to.not.eq(201);
        });
    });
    it("Se deberia loguearse correctamente el usuario", ()=>{
        chai.request('http://localhost:3000').post('/login').send({email:"abc@gmail.com",password:"12345678"}).end((err,res) => {
            expect(res.status).to.eq(201);
        });
    });
});