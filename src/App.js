import React, { useState } from "react";
import html2canvas from "html2canvas";
import "./App.css";
import { BiXCircle } from "react-icons/bi";

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

  const saveAsImage = () => {
    html2canvas(document.querySelector(".numbers"), {
      backgroundColor: null,
      allowTaint: true,
    }).then((canvas) => {
      let a = document.createElement("a");
      a.href = canvas.toDataURL("image/jpeg");
      a.download = "megagames.jpeg";
      a.click();
    });
  };

  const resetApplication = () => {
    setNumbers([]);
    setQuantityGames(1);
    setQuantityNumbers(6);
  };

  return (
    <div className="container">
      <h1 className="title">Gerador de Números para Mega-Sena</h1>
      <div className="form">
        <div>
          <p> Quantidade de jogos:</p>
          <button
            className="decrease-button"
            onClick={() => {
              if (quantityGames - 1 >= 1 && quantityGames - 1 <= 15) {
                setQuantityGames(quantityGames - 1);
              } else {
                alert(
                  "Valor inválido, o número de jogos deve ser entre 1 e 15"
                );
              }
            }}
          >
            -
          </button>
          <input
            type="number"
            value={quantityGames}
            min="1"
            max="15"
            onChange={(e) => setQuantityGames(e.target.value)}
          />
          <button
            className="increase-button"
            onClick={() => {
              if (quantityGames + 1 >= 1 && quantityGames + 1 <= 15) {
                setQuantityGames(quantityGames + 1);
              } else {
                alert(
                  "Valor inválido, o número de jogos deve ser entre 1 e 15"
                );
              }
            }}
          >
            +
          </button>
        </div>
        <div>
          <p>Quantidade de números por jogo:</p>
          <button
            className="decrease-button"
            onClick={() => {
              if (quantityNumbers - 1 >= 6 && quantityNumbers - 1 <= 15) {
                setQuantityNumbers(quantityNumbers - 1);
              } else {
                alert(
                  "Valor inválido, a quantidade de números por jogo deve ser entre 6 e 15"
                );
              }
            }}
          >
            -
          </button>
          <input
            type="number"
            value={quantityNumbers}
            min="6"
            max="15"
            onChange={(e) => setQuantityNumbers(e.target.value)}
          />
          <button
            className="increase-button"
            onClick={() => {
              if (quantityNumbers + 1 >= 6 && quantityNumbers + 1 <= 15) {
                setQuantityNumbers(quantityNumbers + 1);
              } else {
                alert(
                  "Valor inválido, a quantidade de números por jogo deve ser entre 6 e 15"
                );
              }
            }}
          >
            +
          </button>
        </div>
      </div>
      <div className="buttons">
        <button className="generate-button" onClick={generateNumbers}>
          Gerar Números
        </button>
      </div>
      <div className="numbers">
        {numbers.map((game, index) => (
          <div className="game" key={index}>
            <div className="game-title">Jogo {index + 1}</div>
            <div>
            {game.map((number) => (
              <div className="number" key={number}>
                {number}
              </div>
            ))}
            </div>
           
            <BiXCircle
            className="excluir"
              onClick={() => removeGame(index)}
             
            />
          </div>
        ))}
      </div>
      <div className="container-buttons">
        <button className="reset-button" onClick={resetApplication}>
          Fazer Novo Jogo
        </button>
        <button className="save-button" onClick={saveAsImage}>
          Salvar Jogo
        </button>
      </div>
    </div>
  );
};

export default App;
