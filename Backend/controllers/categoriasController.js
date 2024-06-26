const db = require('../config/db');

const categoriaController = {

    getCategoria: (req, res) => {
        const { categoria } = req.params
        // console.log(categoria);
        
        if (!categoria) {
            console.error("erro ao enviar categoria.\n Enviado: " + categoria)
            return res.status(400).json({ 
                error: "Campo categoria não identificado! : " + categoria , 
                message: "\n"+ "Categoria diferente da esperada, Categorias aceitas: Casa, Roupa, Games, Maquiagem, Tecnologia, Esporte."
            })
        }
        const query = 'SELECT * FROM produto WHERE categoria = ?'
        db.query(query, [categoria], (err, results) => {
            if (err) {
                console.log({ error: err })
                return res.status(500).json({ error: err })
            }
            console.log("consulta de " + categoria + " realizada com sucesso! Resultasdos encontrados: " + results.length)
            return res.status(200).json({results, tamanho: results.length})
        });

    }
}
module.exports = categoriaController;