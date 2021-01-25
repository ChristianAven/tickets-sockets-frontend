import { Button, Col, Divider, Row, Typography } from 'antd';
import { CloseCircleOutlined, RightOutlined } from '@ant-design/icons'
import React, { useContext, useState } from 'react'
import useHideMenu from '../hook/useHideMenu';
import { getUsuarioStorage } from '../helpers/getUsuarioStorage';
import { Redirect, useHistory } from 'react-router-dom';
import { SocketContext } from '../context/SocketContext';

const { Title, Text } = Typography;

const Escritorio = () => {

    useHideMenu(false);
    const {socket}  = useContext(SocketContext);
    const history   = useHistory();
    const [usuario] = useState(getUsuarioStorage());
    const [ticket, setTicket] = useState({})


    const salir = () => {
        localStorage.clear();
        history.replace('/ingresar')
    }

    const siguienteTicket = () => {

        socket.emit('siguiente-ticket-trabajar', usuario, (ticket) => {
            setTicket(ticket);
        })

    }

    if (!usuario.agente && !usuario.escritorio) {
        return <Redirect to="/ingresar/"/>
    }

    return (
        <>
           <Row>
                <Col span={20}>
                    <Title level={2}>{usuario.agente}</Title>
                    <Text>Trabajando en el escritorio: </Text>
                    <Text type='success'>{usuario.escritorio}</Text>
                </Col>

                <Col span={4} align='right'>
                    <Button shape='round' type='danger' onClick={salir}>
                        <CloseCircleOutlined />
                        Salir
                    </Button>
                </Col>
            </Row> 

            <Divider/>

            <Row>
                <Col>
                    <Text>Esta atendiendo el ticket numero: </Text>
                    {
                        ticket 
                        ? <Text style={{fontSize: 20}} type='danger'>{ticket.numero}</Text>
                        : <Text>No hay tickets nuevos</Text>
                    }
                    
                </Col>
            </Row>

            <Row>
                <Col offset={18} span={6} align='right'>
                    <Button
                        onClick={siguienteTicket}
                        shape='round'
                        type='primary'>
                            <RightOutlined/>
                            Siguiente
                    </Button>
                </Col>
            </Row>
        </>
    )
}

export default Escritorio
