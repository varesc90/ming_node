var asyncAdd = (a , b) =>{
    return new Promise((resolve, reject) => {
        setTimeout(() => {
                if ( typeof a == 'number' && typeof b == 'number'){
                    resolve(a + b);
                }else{
                    reject('Arguments must be numbers');
                }
            },1500
        )
    });
}

asyncAdd(5,7).then((res)=>{
    console.log(res);
    return asyncAdd(res,'asd');
},(errorMessage)=>{
    console.log(errorMessage);
}).catch((error)=>{
    console.log(error);
});

// var somePromise = new Promise((resolve,reject) => {
//     setTimeout(()=> { // Async
//         // resolve('Hey. What\'s up !');
//         reject('Unable to fullfill promise');
//     },2500);
// });
//
// somePromise.then((message)=>{
//     console.log('Success: ',message);
// },(errorMessage)=>{
//     console.log('Error: ',errorMessage);
// });