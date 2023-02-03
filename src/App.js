import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [numbers, setNumbers] = useState([]);
  const [quantityGames, setQuantityGames] = useState(1);
  const [quantityNumbers, setQuantityNumbers] = useState(6);

  const generateNumbers = () => {
    let generatedNumbers = [];
    let allGeneratedNumbers = [];

    for (let i = 0; i < quantityGames; i++) {
      while (generatedNumbers.length < quantityNumbers) {
        let randomNumber = Math.floor(Math.random() * 60) + 1;
        if (!generatedNumbers.includes(randomNumber)) {
          generatedNumbers.push(randomNumber);
        }
      }
      allGeneratedNumbers.push(generatedNumbers.sort((a, b) => a - b));
      generatedNumbers = [];
    }
    setNumbers(allGeneratedNumbers);
  };

  const addGame = () => {
    setQuantityGames(quantityGames + 1);
  };

  const removeGame = (index) => {
    let newNumbers = [...numbers];
    newNumbers.splice(index, 1);
    setNumbers(newNumbers);
    setQuantityGames(quantityGames - 1);
  };

  return (
    <div className="container">
      <h1 className="title">Gerador de Números para Mega-Sena</h1>
      <div className="form">
        <label>
          Quantidade de jogos:
          <input
            type="number"
            value={quantityGames}
            min="1"
            max="15"
            onChange={(e) => setQuantityGames(e.target.value)}
          />
        </label>
        <label>
          Quantidade de números por jogo:
          <input
            type="number"
            value={quantityNumbers}
            min="6"
            max="15"
            onChange={(e) => setQuantityNumbers(e.target.value)}
          />
        </label>
      </div>
      <div className="container-buttons">
        <button className="generate-button" onClick={generateNumbers}>
          Gerar Números
        </button>
        <button className="add-button" onClick={addGame}>
          Adicionar jogo
        </button>
      </div>
      <div className="numbers">
        {numbers.map((numberArray, index) => (
          <div className="game" key={index}>
            Jogo {index + 1}:
            {numberArray.map((number) => (
              <span className="number" key={number}>
                {number}
              </span>
            ))}
            <button className="remove-button" onClick={() => removeGame(index)}>
              Excluir jogo
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
