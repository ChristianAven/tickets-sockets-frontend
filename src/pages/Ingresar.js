import React, { useState } from 'react'
import { Form, Input, Button, InputNumber, Typography, Divider } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { Redirect, useHistory } from 'react-router-dom';
import useHideMenu from '../hook/useHideMenu';
import { getUsuarioStorage } from '../helpers/getUsuarioStorage';

const { Title, Text } = Typography;

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 4, span: 16 },
};

const Ingresar = () => {

    useHideMenu(false);
    const history = useHistory();
    const [usuario] = useState(getUsuarioStorage())

    const onFinish = ({nombre, escritorio}) => {
        localStorage.setItem("nombre", nombre);
        localStorage.setItem("escritorio", escritorio);
        history.push('/escritorio');
      };
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    if (usuario.agente && usuario.escritorio) {
        return <Redirect to="/escritorio/"/>
    }


    return (
        <>
        <Title level={2}>Ingresar</Title>
        <Text>Ingrese su nombre y numero de escritorio</Text>
        <Divider/>
        <Form
            {...layout}
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            >
            <Form.Item
                label="Nombre"
                name="nombre"
                rules={[
                {
                    required: true,
                    message: 'Porfavor ingrese el nombre',
                },
                ]}
            >
            <Input />
            </Form.Item>

            <Form.Item
                label="Escritorio"
                name="escritorio"
                rules={[
                {
                    required: true,
                    message: 'Porfavor ingrese el escritorio de trabajo',
                },
                ]}
            >
                <InputNumber min={1}/>
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit" shape='round'>
                    <SaveOutlined />
                    Ingresar
                </Button>
            </Form.Item>
        </Form>
        </>
    )
}

export default Ingresar
