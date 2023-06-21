const URL_PRODUCTOS = 'http://127.0.0.1:8000/api/productos';
const URL_MERCADO_LIBRE = 'https://api.mercadolibre.com/items/';

export async function agregarProducto(producto) {
    const options = {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(producto)
    };
    const res = await fetch(URL_PRODUCTOS + '-create', options);
    return await res.json();
}

export async function cargarProductos() {
    const options = {
        headers: {
            "Content-type": "application/json"
        },
    }
    const res = await fetch(URL_PRODUCTOS, options);
    return await res.json();
}

export async function cargarProductosPorId(id) {
    const options = {
        headers: {
            "Content-type": "application/json",
        },
    }
    const res = await fetch(URL_PRODUCTOS + id, options);
    return await res.json();
}

export async function actualizarProducto(id, producto) {
    const options = {
        method: 'PUT',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(producto)
    };
    const res = await fetch(URL_PRODUCTOS + '-update/' + id, options);
    return await res.json();
}

export async function eliminarProducto(id) {
    const options = {
        method: 'DELETE',
        headers: {
            "Content-type": "application/json"
        },
    };
    const res = await fetch(URL_PRODUCTOS + '-delete/' + id, options);
    const msg = await res.text();
    return msg;
}

export async function cargarProductoMercadoLibre(id) {
    const options = {
        headers: {
            "Content-type": "application/json"
        },
    }
    const res = await fetch(URL_MERCADO_LIBRE + id, options);
    return await res.json();
}

export async function cargarDescripcionProductoMercadoLibre(id) {
    const options = {
        headers: {
            "Content-type": "application/json"
        },
    }
    const res = await fetch(URL_MERCADO_LIBRE + id +'/description', options);
    return await res.json();
}