import { useState } from 'react';
import { History } from 'lucide-react';

export default function Calculator() {
  const [display, setDisplay] = useState('');
  const [operation, setOperation] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const handleButtonClick = (value: string) => {
    if (value === '=') {
      try {
        const expression = display.replace(/%/g, '/100');
        const result = eval(expression);
        const operationText = `${expression} = ${result}`;

        setOperation(operationText);
        setDisplay(String(result));
        setHistory(prev => [...prev, operationText]);
      } catch {
        setDisplay('Error');
        setOperation('');
      }
    } else if (value === 'C') {
      setDisplay('');
      setOperation('');
    } else if (value === '<') {
      setDisplay(prev => prev.slice(0, -1));
    } else {
      setDisplay(prev => prev + value);
    }
  };

  const buttons = [
    'C', '%', '<', '/',
    '7', '8', '9', '*',
    '4', '5', '6', '-',
    '1', '2', '3', '+',
    '0', '.', '=',
  ];

  const isOperator = (btn: string) => ['=', '*', '/', '-', '+', 'C', '<', '%'].includes(btn);

  return (
    <div className="relative flex gap-4">
      <div className="w-[370px] bg-[#1a1b28] rounded-2xl shadow-2xl p-6 transition-all duration-300 hover:shadow-purple-500/20">
        <div className="flex justify-between items-center mb-4">
          <div className="text-xs text-gray-400 font-mono">Python GUI Calculadora</div>
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="text-2xl text-white hover:text-purple-400 transition-colors p-2 hover:bg-[#1e2435] rounded-lg"
          >
            <History size={20} />
          </button>
        </div>

        <div className="mb-2 h-8 px-2 text-right text-sm text-gray-400">
          {operation}
        </div>

        <input
          type="text"
          value={display}
          readOnly
          className="w-full h-16 px-4 mb-4 text-3xl text-right bg-[#1a1b28] text-white border-0 outline-none rounded-lg"
          placeholder="0"
        />

        <div className="grid grid-cols-4 gap-2">
          {buttons.map((btn, idx) => (
            <button
              key={idx}
              onClick={() => handleButtonClick(btn)}
              className={`
                h-14 rounded-lg font-medium text-lg transition-all duration-200
                ${btn === '=' ? 'col-span-2' : ''}
                ${isOperator(btn)
                  ? 'bg-[#722a66] hover:bg-[#8a3479] text-white font-bold shadow-lg hover:shadow-purple-500/50 hover:scale-105'
                  : 'bg-[#1e2435] hover:bg-[#2a3247] text-white hover:scale-105'
                }
                active:scale-95
              `}
            >
              {btn === '<' ? '⌫' : btn}
            </button>
          ))}
        </div>
      </div>

      <div
        className={`
          transition-all duration-300 ease-in-out overflow-hidden
          ${showHistory ? 'w-64 opacity-100' : 'w-0 opacity-0'}
        `}
      >
        <div className="w-64 h-[500px] bg-[#111827] rounded-2xl shadow-2xl p-4">
          <h3 className="text-white font-semibold mb-3 text-sm">Historial</h3>
          <div className="space-y-2 overflow-y-auto h-[calc(100%-2rem)] scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-gray-800">
            {history.length === 0 ? (
              <p className="text-gray-500 text-sm">Sin operaciones</p>
            ) : (
              history.map((item, idx) => (
                <div
                  key={idx}
                  className="text-gray-300 text-sm p-2 bg-[#1a1b28] rounded hover:bg-[#722a66] transition-colors cursor-pointer"
                >
                  {item}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
