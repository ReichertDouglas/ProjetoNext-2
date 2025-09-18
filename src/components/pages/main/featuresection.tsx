export default function FeatureSection() {
  return (
    <section className="w-full bg-white py-12 md:py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">
          Funcionalidades Incríveis
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
          Descubra como nosso produto pode transformar sua rotina com ferramentas poderosas e fáceis de usar.
        </p>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center p-6 bg-slate-50 rounded-xl shadow-md transition-all duration-300 
                            ease-in-out hover:(bg-white shadow-xl -translate-y-2)">
            <div className="bg-blue-100 p-3 rounded-full">
              <p className='text-blue-600'> UI </p>
            </div>
            <h3 className="mt-4 text-xl font-semibold text-slate-800">
              Interface Intuitiva
            </h3>
            <p className="mt-2 text-slate-600">
              Design limpo e navegação simples para que você comece a usar em minutos, sem complicações.
            </p>
          </div>
          <div className="flex flex-col items-center p-6 bg-slate-50 rounded-xl shadow-md transition-all duration-300 ease-in-out hover:(bg-white shadow-xl -translate-y-2)">
            <div className="bg-green-100 p-3 rounded-full">
              <p className='text-green-600'> Segurança </p>
            </div>
            <h3 className="mt-4 text-xl font-semibold text-slate-800">
              Segurança Robusta
            </h3>
            <p className="mt-2 text-slate-600">
              Seus dados estão protegidos com criptografia de ponta e as melhores práticas de segurança.
            </p>
          </div>
          <div className="flex flex-col items-center p-6 bg-slate-50 rounded-xl shadow-md transition-all duration-300 ease-in-out hover:(bg-white shadow-xl -translate-y-2)">
            <div className="bg-rose-100 p-3 rounded-full">
              <p className='text-rose-600'> Performance </p>
            </div>
            <h3 className="mt-4 text-xl font-semibold text-slate-800">
              Performance Otimizada
            </h3>
            <p className="mt-2 text-slate-600">
              Execute tarefas complexas em tempo recorde com nossa infraestrutura de alta velocidade.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}