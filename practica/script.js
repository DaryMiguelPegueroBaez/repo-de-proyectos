document.getElementById('agregarProducto').addEventListener('click', agregarProducto);

function agregarProducto() {
    const nombre = document.getElementById('nombreProducto').value;
    const cantidad = document.getElementById('cantidadProducto').value;
    const precio = document.getElementById('precioProducto').value;

    if (nombre && cantidad && precio) {
        const productos = JSON.parse(localStorage.getItem('productos')) || [];
        productos.push({ nombre, cantidad, precio });
        localStorage.setItem('productos', JSON.stringify(productos));
        mostrarProductos();
        limpiarFormulario();
    } else {
        alert('Por favor, completa todos los campos');
    }
}

function mostrarProductos() {
    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    const tbody = document.querySelector('#tablaProductos tbody');
    tbody.innerHTML = '';

    productos.forEach((producto, index) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${producto.nombre}</td>
            <td>${producto.cantidad}</td>
            <td>${producto.precio}</td>
            <td>
                <button onclick="eliminarProducto(${index})">Eliminar</button>
            </td>
        `;
        tbody.appendChild(fila);
    });
}

function eliminarProducto(index) {
    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    productos.splice(index, 1);
    localStorage.setItem('productos', JSON.stringify(productos));
    mostrarProductos();
}

function limpiarFormulario() {
    document.getElementById('nombreProducto').value = '';
    document.getElementById('cantidadProducto').value = '';
    document.getElementById('precioProducto').value = '';
}

mostrarProductos();

