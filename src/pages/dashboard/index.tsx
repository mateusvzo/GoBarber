import React, { useCallback, useEffect, useRef, useState } from 'react';
import {FiArrowLeft, FiMail, FiUser, FiLock} from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Background, Container, Content } from './styles';

import logoImg from '../../assets/logo.svg';

import getValidationErrors from '../../utils/getValidationErrors';
import { isPropertySignature } from 'typescript';

interface SignInFormData {
    professor: string;
    disciplina: string;
    diadasemana: string;
    periodo: string;
    horario: string;
}

const Dashboard: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const [cadastro, setCadastro] = useState<SignInFormData[]>([]);

    //const arr:SignInFormData[] = []

    useEffect(() => {
        let getData: SignInFormData = JSON.parse(localStorage.getItem('@Avd1') || "{}")
        setCadastro([...cadastro, getData])
    }, [])

    const handleSubmit = useCallback(async (data: SignInFormData) => {
        try {
            formRef.current?.setErrors({});

            const teste = data
            cadastro.push(teste)
            // arr.push(data)
            // cadastro.push(data)
            // console.log(data)

            // console.log(cadastro)
            
            const schema = Yup.object().shape({
                professor: Yup.string().required('Nome obrigatório'),
                disciplina: Yup.string().required('Disciplina obrigatória'),
                diadasemana: Yup.string().required('Dia da Semana obrigatório'),
                periodo: Yup.string().required('Periodo Obrigatorio'),
                horario: Yup.string().required('Horario obrigatório'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });
            setCadastro([...cadastro, data])
            // console.log(cadastro)


            localStorage.setItem('@Avd1', JSON.stringify(cadastro))

        } catch (err) {
            console.log(err);

            const errors = getValidationErrors(err);

            formRef.current?.setErrors(errors);
        }
    }, []);

    return (
        <Container>

            <Content>
                <img src={logoImg} alt="GoBarber"/>
                <Form ref={formRef} onSubmit={handleSubmit}>
                    <Input name="professor" icon={FiUser} placeholder="Professor"/>

                    <Input name="disciplina" icon={FiUser} placeholder="Disciplina" />

                    <Input name="diadasemana" icon={FiUser} placeholder="Dia da Semana"/>

                    <Input name="periodo" icon={FiUser} placeholder="Periodo"/>

                    <Input name="horario" icon={FiUser} placeholder="Horario" />

                    <Button type="submit">Cadastrar</Button>
                </Form>
                {/* {cadastro.map(data => (<Link innerRef={data} to=""><h1>{data.professor}</h1></Link>))} */}
                {cadastro.map((data, index) => (<a key={index} onClick={() => {
                    localStorage.setItem('nome', data.professor)
                    window.location.href="/professor"}}><h1>{data.professor}</h1></a>))}
            </Content>
        </Container>
    )
}

export default Dashboard;