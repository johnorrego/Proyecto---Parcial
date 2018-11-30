
const dbConnection= require('../../config/dbConnection');
const conn= dbConnection();
const controller= {};


controller.list= (req,res)=>{
conn.query('SELECT * FROM news', (err, result)=>{
    if(err){
        res.json(err);
    }
res.render ('news', {
    news:result

});
});
}

controller.update = (req, res) => {
    const { id_news } = req.params;

    conn.query('SELECT * FROM news where id_news = ?',
          [id_news]
        , (err, result) => {
            res.render ('actualizar', {
                news:result[0]           
            });
            console.log(result);
        });
        
};

controller.save = (req,res) =>{
    const { id_news } = req.params;
    const nuevosDatos = req.body;
    conn.query('UPDATE news set ? where id_news = ?', [nuevosDatos, id_news], (err, result) => {
           res.redirect('/news');
        });
};

controller.add = (req,res)=>{
    const {title,news} =req.body;
    
        conn.query('INSERT INTO news SET ?',
    {
        title,
        news
    }, (err,result)=>{
        res.redirect('/news');
    });
    };

    controller.eliminar = (req,res)=>{
        const {title,news} =req.body;

        const id=req.params.id_noticia;
            conn.query('DELETE from news where id_news = ?',
       
            id
        
        , (err,result)=>{
            res.redirect('/news');
        });
        };


module.exports= controller;
