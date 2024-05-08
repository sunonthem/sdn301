var rect= require('./retangle');
function solveRect(l,b ){
    console.log("Solving for rectangle with l = " + l + " and b = " + b);
    rect(l,b,(err,retangle)=>{
        if(err){
            console.log("ERROR "+ err.message);
        }
        else 
        {
            console.log("perimeter is "+ retangle.perimeter(l,b));
            console.log("area is "+ retangle.area(l,b));
        }

    })
}
solveRect(2,4);
solveRect(3,5);
solveRect(-3,5);