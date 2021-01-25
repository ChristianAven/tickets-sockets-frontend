import { Button, Col, Divider, Row, Typography } from 'antd'
import {DownloadOutlined} from '@ant-design/icons'
import React, { useContext, useState } from 'react'
import useHideMenu from '../hook/useHideMenu';
import { SocketContext } from '../context/SocketContext';

const { Title, Text } = Typography;

const CrearTicket = () => {

    useHideMenu(true);

    const { socket } = useContext( SocketContext );
    const [ticket, setTicket] = useState({});

    const nuevoTikect = () => {
        socket.emit('solicitar-ticket', null, (ticket) =>{
            setTicket(ticket);
        })
    }

    return (
        <> 
            <Row>
                <Col span={14} offset={ 6 } align='center'>
                    <Title level={3}>
                        Crear un nuevo ticket
                    </Title>

                    <Button onClick={nuevoTikect} size='large' type='primary' shape='round' icon={<DownloadOutlined/>}>
                        Nuevo Ticket
                    </Button>

                </Col>
            </Row>
            <Divider/>
            <Row>
                <Col span={14} offset={6} align='center'>
                    <Text level={2}>
                        Su numero
                    </Text>
                    <hr/>
                    <Text type='success' style={{fontSize:55}} >
                        {ticket.numero}
                    </Text>
                </Col>
            </Row>
        </>
    )
}

export default CrearTicket
