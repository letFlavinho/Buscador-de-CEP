import { useState } from "react";
import "./App.css";
import { FiSearch } from "react-icons/fi";
import { api } from "./api/api";

function App() {
  const [input, setInput] = useState("");
  const [cep, setCep] = useState({});
  async function handleSearch() {
    if (input === "") {
      alert("Preencha o Campo");
      return;
    }
    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput("");
    } catch {
      alert("Erro na requisição");
      setInput("");
    }
  }
  const HandleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <div className="container">
      <h1 className="title">Buscador de CEP</h1>
      <div className="containerInput">
        <input
          type="text"
          placeholder="digite seu cep"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyPress={HandleKeyPress}
        />
        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#fff" />
        </button>
      </div>
      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>CEP:{cep.cep}</h2>
          <span>{cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>{cep.bairro}</span>
          <span>
            {cep.localidade} + {cep.uf}
          </span>
        </main>
      )}
    </div>
  );
}

export default App;
