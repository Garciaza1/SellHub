'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation'

export default function Cadastro() {

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [tipo, setTipo] = useState('');
  const [tel, setTel] = useState('');
  const [endereco, setEndereco] = useState('');
  const [cpf, setCpf] = useState('');
  const [cep, setCep] = useState('');
  const [error, setError] = useState<any>('');
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Aqui você pode enviar os dados de login para a sua API
    try {
      // Coloque aqui a lógica de autenticação
      console.log('Nome:', nome);
      console.log('Email:', email);
      console.log('Senha:', senha);
      console.log('Tipo:', tipo);
      console.log('Tel:', tel);
      console.log('Endereço:', endereco);
      console.log('CPF:', cpf);
      console.log('CEP:', cep);

      //chama a api
      const response = await fetch('http://localhost:5000/Users/Post/Cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, email, senha, tipo, tel, endereco, cpf, cep }),
      });

      // tratamento de erros 
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Cadastro failed');
      }

      const data = await response.json();
      console.log('Cadastro bem-sucedido:', data);

      // Redirecionar após o login
      router.push('./Login')

    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setError(error);
    }
  };


  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <form onSubmit={handleSubmit} className='bg-zinc-900 p-6  rounded-lg shadow-md w-full max-w-md'>
        <h1 className='text-center text-2xl font-semibold mb-6 '>
          Cadastro
        </h1>
        <div className='flex flex-wrap -mx-3'>
          <div className='w-full md:w-1/2 px-3 mb-4'>
            <label htmlFor="Nome" className="block text-gray-100">Nome:</label>
            <input
              className='form-input w-full rounded-xl p-2 border border-gray-300 bg-zinc-600'
              type="text"
              id="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>
          <div className='w-full md:w-1/2 px-3 mb-4'>
            <label htmlFor="email" className="block text-gray-100">Email:</label>
            <input
              className='form-input w-full rounded-xl p-2 border border-gray-300 bg-zinc-600'
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='w-full md:w-1/2 px-3 mb-4'>
            <label htmlFor="password" className="block text-gray-100">Senha:</label>
            <input
              className='form-input w-full rounded-xl p-2 border border-gray-300 bg-zinc-600'
              type="password"
              id="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>
          <div className='w-full md:w-1/2 px-3 mb-4'>
            <label htmlFor="tel" className="block text-gray-100">Telefone:</label>
            <input
              className='form-input w-full rounded-xl p-2 border border-gray-300 bg-zinc-600'
              type="tel"
              id="tel"
              value={tel}
              onChange={(e) => setTel(e.target.value)}
              required
            />
          </div>
          <div className='w-full md:w-1/2 px-3 mb-4'>
            <label htmlFor="endereco" className="block text-gray-100">Endereço:</label>
            <input
              className='form-input w-full rounded-xl p-2 border border-gray-300 bg-zinc-600'
              type="text"
              id="endereco"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              required
            />
          </div>
          <div className='w-full md:w-1/2 px-3 mb-4'>
            <label htmlFor="cpf" className="block text-gray-100">CPF:</label>
            <input
              className='form-input w-full rounded-xl p-2 border border-gray-300 bg-zinc-600'
              type="text"
              id="cpf"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              required
            />
          </div>
          <div className='w-full md:w-1/2 px-3 mb-4'>
            <label htmlFor="cep" className="block text-gray-100">CEP:</label>
            <input
              className='form-input w-full rounded-xl p-2 border border-gray-300 bg-zinc-600'
              type="text"
              id="cep"
              value={cep}
              onChange={(e) => setCep(e.target.value)}
              required
            />
          </div>
          <div className='w-full px-3 mb-4'>
            <label className="block text-gray-100 mb-2">Tipo:</label>
            <div className="flex items-center">
              <input
                type="radio"
                id="Cliente"
                name="tipo"
                value="Cliente"
                checked={tipo === 'Cliente'}
                onChange={(e) => setTipo(e.target.value)}
                className="form-radio"
              />
              <label htmlFor="Cliente" className="ml-2">Cliente</label>
            </div>
            <div className="flex items-center mt-2">
              <input
                type="radio"
                id="Ambos"
                name="tipo"
                value="Ambos"
                checked={tipo === 'Ambos'}
                onChange={(e) => setTipo(e.target.value)}
                className="form-radio"
              />
              <label htmlFor="Ambos" className="ml-2">Vendedor</label>
            </div>
          </div>
        </div>
        <div className='flex justify-between mt-6'>
          <a href='../../' className='bg-gray-500 text-white rounded-full py-2 px-4 hover:bg-gray-600 text-center'>Cancelar</a>
          <button type="submit" className='bg-blue-500 text-white rounded-full py-2 px-4 hover:bg-blue-600'>Cadastrar-se --&gt;</button>
        </div>
        {error &&
          <div className="error text-red-600 font-semibold text-center mt-5">
            {error}
          </div>}
      </form>
    </main>
  );
}