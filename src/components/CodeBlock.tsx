import { useMemo, useState } from "react";
import { Code2, Copy, Check } from "lucide-react";

type FileKey = "main.py" | "form_calculadora.py" | "util_ventana.py" | "constantes.py";

const FILES_ORDER: FileKey[] = [
  "main.py",
  "form_calculadora.py",
  "util_ventana.py",
  "constantes.py",
];

// 🔹 Pega aquí tus archivos (puedes recortar si quieres)
const CODE: Record<FileKey, string> = {
  "main.py": `# main.py
from form_calculadora import FormularioCalculadora

if __name__ == "__main__":
    app = FormularioCalculadora()
    app.mainloop()
`,
  "form_calculadora.py": `import tkinter as tk
from tkinter import font
from util import util_ventana
from config import constantes as cons

class FormularioCalculadora(tk.Tk):
    def __init__(self):
        super().__init__()
        self.historial = []
        self.sidebar_visible = False
        self.sidebar_width = 260
        self.sidebar = None

        self.construir_botones()
        self.configurar_grid()
        self.config_window()
        self.construir_widget()
        self.construir_menu_hamburguesa()

    def config_window(self):
        self.title('Python GUI Calculadora')
        self.resizable(True, True)
        self.configure(bg=cons.COLOR_DE_FONDO_DARK)
        self.attributes('-alpha', 0.96)

        w, h = 370, 570
        util_ventana.centrar_ventana(self, w, h)

    def configurar_grid(self):
        for col in range(5):
            self.columnconfigure(col, weight=1)
        for row in range(8):
            self.rowconfigure(row, weight=1)

    def construir_widget(self):
        self.operation_label = tk.Label(
            self, text="", anchor="e",
            bg=cons.COLOR_DE_FONDO_DARK,
            fg=cons.COLOR_DE_TEXTO_DARK,
            font=("Arial", 12)
        )
        self.operation_label.grid(row=0, column=0, columnspan=4, sticky="nsew", padx=10)

        self.entry = tk.Entry(
            self,
            font=("Arial", 26),
            justify="right",
            bg=cons.COLOR_CAJA_TEXTO_DARK,
            fg=cons.COLOR_DE_TEXTO_DARK,
            bd=0,
            insertbackground=cons.COLOR_DE_TEXTO_DARK
        )
        self.entry.grid(row=1, column=0, columnspan=4, sticky="nsew", padx=10, pady=5)

    def construir_botones(self):
        buttons = [
            'C', '%', '<', '/',
            '7', '8', '9', '*',
            '4', '5', '6', '-',
            '1', '2', '3', '+',
            '0', '.', '=',
        ]

        row_val, col_val = 2, 0
        roboto_font = font.Font(family="Roboto", size=16)

        for button in buttons:
            if button in ['=', '*', '/', '-', '+', 'C', '<', '%']:
                bg = cons.COLOR_BOTONES_ESPECIALES_DARK
                btn_font = font.Font(size=16, weight='bold')
            else:
                bg = cons.COLOR_BOTONES_DARK
                btn_font = roboto_font

            tk.Button(
                self,
                text=button,
                command=lambda b=button: self.on_button_click(b),
                bg=bg,
                fg=cons.COLOR_DE_TEXTO_DARK,
                relief=tk.FLAT,
                font=btn_font,
                bd=0,
                activebackground=cons.COLOR_BOTONES_ESPECIALES_DARK
            ).grid(
                row=row_val,
                column=col_val,
                columnspan=2 if button == '=' else 1,
                padx=5, pady=5,
                sticky="nsew"
            )

            col_val += 1
            if col_val > 3:
                col_val = 0
                row_val += 1

    def on_button_click(self, value):
        if value == '=':
            try:
                expression = self.entry.get().replace('%', '/100')
                result = eval(expression)

                self.entry.delete(0, tk.END)
                self.entry.insert(tk.END, str(result))

                operation = f"{expression} = {result}"
                self.operation_label.config(text=operation)
                self.historial.append(operation)

            except Exception:
                self.entry.delete(0, tk.END)
                self.entry.insert(tk.END, "Error")
                self.operation_label.config(text="")

        elif value == 'C':
            self.entry.delete(0, tk.END)
            self.operation_label.config(text="")

        elif value == '<':
            current = self.entry.get()
            self.entry.delete(0, tk.END)
            self.entry.insert(tk.END, current[:-1])

        else:
            self.entry.insert(tk.END, value)

    def construir_menu_hamburguesa(self):
        self.menu_button = tk.Button(
            self,
            text="☰",
            font=("Arial", 20, "bold"),
            bg=cons.COLOR_BOTONES_DARK,
            fg=cons.COLOR_DE_TEXTO_DARK,
            bd=0,
            activebackground=cons.COLOR_BOTONES_ESPECIALES_DARK,
            command=self.mostrar_historial
        )
        self.menu_button.grid(row=0, column=4, sticky="ne", padx=8, pady=5)

    def mostrar_historial(self):
        if self.sidebar_visible:
            self.ocultar_sidebar()
        else:
            self.mostrar_sidebar()
`,
  "util_ventana.py": `# util_ventana.py
import tkinter as tk

def centrar_ventana(ventana: tk.Tk, w: int, h: int):
    ventana.update_idletasks()
    sw = ventana.winfo_screenwidth()
    sh = ventana.winfo_screenheight()
    x = (sw - w) // 2
    y = (sh - h) // 2
    ventana.geometry(f"{w}x{h}+{x}+{y}")
`,
  "constantes.py": `# constantes.py
# Ajusta nombres/valores según tu proyecto real

COLOR_DE_FONDO_DARK = "#0b1220"
COLOR_DE_TEXTO_DARK = "#e5e7eb"
COLOR_CAJA_TEXTO_DARK = "#111827"

COLOR_BOTONES_DARK = "#1f2937"
COLOR_BOTONES_ESPECIALES_DARK = "#4f46e5"
`,
};

