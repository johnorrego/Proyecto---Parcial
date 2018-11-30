const dbConnection = require('../../config/dbConnection');
const conn = dbConnection();
const controller ={};


// Controlado de Index
controller.index = (req, res)=>{
var message = '';
res.render('index',{message: message});
};


//Controlador para que el usuario se registre
controller.signup = (req, res)=>{

    message = '';
 const { first_name,last_name,user_name, password } = req.body

 if(req.method == "POST"){

    conn.query( 'INSERT INTO users SET ? ', {
    first_name,
    last_name,
    user_name,
    password
    }  ,(err,result) => {

        message = "Felicitaciones! Su cuenta ha sido creada.";
        res.render('signup',{message: message});
       
        }); 
    } else {
        res.render('signup');
        }
       

};   
 

//Controlador para el Inicio de sesión
controller.login = (req, res)=>{
    var message = '';
    var sess = req.session;
   
    if(req.method == "POST"){
    var post = req.body;
    var name= post.user_name;
    var pass= post.password;
   
    conn.query("SELECT id, first_name, last_name, user_name FROM `users`WHERE `user_name`='"+name+"' and password = '"+pass+"'", (err,result)=>{
    if(result.length){
    sess.userId = result[0].id;
    sess.user = result[0];
    res.redirect('/home/dashboard');
    }
    else{
    message = 'Credenciales incorrectas.';
    res.render('index.ejs',{message: message});
    }
   
    });
    } else {
    res.render('index',{message: message});
    }
   };


   //Controlador para
controller.dashboard = (req, res, next)=>{

    var user = req.session.user,
    userId = req.session.userId;
   
    if(userId == null){
    res.redirect("/login");
    return;
}

conn.query("SELECT * FROM `login_details` WHERE`id`='"+userId+"'",(err,result)=>{
 res.render('dashboard', {user:user});

 });
};

controller.logout = (req, res)=>{

    req.session.destroy((err)=>{
        res.redirect('/login');
    })
};   


controller.ir = (req, res, next)=>{

    var user = req.session.user,
    userId = req.session.userId;
   
    if(userId == null){
    res.redirect("/login");
    return;
    }else{
        conn.query('SELECT * FROM news', (err, result)=>{
            if(err){
                res.json(err);
            }
        res.render ('news', {
            news:result
        
        });
        });
    }
}

    controller.ir_usuario = (req, res, next)=>{

        var user = req.session.user,
        userId = req.session.userId;
       
        if(userId == null){
        res.redirect("/login");
        return;
        }else{
            conn.query('SELECT * FROM users', (err, result)=>{
                if(err){
                    res.json(err);
                }
            res.render ('users', {
                user:result
            
            });
            });
        }


};

controller.ir_moto = (req, res, next)=>{

    var user = req.session.user,
    userId = req.session.userId;
   
    if(userId == null){
    res.redirect("/login");
    return;
    }else{
        conn.query('SELECT * FROM motos', (err, result)=>{
            if(err){
                res.json(err);
            }
        res.render ('motos', {
            user:result
        
        });
        });
    }

};



controller.add = (req,res)=>{
    const {first_name,last_name,user_name, password} =req.body;
    
        conn.query('INSERT INTO users SET ?',
    {
        first_name,last_name,user_name, password
    }, (err,result)=>{
        res.redirect('/users');
    });
    };


    controller.addmoto = (req,res)=>{
        const {modelo,marca,cilindraje} =req.body;
        
            conn.query('INSERT INTO motos SET ?',
        {
            modelo,marca,cilindraje
        }, (err,result)=>{
            console.log('Prueba');
            res.redirect('/motos');
        });
        };

        controller.listM= (req,res)=>{
            conn.query('SELECT * FROM motos', (err, result)=>{
                if(err){
                    res.json(err);
                }
            res.render ('motos', {
                user:result
            
            });
            });
            }



    controller.eliminar_usu = (req,res)=>{
        const {first_name,last_name,user_name, password} =req.body;

        const id=req.params.id_noticia;
            conn.query('DELETE from users where id = ?',
       
            id
        
        , (err,result)=>{
            res.redirect('/users');
        });
        };


        controller.eliminar_moto = (req,res)=>{
            const {modelo,marca,cilindraje} =req.body;
    
            const id=req.params.id_noticia;
                conn.query('DELETE from motos where id = ?',
           
                id
            
            , (err,result)=>{
                res.redirect('/motos');
            });
            };

        controller.list= (req,res)=>{
            conn.query('SELECT * FROM users', (err, result)=>{
                if(err){
                    res.json(err);
                }
            res.render ('users', {
                user:result
            
            });
            });
            }

            

            controller.update_user = (req, res) => {
                const { id} = req.params;
            
                conn.query('SELECT * FROM users where id = ?',
                      [id]
                    , (err, result) => {
                        res.render ('actualizar_usuario', {
                            user:result[0]           
                        });
                    });
                    
            };
            
            controller.save_user = (req,res) =>{
                const { id } = req.params;
                const nuevosDatos = req.body;
                conn.query('UPDATE users set ? where id = ?', [nuevosDatos, id], (err, result) => {
                       res.redirect('/users');
                    });
            };

            controller.update_moto = (req, res) => {
                const { id} = req.params;
            
                conn.query('SELECT * FROM motos where id = ?',
                      [id]
                    , (err, result) => {
                        res.render ('actualizar_moto', {
                            user:result[0]           
                        });
                    });
                    
            };
            
            controller.save_moto = (req,res) =>{
                const { id } = req.params;
                const nuevosDatos = req.body;
                conn.query('UPDATE motos set ? where id = ?', [nuevosDatos, id], (err, result) => {
                       res.redirect('/motos');
                    });
            };

module.exports = controller;
   


