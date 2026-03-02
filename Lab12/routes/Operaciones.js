const express = require("express");
const fs = require("fs");

const router = express.Router();

let textos = [];

//Funciones
function promedio(numeros){
    return numeros.reduce((a,b)=>a+Number(b),0)/numeros.length;
}

function esPrimo(n){
    if(n<=1) return false;
    for(let i=2;i<n;i++)
        if(n%i===0) return false;
    return true;
}

//Home
router.get("/", (req,res)=>{
    res.render("index");
});

//Promedio
router.get("/promedio",(req,res)=>{
    res.render("promedio",{resultado:null});
});

router.post("/promedio",(req,res)=>{
    const arr=req.body.numeros.split(",");

    res.render("promedio",{
        resultado: promedio(arr)
    });
});

//Primo
router.get("/primo",(req,res)=>{
    res.render("primo",{resultado:null, numero:null});
});

router.post("/primo",(req,res)=>{
    const n=Number(req.body.numero);

    res.render("primo",{
        numero:n,
        resultado:esPrimo(n)
    });
});

//Archivo
router.get("/archivo",(req,res)=>{
    res.render("archivo",{textos});
});

router.post("/archivo",(req,res)=>{
    const texto=req.body.texto;

    fs.appendFileSync("Lab12.txt", texto+"\n");

    textos.push(texto);

    res.redirect("/archivo");
});

module.exports = router;