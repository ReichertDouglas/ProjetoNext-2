export async function fetchAddressByCep(cep: string) {
  const cepClean = cep.replace(/\D/g, "");

  if (cepClean.length !== 8) {
    throw new Error("CEP inválido.");
  }

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cepClean}/json/`);
    const data = await response.json();

    if (data.erro) {
      throw new Error("CEP não encontrado.");
    }

    return {
      address: data.logradouro || "",
      city: data.localidade || "",
      state: data.uf || "",
    };
  } catch (error) {
    console.error("Erro ao buscar CEP:", error);
    throw new Error("Erro ao buscar CEP.");
  }
}
