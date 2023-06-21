import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { agregarProducto } from "../server/servidor";
import { useNavigate } from "react-router-dom";


function Formulario() {

    const [producto, setProducto] = useState({
        sku: "",
        titulo: "",
        imagen: "",
        descripcion: "",
        precio: "",
        categoria: ""
    });

    function handleChange({ target }) {
        setProducto({
            ...producto,
            [target.name]: target.value
        });
    }

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        await agregarProducto(producto);
        navigate("/");
    }

    return (
        <div className="container p-5">
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="sku">
                    <Form.Label>SKU</Form.Label>
                    <Form.Control type="text" name="sku" placeholder="Ingrese el SKU" onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="titulo">
                    <Form.Label>Título</Form.Label>
                    <Form.Control type="text" name="titulo" placeholder="Ingrese el titulo" onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="imagen">
                    <Form.Label>Imagen</Form.Label>
                    <Form.Control type="file" name="imagen" onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="descripcion">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control as="textarea" name="descripcion" rows={3} placeholder="Ingrese la descripcion" onChange={handleChange} />
                </Form.Group>
                <Row className="mb-3">
                    <Form.Group as={Col} className="mb-3" controlId="precio">
                        <Form.Label>Precio</Form.Label>
                        <Form.Control type="text" name="precio" placeholder="Digite el precio" onChange={handleChange} />
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" controlId="categoria">
                        <Form.Label>Categoría</Form.Label>
                        <Form.Control type="text" name="categoria" placeholder="Ingrese la categoria" onChange={handleChange} />
                    </Form.Group>
                </Row>
                <Button type="submit" variant="primary" style={{ float: 'right' }}>
                    Guardar
                </Button>
            </Form>
        </div>
    );
} export { Formulario };