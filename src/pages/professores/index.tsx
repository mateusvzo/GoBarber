import React, { useRef, useCallback, useState, useEffect } from 'react';
import {FiLogIn, FiMail, FiLock} from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Background, Container, Content } from './styles';

interface SignInFormData {
    professor: string;
    disciplina: string;
    diadasemana: string;
    periodo: string;
    horario: string;
}


const Professores: React.FC = () => {
    const [professor, setProfessor] = useState<SignInFormData[]>([])

    
    useEffect(() => {
        const test = localStorage.getItem('nome')
        const test1 = localStorage.getItem('@Avd1')

        if(test1) {
            const test3:SignInFormData[] = JSON.parse(test1)
            const test4 = test3.filter((f) => f.professor === test)
            setProfessor(test4)
            console.log(test4)
        }
    }, [])
    

    return (
        <Container>
            <Content>
                <img src={logoImg} alt="GoBarber"/>
                {professor.map((m, index) => {
                    return (
                        <>
                            <label key={index}>{`Nome: ${m.professor}, disciplina ${m.disciplina}, \n dia da semana: ${m.diadasemana},
                             periodo: ${m.periodo}, \n horario: ${m.horario}`}</label>
                        </>
                    )
                })}
                <Link to="/dashboard">
                    <FiLogIn />
                    Criar Conta
                </Link>
            </Content>

            <Background />
        </Container>
    );
};

export default Professores;