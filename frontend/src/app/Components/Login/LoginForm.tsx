"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [loading, setloading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setloading(true);
    // Aqui você pode enviar os dados de login para a sua API
    try {
      // Coloque aqui a lógica de autenticação
      console.log("Email:", email);
      console.log("Senha:", senha);

      const result = await signIn("credentials", {
        email,
        password: senha,
      });
      const user = (result as any)?.user;

      if (user) {
        console.log("User:", user); // Verifique se o campo tipo está presente
        if (user.tipo === "Vendedor") router.push("/Sellers/Dashboard");
        if (user.tipo === "Ambos") router.push("/Sellers/Dashboard");
        if (user.tipo === "Cliente") router.push("/");
        return user;
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error: any) {
      console.error("Erro ao fazer login:", error);
      setError(error.message);
    } finally {
      setloading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-zinc-950 p-5 m-5 rounded-lg w-4/12"
    >
      <h1 className="text-center text-2xl font-semibold mt-5">Login</h1>
      <div className="my-2 px-5 justify-self-center">
        <label htmlFor="email">Email:</label>
        <input
          className="form-input rounded-full ms-3 p-2 ps-4 my-4 text-black font-bold w-10/12"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="my-2 px-5">
        <label htmlFor="password">Senha:</label>
        <input
          className="form-input rounded-full ms-2 p-2 ps-4 my-4 text-black font-bold w-10/12"
          type="password"
          id="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
      </div>

      <div className="flex justify-center mt-5">
        <div className="flex justify-center mt-5 bg-zinc-700 h-10 w-6/12 rounded-full transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-300">
          <button type="submit">Login</button>
        </div>
      </div>
      <div className="flex justify-center mt-5">
        <div className="flex justify-center mt-5 bg-zinc-700 h-10 w-6/12 rounded-full transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-300">
          <a href="../../" className="mt-2">
            Cancelar
          </a>
        </div>
      </div>
      {/* loading msg */}
      {loading && (
        <div>
          <FontAwesomeIcon icon={faSpinner} className="animate-spin text-xl" />
        </div>
      )}
      {/* error message */}
      {error && (
        <div className="error text-red-600 font-semibold text-center mt-5">
          {error}
        </div>
      )}
    </form>
  );
}

// response = await axios.post('http://localhost:5000/Users/Post/Login', {
//     email,
//     senha
// });
