import React, { useContext, useEffect, useState } from 'react';
import { Col, Row, Typography, List, Card, Tag, Divider } from 'antd'
import useHideMenu from '../hook/useHideMenu';
import { SocketContext } from '../context/SocketContext';
import { getUltimos } from '../helpers/getUltimos';

const { Title, Text } = Typography;

const Cola = () => {

    useHideMenu(true);

    const {socket} = useContext(SocketContext);
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        socket.on('ticket-asignado', (asignados) => {
            console.log(asignados)
            setTickets(asignados);
        });

        return () => {
            socket.off('ticket-asignado');
        };
    }, [socket]);

    useEffect(() => {
        getUltimos().then( tickets => setTickets(tickets) )
    }, []);


    return (
        <>
            <Title level={1}>Atendiendo al cliente</Title>
            <Row>
                <Col span={12}>
                    <List
                        dataSource={ tickets.slice(0,2) }
                        renderItem={ item => (
                            <List.Item> 
                                <Card
                                    style={{ width: 300, height:160 }}
                                    actions={[
                                        <Tag color='magenta'>Escritorio: {item.escritorio}</Tag>

                                    ]}>
                                        <Title level={2}> No. {item.numero} </Title>
                                </Card>
                            </List.Item>
                        ) } />
                </Col>

                <Col span={12} >
                    <Divider> Historial </Divider>
                    <List 
                        dataSource={tickets.slice(2,7)}
                        renderItem={ item => (
                            <List.Item>
                                <List.Item.Meta 
                                    title={ `Ticket No. ${item.numero}` }
                                    description={
                                        <>
                                            <Text type="secondary">En el escritorio: </Text>
                                            <Tag color='magenta'> {item.escritorio} </Tag>
                                        </>
                                    } />
                            </List.Item>
                        ) } 
                    />
                </Col>

                
            </Row>
        </>
    )
}

export default Cola
