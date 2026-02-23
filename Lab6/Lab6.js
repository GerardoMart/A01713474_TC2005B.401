let pass=document.getElementById("pass")
let confirm=document.getElementById("confirm")

let help1=document.getElementById("help1")
let help2=document.getElementById("help2")

pass.addEventListener("focus",()=>{
    help1.style.visibility="visible"
})

pass.addEventListener("blur",()=>{
    help1.style.visibility="hidden"
})

confirm.addEventListener("focus",()=>{
    help2.style.visibility="visible"
})

confirm.addEventListener("blur",()=>{
    help2.style.visibility="hidden"
})

let titulo=document.getElementById("titulo")

titulo.addEventListener("mouseover",()=>{
    titulo.style.fontStyle="italic"
    titulo.style.fontSize="40px"
})

titulo.addEventListener("mouseout",()=>{
    titulo.style.fontStyle="normal"
    titulo.style.fontSize="32px"
})

function evaluar(){

let p=pass.value
let c=confirm.value
let estado=document.getElementById("estado")

let fuerte=/(?=.*[A-Z])(?=.*[0-9]).{8,}/

if(!fuerte.test(p)){
    estado.textContent="Password débil"
    estado.style.color="red"
    return
}

if(p!==c){
    estado.textContent="Passwords no coinciden"
    estado.style.color="orange"
    return
}

estado.textContent="Password válido"
estado.style.color="green"

}

pass.addEventListener("keyup",evaluar)
confirm.addEventListener("keyup",evaluar)

let caja=document.getElementById("caja")
let zona=document.getElementById("zona")

caja.addEventListener("dragstart",(e)=>{
    e.dataTransfer.setData("text","caja")
})

zona.addEventListener("dragover",(e)=>{
    e.preventDefault()
})

zona.addEventListener("drop",(e)=>{
    e.preventDefault()
    zona.appendChild(caja)
})