const fs = require("fs");
const Texto = require("../models/texto.model");

function promedio(numeros){
    return numeros.reduce((a,b)=>a+Number(b),0)/numeros.length;
}

function esPrimo(n){
    if(n<=1) return false;
    for(let i=2;i<n;i++)
        if(n%i===0) return false;
    return true;
}

//Controladores
exports.getIndex = (req,res) => {
    res.render("index");
};

//Promedio
exports.getPromedio = (req,res)=>{
    res.render("promedio",{resultado:null});
};

exports.postPromedio = (req,res)=>{
    const arr=req.body.numeros.split(",");
    res.render("promedio",{resultado:promedio(arr)});
};

//Primo
exports.getPrimo = (req,res)=>{
    res.render("primo",{resultado:null, numero:null});
};

exports.postPrimo = (req,res)=>{
    const n=Number(req.body.numero);

    res.render("primo",{
        numero:n,
        resultado:esPrimo(n)
    });
};

//Archivo
exports.getArchivo = (req,res,next)=>{

    //Leer cookies
    const cookies = req.get("Cookie");

    let ultimoTextoCookie = "";

    if(cookies){
        ultimoTextoCookie = cookies
        .split(";")
        .find(c => c.trim().startsWith("ultimoTexto="));

        if(ultimoTextoCookie){
            ultimoTextoCookie = ultimoTextoCookie.split("=")[1];
        }
    }

    //Leer sesión
    const ultimoTextoSesion = req.session.ultimoTexto;

    Texto.fetchAll()
    .then(([rows, fieldData]) => {

        res.render("archivo",{
            textos: rows,
            ultimoTextoCookie,
            ultimoTextoSesion
        });

    })
    .catch(err => {
        console.log(err);
    });

};


exports.postArchivo = (req,res,next)=>{

    const texto = req.body.texto;

    const nuevoTexto = new Texto(texto);

    nuevoTexto.save()
    .then(()=>{

        fs.appendFileSync("Lab17.txt", texto+"\n");

        //Cookie
        res.setHeader("Set-Cookie", "ultimoTexto="+texto+"; HttpOnly");

        //Variable de sesión
        req.session.ultimoTexto = texto;

        res.redirect("/archivo");

    })
    .catch(err=>{
        console.log(err);
    });

};

exports.getEditarTexto = (req,res,next)=>{

    const id = req.params.texto_id;

    Texto.fetchOne(id)
    .then(([rows])=>{
        res.render("editar",{
            texto: rows[0]
        });
    })
    .catch(err=>console.log(err));

};

exports.postEditarTexto = (req,res,next)=>{

    const id = req.body.id;
    const contenido = req.body.contenido;

    Texto.update(id, contenido)
    .then(()=>{
        res.redirect("/archivo");
    })
    .catch(err=>console.log(err));

};

exports.logout = (req,res)=>{

    req.session.destroy(()=>{
        res.redirect("/archivo");
    });

};