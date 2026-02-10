import { Github, Home, Calculator as CalcIcon, Code2, Sparkles } from "lucide-react";
import Calculator from "./components/Calculator";
import CodeBlock from "./components/CodeBlock";

function App() {
  return (
    <div
      id="inicio"
      className="min-h-screen bg-gradient-to-br from-gray-900 via-[#1a1b28] to-gray-900 scroll-mt-24"
    >
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#111827]/80 backdrop-blur-md border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-2 rounded-lg">
                <CalcIcon size={24} className="text-white" />
              </div>
              <span className="text-white font-bold text-xl">
                Python GUI Calculator
              </span>
            </div>

            <div className="flex gap-3">
              {/* INICIO */}
              <a
                href="https://yordinz.github.io/PORTFOLIO/#projects"
                className="flex items-center gap-2 px-6 py-2.5 bg-[#1e2435] hover:bg-[#2a3247] text-white rounded-lg transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <Home size={18} />
                <span className="font-medium">Portafolio</span>
              </a>

              {/* GITHUB */}
              <a
                href="https://github.com/YordinZ/Python-React-GUI-Calculator"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-2.5 bg-[#722a66] hover:bg-[#8a3479] text-white rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg hover:shadow-purple-500/50"
              >
                <Github size={18} />
                <span className="font-medium">GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* MAIN */}
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* HERO */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600/20 border border-purple-500/30 rounded-full mb-6">
              <Sparkles size={16} className="text-purple-400" />
              <span className="text-purple-300 text-sm font-medium">
                Demo Interactiva
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              Calculadora Python + Tkinter
            </h1>

            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Interfaz gráfica moderna con funciones avanzadas: historial de
              operaciones, sidebar animado y diseño responsivo.
              Desarrollada con arquitectura limpia y orientada a objetos.
            </p>
          </div>

          {/* DEMO */}
          <section className="mb-20">
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1e2435] rounded-lg">
                <CalcIcon size={18} className="text-purple-400" />
                <span className="text-white font-medium">Demo en Vivo</span>
              </div>
            </div>

            <div className="flex justify-center">
              <Calculator />
            </div>
          </section>

          {/* CODE */}
          <section className="mb-20">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1e2435] rounded-lg mb-4">
                <Code2 size={18} className="text-purple-400" />
                <span className="text-white font-medium">Código Fuente</span>
              </div>
              <p className="text-gray-400">
                Implementación completa en Python con Tkinter
              </p>
            </div>

            <CodeBlock />
          </section>

          {/* FEATURES */}
          <section className="text-center">
            <div className="max-w-3xl mx-auto p-8 bg-gradient-to-br from-purple-600/10 to-pink-600/10 border border-purple-500/20 rounded-2xl">
              <h2 className="text-2xl font-bold text-white mb-4">
                Características Técnicas
              </h2>

              <div className="grid md:grid-cols-3 gap-6 text-left">
                <div className="p-4 bg-[#1a1b28] rounded-lg border border-gray-800/50 hover:border-purple-500/50 transition-colors">
                  <div className="text-3xl mb-2">🎨</div>
                  <h3 className="text-white font-semibold mb-2">
                    Diseño Moderno
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Tema oscuro personalizado con animaciones fluidas
                  </p>
                </div>

                <div className="p-4 bg-[#1a1b28] rounded-lg border border-gray-800/50 hover:border-purple-500/50 transition-colors">
                  <div className="text-3xl mb-2">📊</div>
                  <h3 className="text-white font-semibold mb-2">
                    Historial
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Sistema de registro con sidebar animado
                  </p>
                </div>

                <div className="p-4 bg-[#1a1b28] rounded-lg border border-gray-800/50 hover:border-purple-500/50 transition-colors">
                  <div className="text-3xl mb-2">⚡</div>
                  <h3 className="text-white font-semibold mb-2">
                    OOP
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Arquitectura orientada a objetos escalable
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-gray-800/50 py-8 text-center text-gray-500">
        <p>Desarrollado con Python, Tkinter y mucho cafecito ☕</p>
      </footer>
    </div>
  );
}

export default App;
