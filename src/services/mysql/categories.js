
const categories = deps => {
    return {
        all: () => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps;

                connection.query('SELECT * FROM CATEGORY', (error, results) => {
                    if (error) {
                        errorHandler(error, 'Falha ao listar as categorias', reject);
                        return false;
                    }
                    resolve({ pagination: { page: 1, length: results.length }, categories: results });
                });
            });
        },
        save: (name) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps;

                connection.query('INSERT INTO CATEGORY (Name) VALUES (?)', [name], (error, results) => {
                    if (error) {
                        errorHandler(error, `Falha ao salvar a categoria ${name}`, reject);
                        return false;
                    }
                    resolve({ category: { name, id: results.insertId } });
                });
            });
        },
        update: (id, name) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps;

                connection.query('UPDATE CATEGORY SET Name = ? WHERE Id = ?', [name, id], (error, results) => {
                    if (error || !results.affectedRows) {
                        errorHandler(error, `Falha ao atualizar a categoria ${name}`, reject);
                        return false;
                    }
                    resolve({ category: { name, id }, affectedRows: results.affectedRows });
                });
            });
        },
        del: (id) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps;

                connection.query('DELETE FROM CATEGORY WHERE Id = ?', [id], (error, results) => {
                    if (error || !results.affectedRows) {
                        errorHandler(error, `Falha ao deletar a categoria de Id ${id}`, reject);
                        return false;
                    }
                    resolve({ message: 'Categoria removida com sucesso.', affectedRows: results.affectedRows });
                });
            });
        }
    };
}

module.exports = categories;
