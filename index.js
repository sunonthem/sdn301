var rect= require('./retangle');
function solveRect(l,b ){
    console.log("Solving for rectangle with l = " + l + " and b = " + b);
    if(l<=0 || b<=0){
        console.log("Rectangle dimensions should be greater than zero: l = " + l + ", and b = " + b);
    }
    else ( l>= 0 || B>=0)
    {
        console.log("perimeter is "+ rect.perimeter(l,b));
        console.log("area is "+ rect.area(l,b));
    }
}
solveRect(2,4);
solveRect(3,5);
solveRect(-3,5);