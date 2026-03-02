const express = require("express");
const router = express.Router();

class Bobina{
    constructor(N,theta,Bi,Bf,dt,fem){
        this.N=N;
        this.theta=theta*Math.PI/180;
        this.Bi=Bi;
        this.Bf=Bf;
        this.dt=dt;
        this.fem=fem;
    }

    calcular(){
        const deltaB=this.Bf-this.Bi;
        const area=(this.fem*this.dt)/(this.N*deltaB*Math.cos(this.theta));
        const lado=Math.sqrt(area);
        const longitud=4*lado*this.N;
        return {area,lado,longitud};
    }
}

router.get("/faraday",(req,res)=>{
    res.render("faraday",{resultado:null});
});

router.post("/faraday",(req,res)=>{
    const b=new Bobina(
        Number(req.body.N),
        Number(req.body.theta),
        Number(req.body.Bi),
        Number(req.body.Bf),
        Number(req.body.dt),
        Number(req.body.fem)
    );

    res.render("faraday", { resultado: r });
});

module.exports=router;