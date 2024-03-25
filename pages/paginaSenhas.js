import { View, StyleSheet, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Armazenamento from "../hooks/bancoTokens";
import { CaixaToken } from '../components/tokenView'

import { useState, useEffect } from 'react';
import { useIsFocused } from "@react-navigation/native";

import { Ionicons } from '@expo/vector-icons/';

export function PaginaSenhas() {
    const { obterItem, removerItem } = Armazenamento();
    const [listaTokens, defListaTokens] = useState([]);
    const telaAtiva = useIsFocused();

    /* entenda:
        const obterItem = Armazenamento().obterItem;
        const removerItem = Armazenamento().removerItem; 
        Não confunda o código acima com useState, pois trata-se de uma variável desestruturada
    */

    /* useEffect(() => { o q qr q aconteca }, [ gatilho pra acontecer / algo q ja esta acontecendo / disparo por evento ]) */

    /* flatList: forma de consumir array, mt mais sofisticado q o usando i do js;
        keyExtractor: trans em string, qlqr coisa dentro do ();
        data={listaTokens}
        renderItem: como vai aparecer
            renderItem={({ nome })} => <CaixaToken
                token = {item}
                removerToker={() => deletarToken(item)}

                esta pegando os itens do data e armazenando pra ser usado
    
    */

    useEffect(() => {
        async function carregaTokens() {
            const tokens = await obterItem("@token");
            defListaTokens(tokens);
        }
        carregaTokens()
    }, [telaAtiva]);

    async function deletarToken(item) {
        const tokens = await removerItem("@token", item)
        defListaTokens(tokens)
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={ESTILO.header}>
                <Text style={ESTILO.title}>
                    Minhas senhas
                </Text>
            </View>

            <View style={ESTILO.content}>
                <FlatList
                    style={{ flex: 1, paddingTop: 14, }}
                    data={listaTokens}
                    keyExtractor={(item) => String(item)}
                    renderItem={({ item }) => (
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name="trash" size={24} color="grey" style={{ marginRight: 10 }} />
                            <CaixaToken
                                token={item}
                                removerToken={() => deletarToken(item)}
                            />
                        </View>
                    )}
                />
            </View>
        </SafeAreaView>
    )
}

const ESTILO = StyleSheet.create({
    header: {
        padding: 14,
        paddingTop: 58,
        backgroundColor: "#392de9"
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#FFF"
    },
    content: {
        flex: 1,
        paddingLeft: 14,
        paddingRight: 14,
    }

})