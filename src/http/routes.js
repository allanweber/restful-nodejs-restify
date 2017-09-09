const db = require('../services/mysql');

const routes = (server) => {
    server.get('category', async (req, res, next) => {
        try {
            res.send(
                await db.categories().all()
            );
        } catch (error) {
            res.send(error);
        }
        next();
    });
    server.post('category', async (req, res, next) => {
        const { name } = req.params; // Object destructuring
        try {
            res.send(
                await db.categories().save(name)
            );
        } catch (error) {
            res.send(error);
        }
        next();
    });
    server.put('category', async (req, res, next) => {
        const { id, name } = req.params; // Object destructuring
        try {
            res.send(
                await db.categories().update(id, name)
            );
        } catch (error) {
            res.send(error);
        }
        next();
    });
    server.del('category', async (req, res, next) => {
        const { id } = req.params; // Object destructuring
        try {
            res.send(
                await db.categories().del(id)
            );
        } catch (error) {
            res.send(error);
        }
        next();
    });

    server.get('/', (req, res, next) => {
        res.send('Enjoy node');
        next(); // Sempre deve ser executado no restify para finalizar o processo da rota, se não a resposta nunca chega.
    });
}

module.exports = routes;
