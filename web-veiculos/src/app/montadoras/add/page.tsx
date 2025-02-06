"use client"
import { graph_client } from '@/lib/graphql';
import { gql } from '@apollo/client';
import { redirect } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';

interface MontadoraFormData {
    nome: string;
}

const AddMontadoraPage: React.FC = () => {
    
    const { register, handleSubmit, formState: { errors, isSubmitSuccessful } } = useForm<MontadoraFormData>();

    const onSubmit = async (data: MontadoraFormData) => {
        try {
            const result = await graph_client.mutate({
                mutation: gql`
                    mutation AddMontadora($input: MontadoraInput!) {
                        addMontadora(input: $input) {
                            nome
                        }
                    }
                `,
                variables: {
                    input: {
                        nome: data.nome,
                    },
                },
            });

            if (result.errors) {
                console.error(result.errors);
                throw new Error('Erro ao cadastrar montadora');
            }
            alert('Montadora cadastrada com sucesso!');
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao cadastrar montadora');
        }
    };

    if (isSubmitSuccessful) {
        redirect('/montadoras');
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
            <h1 className="text-2xl font-bold mb-6 text-center text-gray-900">Cadastrar Montadora</h1>   
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome</label>
                <input
                    id="nome"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                    {...register('nome', { required: 'Nome é obrigatório' })}
                />
                {errors.nome && <span className="text-red-500 text-sm">{errors.nome.message}</span>}
                </div>
                <button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Cadastrar</button>
            </form>
            </div>
        </div>
    );
};

export default AddMontadoraPage;