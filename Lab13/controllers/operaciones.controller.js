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
exports.getArchivo = (req,res)=>{
    const textos = Texto.fetchAll();
    res.render("archivo",{textos});
};

exports.postArchivo = (req,res)=>{
    const texto=req.body.texto;

    const nuevoTexto = new Texto(texto);
    nuevoTexto.save();

    fs.appendFileSync("Lab13.txt", texto+"\n");

    res.redirect("/archivo");
};