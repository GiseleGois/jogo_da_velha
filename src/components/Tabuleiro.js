import React, { Component } from 'react';
import Quadrado from './Quadrado';

export default class Tabuleiro extends Component {
    renderQuadrado(i) {
        return <Quadrado value={this.props.quadrados[i]}
            onClick={() => this.props.onClick(i)}
        />
    }
    render() {
        return (
            <div>
                <div className="boder-row">
                    {this.renderQuadrado(0)}
                    {this.renderQuadrado(1)}
                    {this.renderQuadrado(2)}
                </div>
                <div className="boder-row">
                    {this.renderQuadrado(3)}
                    {this.renderQuadrado(4)}
                    {this.renderQuadrado(5)}
                </div>
                <div className="boder-row">
                    {this.renderQuadrado(6)}
                    {this.renderQuadrado(7)}
                    {this.renderQuadrado(8)}
                </div>
            </div>
        )
    }
}