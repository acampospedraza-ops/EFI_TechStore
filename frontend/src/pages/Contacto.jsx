
function Contacto() {
  return (
    <main className="min-h-screen bg-slate-950 text-white px-6 py-14">
      <div className="max-w-5xl mx-auto">

        <div className="mb-12">
          <p className="text-violet-400 uppercase tracking-widest text-sm font-bold mb-3">
            Estamos para ayudarte
          </p>

          <h1 className="text-4xl md:text-5xl font-black mb-4">
            Contacto
          </h1>

          <p className="text-slate-400 text-lg">
            ¿Tenés alguna consulta? Podés comunicarte con nosotros.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">

          <section className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6">
              Información de contacto
            </h2>

            <div className="space-y-6">
              <div>
                <p className="text-violet-400 font-bold mb-1">📧 Email</p>
                <p className="text-slate-300">contacto@techstore.com</p>
              </div>

              <div>
                <p className="text-violet-400 font-bold mb-1">📍 Ubicación</p>
                <p className="text-slate-300">Río Cuarto, Córdoba, Argentina</p>
              </div>

              <div>
                <p className="text-violet-400 font-bold mb-1">🕒 Atención</p>
                <p className="text-slate-300">Lunes a viernes de 9:00 a 18:00</p>
              </div>
            </div>
          </section>

          <section className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4">
              TechStore
            </h2>

            <p className="text-slate-400 leading-relaxed mb-6">
              Somos una tienda dedicada a ofrecer productos tecnológicos,
              periféricos y accesorios para acompañarte en tus actividades.
            </p>

            <p className="text-violet-400 font-bold">
              Tecnología para todos.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}

export default Contacto;
