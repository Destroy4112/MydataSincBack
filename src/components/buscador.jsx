import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { agregarProducto, cargarDescripcionProductoMercadoLibre, cargarProductoMercadoLibre } from "../server/servidor";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Buscador() {

    const [id, setId] = useState("");
    const [producto, setProducto] = useState({
        sku: "",
        titulo: "",
        imagen: "",
        descripcion: "",
        precio: "",
        categoria: ""
    });


    function handleChange({ target }) {
        setId(target.value);
    }

    const consultarProductoMercadoLibre = async () => {
        try {
            const data = await cargarProductoMercadoLibre(id);
            const res = await cargarDescripcionProductoMercadoLibre(id);
            setProducto({
                sku: data.id,
                titulo: data.title,
                imagen: data.pictures[0].url,
                descripcion: res.plain_text,
                precio: data.price,
                categoria: data.category_id
            })
        } catch (error) {
            console.log(error);
        }
    }

    function limpiar() {
        setId("");
        setProducto({
            titulo: "",
            imagen: "",
            descripcion: "",
            precio: "",
            categoria: ""
        });
    }

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        await agregarProducto(producto);
        navigate("/");
    }

    return (
        <>
            <div className="container p-5">
                <Form onSubmit={consultarProductoMercadoLibre}>
                    <Form.Label>Ingrese el id del producto a buscar</Form.Label>
                    <InputGroup className="mb-3">
                        <Form.Control aria-label="Recipient's username" aria-describedby="basic-addon2" onChange={handleChange} />
                        <Button type="submit" variant="outline-secondary" id="button-addon2">
                            Buscar
                        </Button>
                    </InputGroup>
                </Form>
                <Button onClick={() => limpiar}>Limpiar</Button>
            </div>

            {
                producto.imagen !== "" ?
                    <div className="p-5 col-8 " style={{ margin: '0 auto' }}>
                        <h6 className="mb-5">Detalle del producto</h6>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="titulo">
                                <Form.Label>Título</Form.Label>
                                <Form.Control type="text" defaultValue={producto.titulo} name="titulo" placeholder="Ingrese el titulo" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="descripcion">
                                <Form.Label>Descripción</Form.Label>
                                <Form.Control as="textarea" defaultValue={producto.descripcion} name="descripcion" rows={9} placeholder="Ingrese la descripcion" />
                            </Form.Group>
                            <Row className="mb-3">
                                <Form.Group as={Col} className="mb-3" controlId="precio">
                                    <Form.Label>Precio</Form.Label>
                                    <Form.Control type="text" defaultValue={producto.precio} name="precio" placeholder="Digite el precio" />
                                </Form.Group>
                                <Form.Group as={Col} className="mb-3" controlId="categoria">
                                    <Form.Label>Categoría</Form.Label>
                                    <Form.Control type="text" defaultValue={producto.categoria} name="categoria" placeholder="Ingrese la categoria" />
                                </Form.Group>
                            </Row>

                            <Form.Group className="mb-3" controlId="imagen">
                                <img src={producto.imagen} alt="" width={150} />

                                <Form.Control type="text" defaultValue={producto.imagen} name="imagen" />
                            </Form.Group>
                            <Button type="submit" variant="primary" style={{ float: 'right' }}>
                                Guardar
                            </Button>
                        </Form>
                    </div>
                    :
                    <div className="p-5 col-6 " style={{ margin: '0 auto' }}>
                        <h5>No se ha encontrado ningun producto</h5>
                    </div>
            }
        </>
    );
} export { Buscador };