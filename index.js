const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

//const url = "mongodb+srv://admin:zLb5fiVP7c5PyfG@cluster0.76akt.mongodb.net";
const url = "mongodb+srv://admin:admin@cluster0.qmacg.mongodb.net/";
const dbName = "ocean";

async function main() {
    // Conexão com o Banco de Dados
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection("hero");

    const app = express(); // Aplicação em Express

    // Sinalizo para o Express que o body das requisições estará sempre estruturado em JSON
    app.use(express.json());

    // Endpoint "/"
    app.get("/", function (req, res) {
        res.send("Hello, World!");
    });

    // Endpoint "/oi"
    app.get("/oi", function (req, res) {
        res.send("Olá, mundo!");
    });

    const lista = ["Mulher Maravilha", "Capitã Marvel", "Homem de Ferro"];

    // [GET] "/herois" - Read All (Ler todos os registros)
    app.get("/herois", async function (req, res) {
        const documentos = await collection.find().toArray();

        res.send(documentos);
    });

    // [GET] "/herois/:id" - Read Single (by Id) (Ler um registro pelo ID)
    app.get("/herois/:id", async function (req, res) {
        const id = req.params.id;

        const item = await collection.findOne({ _id: new ObjectId(id) });

        res.send(item);
    });

    // [POST] "/herois" - Create (Criar um registro)
    app.post("/herois", async function (req, res) {
        const item = req.body;

        await collection.insertOne(item);

        res.send(item);
    });

    // [PUT] "/herois/:id" - Update (Atualizar um registro)
    app.put("/herois/:id", async function (req, res) {
        const id = req.params.id;

        const item = req.body;

        await collection.updateOne(
            { _id: new ObjectId(id) },
            {
                $set: item,
            }
        );

        res.send(item);
    });

    // [DELETE] "/herois/:id" - Delete (Remover um registro)
    app.delete("/herois/:id", async function (req, res) {
        const id = req.params.id;

        await collection.deleteOne({ _id: new ObjectId(id) });

        res.send("Item removido com sucesso.");
    });

    app.listen(process.env.PORT || 3000);
}

main();