export default function CodeSection() {
  const [active, setActive] = useState<FileKey>("form_calculadora.py");
  const [copiedKey, setCopiedKey] = useState<FileKey | null>(null);

  const activeCode = useMemo(() => CODE[active] ?? "", [active]);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(activeCode);
      setCopiedKey(active);
      window.setTimeout(() => setCopiedKey(null), 1200);
    } catch {
      // si el navegador bloquea clipboard, no hacemos nada
    }
  };

  const isCopied = copiedKey === active;

  return (
    <section className="w-full max-w-5xl mx-auto px-4">
      <div className="bg-[#1a1b28] rounded-2xl shadow-2xl overflow-hidden border border-gray-800/50">
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 bg-[#111827] border-b border-gray-800">
          <div className="flex items-center gap-3">
            <Code2 className="text-purple-400" size={20} />
            <span className="text-white font-semibold">{active}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onCopy}
              type="button"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm
                         bg-gray-800 border border-gray-700 text-gray-200
                         hover:bg-gray-700 transition"
              aria-label="Copy code"
              title="Copy code"
            >
              {isCopied ? <Check size={16} /> : <Copy size={16} />}
              {isCopied ? "Copied" : "Copy"}
            </button>

            <div className="hidden sm:flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-3 sm:px-5 py-3 bg-[#0f172a] border-b border-gray-800 overflow-x-auto">
          <div className="flex items-center gap-2 min-w-max">
            {FILES_ORDER.map((key) => {
              const isActive = key === active;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActive(key)}
                  className={[
                    "px-3 py-1.5 rounded-lg text-sm border transition whitespace-nowrap",
                    isActive
                      ? "bg-purple-600/20 border-purple-500/40 text-purple-200"
                      : "bg-gray-900/40 border-gray-700 text-gray-300 hover:bg-gray-800/60",
                  ].join(" ")}
                >
                  {key}
                </button>
              );
            })}
          </div>
        </div>

        {/* Code */}
        <div className="relative">
          <pre className="overflow-x-auto overflow-y-auto max-h-96 p-6 text-sm leading-relaxed">
            <code className="text-gray-300 font-mono">{activeCode}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}
