"use client";

import { MouseEvent, useState } from "react";
import { graph_client } from "./graphql";
import { gql } from "@apollo/client";

export interface Montadora {
    id: number;
    nome: string;
}

export function Montadora({montadora}: {montadora: Montadora}) {
    const [carregando, setCarregando] = useState(false);
    const apaga = async (ev: MouseEvent<HTMLAnchorElement>) => {
        ev.preventDefault();
        if (carregando) return;
        try {
            setCarregando(true);
            const result = await graph_client.mutate({
                mutation: gql`
                    mutation ExcluiMontadora($id: Int!) {
                        excluiMontadora(id: $id)
                    }
                `,
                variables: {
                    id: montadora.id,
                },
            });
            if (result.errors) {
                throw result.errors;
            }
            location.reload();
        } finally {
            setCarregando(false);
        }
    };
    return (
        <li key={montadora.id} className="border rounded-lg p-4 shadow-md">
            <h2 className="text-xl font-bold mb-2">{montadora.nome} <span className="text-gray-300">#{montadora.id}</span></h2>
            <a href="#" className="flex items-center gap-2 text-blue-500 hover:text-blue-700" onClick={apaga}>
                {!carregando ? "Apagar" : "Apagando..."}
            </a>
        </li>
    );
}
