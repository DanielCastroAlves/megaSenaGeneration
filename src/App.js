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
      <div>
        <p> Quantidade de jogos:</p>
 
        <button className="decrease-button" onClick={() => setQuantityGames(quantityGames - 1)}>
    -
  </button>
  <input
    type="number"
    value={quantityGames}
    min="1"
    max="15"
    onChange={(e) => setQuantityGames(e.target.value)}
  />
   <button className="increase-button" onClick={() => setQuantityGames(quantityGames + 1)}>
    +
  </button>
 
</div>
<div>
  <p>
  Quantidade de números por jogo:
  </p>
 
  <button className="decrease-button" onClick={() => setQuantityNumbers(quantityNumbers - 1)}>
    -
  </button>
  <input
    type="number"
    value={quantityNumbers}
    min="6"
    max="15"
    onChange={(e) => setQuantityNumbers(e.target.value)}
  />
   <button className="increase-button" onClick={() => setQuantityNumbers(quantityNumbers + 1)}>
    +
  </button>

</div>

      </div>
      <div className="container-buttons">
        
        <button className="generate-button" onClick={generateNumbers}>
          Gerar Números
        </button>
      </div>
      <div className="numbers">
        {numbers.map((numberArray, index) => (
          <div className="game" key={index}>
            <div>
              <p>Jogo{index + 1}:</p>
            </div>
            <div>
              {numberArray.map((number) => (
                <span className="number" key={number}>
                  {number}
                </span>
              ))}
            </div>

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
