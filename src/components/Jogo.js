import React, { Component } from 'react'
import Tabuleiro from './Tabuleiro';

export default class Jogo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            xEhOProximo: true,
            etapaNum: 0,
            historico: [
                { quadrados: Array(9).fill(null) }
            ]
        }
    }

    pularPara(fase) {
        this.setState({
            etapaNum: fase,
            xEhOProximo: (fase % 2) === 0
        })
    }

    handleClick(i) {
        const historico = this.state.historico.slice(0, this.state.etapaNum + 1);
        const current = historico[historico.length - 1];
        const quadrados = current.quadrados.slice();
        const vencedor = calcularVencedor(quadrados);
        if (vencedor || quadrados[i]) {
            return;
        }
        quadrados[i] = this.state.xEhOProximo ? 'X' : 'O';

        this.setState({
            historico: historico.concat({ quadrados: quadrados }),
            xEhOProximo: !this.state.xEhOProximo,
            etapaNum: historico.length
        })
    }

    render() {
        const historico = this.state.historico;
        const current = historico[this.state.etapaNum];
        const vencedor = calcularVencedor(current.quadrados);

        const jogadas = historico.map((fase, jogada) => {
            const descricao = jogada ? 'Vai para #' + jogada : 'Começar o Jogo';
            return (
                <li key={jogada}>
                    <button onClick={() => { this.pularPara(jogada) }}>
                        {descricao}
                    </button>
                </li>
            )
        });

        let status;
        if (vencedor) {
            status = 'Vencedor(a) é ' + vencedor;
        } else {
            status = 'Proximo jogador(a) é ' + (this.state.xEhOProximo ? 'X' : 'O');
        }


        return (
            <div className="jogo">
                <div className="jogo-tabuleiro">
                    <Tabuleiro onClick={(i) => this.handleClick(i)}
                        quadrados={current.quadrados} />
                </div>
                <div className="jogo-info">
                    <div>{status}</div>
                    <ul>{jogadas}</ul>
                </div>
            </div>
        )
    }
}

function calcularVencedor(quadrados) {
    const linhas = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < linhas.length; i++) {
        const [a, b, c] = linhas[i];
        if (quadrados[a] && quadrados[a] === quadrados[b] && quadrados[b] === quadrados[c]) {
            return quadrados[a];
        }
    }

    return null;
}