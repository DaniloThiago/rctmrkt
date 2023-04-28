import './Cep.css';
import axios from 'axios';
import { ChangeEvent, useEffect, useState } from 'react';
import { HiSearchCircle } from 'react-icons/hi';

const maskCep = (cep: string) => {
  cep = cep.replace(/\D/g, '');
  cep = cep.replace(/^(\d{5})(\d)/, '$1-$2');
  return cep;
}

interface CEPProps {
  onCepChange: (frete: number) => void;
  onMenuOpen: boolean;
}

export const Cep = ({ onCepChange, onMenuOpen }: CEPProps) => {
  const [cep, setCep] = useState<string>('');
  const [cidade, setCidade] = useState<string>('');
  const [frete, setFrete] = useState(0);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    onCepChange(frete);
  }, [onCepChange, frete]);

  useEffect(() => {
    return () => {
      setCep('');
      setCidade('');
      setFrete(0);
    };
  }, [onMenuOpen]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const maskedCep = maskCep(event.target.value);
    setCep(maskedCep);
  };

  const handleClick = () => {
    const newCep = cep.replace('-', '');
    if(newCep.trim() != '') {
      getCepData(newCep);
    }
  };
  
  const getCepData = async (cep: string) => {
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    
    try {
      const response = await axios.get(url);
      const r = response.data;
      if(r.erro) {
        setCidade('CEP não encontrado');
        setErro(true);
        setTimeout(() => {
          setErro(false);
          setCidade('');
        },2000)
        return setCep('')
      }
      setCidade(`${r.bairro} - ${r.localidade} - ${r.uf}`);
      setFrete(parseFloat(`${cep.substring(3,5)}.${cep.substring(6,8)}`))
      onCepChange(frete);
    } catch (error) {
      alert(error);
    }
  };

    return (
    <section id='section-cep'>
      <div id="container-cep">
        <div id='cep'>
          <label htmlFor="cep">CEP:</label>
          <input
            type="text"
            value={cep}
            onChange={handleChange}
            id="cep"
            name="cep"
            maxLength={parseInt("9")}
            />
          <HiSearchCircle onClick={handleClick} />
        </div>
        {frete != null &&
          <div id="frete">
            R$ {frete.toFixed(2)}
          </div>
        }
      </div>
      <div id="cidade" className={`${erro ? "erro" : ""}`}>
        {cidade}
      </div>
    </section>
  );
};

function componentWillUnmount() {
  throw new Error('Function not implemented.');
}
