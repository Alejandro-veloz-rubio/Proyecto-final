let productos=[];

showMessage1=(mensaje,type)=>{
    const container=document.getElementById('mensaje1');
    const app=document.getElementById('results1');
    const div=document.createElement('div');
    div.className=`alert1`;
    div.appendChild(document.createTextNode(mensaje));
    container.insertBefore(div,app);
    setTimeout(function(){
        document.querySelector('.alert1').remove();
    },3000);
};

showMessage2=(mensaje,type)=>{
    const container=document.getElementById('mensaje2');
    const app=document.getElementById('results2');
    const div=document.createElement('div');
    div.className=`alert2`;
    div.appendChild(document.createTextNode(mensaje));
    container.insertBefore(div,app);
    setTimeout(function(){
        document.querySelector('.alert2').remove();
    },3000);
};

showMessage3=(mensaje,type)=>{
    const container=document.getElementById('mensaje3');
    const app=document.getElementById('results3');
    const div=document.createElement('div');
    div.className=`alert3`;
    div.appendChild(document.createTextNode(mensaje));
    container.insertBefore(div,app);
    setTimeout(function(){
        document.querySelector('.alert3').remove();
    },3000);
};

let btnagregarproducto=document.getElementById('btnagregar');
btnagregarproducto.addEventListener('click',()=>{
    let nombre=document.getElementById('nombre').value;
    let cantidad=document.getElementById('cantidad').value;
    let costo=document.getElementById('costo').value;
    let datosp={nombre:nombre,cantidad:cantidad,costo:costo};
    console.log(datosp);
    fetch('http://localhost:1341/api/productos',{
        method:'POST',
        body:JSON.stringify(datosp),
        headers:{
            'Content-Type':'application/json'
        }
    })
    .then(res=>res.json())
    .then(json=>{
        let mensaje=`Se agrego un nuevo producto con el id: ${json.insertId}`;
        showMessage1(mensaje,1)
        console.log(json)
    })
});

let btnlistar=document.getElementById('btnlistar');
btnlistar.addEventListener('click',()=>{
    fetch('http://localhost:1341/api/productos',{
        method:'GET',
        body:JSON.stringify(),
        headers:{
            'Content-Type':'application/json'
        }
    })
    .then(res=>res.json())
    .then(json=>{
        let res1=document.getElementById('divlistar');
        let menu=document.getElementById('products');
        let rest='';
        let lista='';
        for(let i=0;i<json.length;i++){
            rest+=`
            <div id=${json[i].id} class="divs">
            <p>ID: ${json[i].id} <p>
            <p> Nombre: ${json[i].name} </p>
            <p> Cantidad: ${json[i].quantity} </p>
            <p> Costo: $${json[i].cost} </p>
            </div>
            `;
            lista+=`<option value="${json[i].id}">${json[i].name} $${json[i].cost}</option>`;
        }
        res1.innerHTML=rest;
        menu.innerHTML=lista;
        //console.log(json)
    })

});


let btncarrito=document.getElementById('btncarrito');
btncarrito.addEventListener('click',()=>{
    let menu=document.getElementById('products').value;
    let cantidad=document.getElementById('cantidad2').value;
    fetch(`http://localhost:1341/api/productos/${menu}`)
    .then(res=>res.json())
    .then(json=>{
        let costproduct=json[0].cost;
        let multiplicacion=costproduct*cantidad;
        let producto={productoid:`${json[0].id}`,cantidad:cantidad,costo:multiplicacion}
        productos.push(producto);
        showMessage2('Agregado al carrito',1);
    })
});

let btncosto=document.getElementById('btnventa');
btncosto.addEventListener('click',()=>{
    let suma1=0;
    let ivatotal=0;
    let venta=document.getElementById('venta');
    let iva=document.getElementById('iva');
    let costototal=document.getElementById('costototal');
    for(let i=0;i<productos.length;i++){
        suma1+=productos[i].costo;
        ivatotal=suma1*0.16;
    }
    venta.value=suma1;
    iva.value=ivatotal;
    costototal.value=suma1+ivatotal;
});

btnfactura=document.getElementById('btnfacturar');
btnfactura.addEventListener('click',()=>{
    let date=document.getElementById('fecha').value;
    let rfc=document.getElementById('rfc').value;
    let ivat=document.getElementById('iva').value;
    let costt=document.getElementById('costototal').value;
    let datosf={RFC_CUSTOMER:rfc,DATE:date,IVA:ivat,TOTALCOST:costt,PRODUCTS:productos}
    fetch('http://localhost:1341/api/factura/',{
        method:'POST',
        body:JSON.stringify(datosf),
        headers:{
            'Content-Type':'application/json'
        }
        })
    .then(res=>res.json())
    .then(json=>{
        console.log(datosf)
        console.log(json)
        showMessage3(json,1);
    });
});

