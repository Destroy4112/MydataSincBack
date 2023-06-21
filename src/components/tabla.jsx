import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { actualizarProducto, cargarProductos, eliminarProducto } from '../server/servidor';
import { NavLink } from 'react-router-dom';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';

function TablaProductos() {

    const [listaProductos, setListaProductos] = useState([]);
    const [lgShow, setLgShow] = useState(false);
    const [producto, setProducto] = useState({
        id: "",
        sku: "",
        titulo: "",
        imagen: "",
        descripcion: "",
        precio: "",
        categoria: ""
    });

    const getProductos = async () => {
        try {
            const data = await cargarProductos();
            setListaProductos(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getProductos();
    }, [])

    function handleChange({ target }) {
        setProducto({
            ...producto,
            [target.name]: target.value
        });
    }

    const editar = async (producto) => {
        setProducto(producto);
        setLgShow(true);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const resultado = await actualizarProducto(producto.id, producto);
        if (resultado) {
            await getProductos();
            window.alert("actualizado correctamente");
            setLgShow(false);
        }
    }

    const eliminar = async (id) => {
        if (window.confirm("¿Desea eliminar este producto?")) {
            const resultado = await eliminarProducto(id);
            if (resultado) {
                setListaProductos(
                    listaProductos.filter((product) => product.id !== id)
                );
                console.log(resultado);
                window.alert("Eliminado correctamente");
            } else {
                window.alert("Algo salio mal");
            }
        }
    }

    return (
        <div className="container pt-5">
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>SKU</th>
                        <td>título</td>
                        <td>imagen</td>
                        <td>descripción</td>
                        <td>precio</td>
                        <td>categoría</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {
                        listaProductos.map((producto) => (
                            <tr key={producto.id}>
                                <td>{producto.sku}</td>
                                <td>{producto.titulo}</td>
                                <td>{producto.imagen}</td>
                                <td>{producto.descripcion}</td>
                                <td>{producto.precio}</td>
                                <td>{producto.categoria}</td>
                                <td>
                                    <NavLink className="btn btn-primary" onClick={() => editar(producto)}>Edit</NavLink>
                                    <NavLink className="btn btn-danger" onClick={() => eliminar(producto.id)}>Delete</NavLink>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>

            <Modal size="lg" show={lgShow} onHide={() => setLgShow(false)} aria-labelledby="example-modal-sizes-title-lg">
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Editar Producto
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="sku">
                            <Form.Label>SKU</Form.Label>
                            <Form.Control type="text" defaultValue={producto.sku} name="sku" placeholder="Ingrese el SKU" onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="titulo">
                            <Form.Label>Título</Form.Label>
                            <Form.Control type="text" defaultValue={producto.titulo} name="titulo" placeholder="Ingrese el titulo" onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="imagen">
                            <Form.Label>Imagen</Form.Label>
                            <Form.Control type="file" name="imagen" onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="descripcion">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control as="textarea" defaultValue={producto.descripcion} name="descripcion" rows={3} placeholder="Ingrese la descripcion" onChange={handleChange} />
                        </Form.Group>
                        <Row className="mb-3">
                            <Form.Group as={Col} className="mb-3" controlId="precio">
                                <Form.Label>Precio</Form.Label>
                                <Form.Control type="text" defaultValue={producto.precio} name="precio" placeholder="Digite el precio" onChange={handleChange} />
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3" controlId="categoria">
                                <Form.Label>Categoría</Form.Label>
                                <Form.Control type="text" defaultValue={producto.categoria} name="categoria" placeholder="Ingrese la categoria" onChange={handleChange} />
                            </Form.Group>
                        </Row>
                        <Button type="submit" variant="primary" style={{ float: 'right' }}>
                            Guardar
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

        </div>
    );
}

export default TablaProductos;