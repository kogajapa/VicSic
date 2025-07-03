
import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface ConsultTypeDropdownProps {
  onSelect: (type: string) => void;
  selectedType?: string | null;
}

const consultTypes = [
  'Primeira consulta',
  'Retorno',
  'Avaliação',
  'Acompanhamento',
  'Laudo'
];

export function ConsultTypeDropdown({ onSelect, selectedType }: ConsultTypeDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white border border-gray-300 rounded text-left px-4 py-2.5 flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
      >
        <span className={selectedType ? 'text-gray-900' : 'text-gray-500'}>
          {selectedType || 'Selecionar tipo'}
        </span>
        <ChevronDown className="w-5 h-5 text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200">
          <ul className="py-1">
            {consultTypes.map((type) => (
              <li
                key={type}
                onClick={() => {
                  onSelect(type);
                  setIsOpen(false);
                }}
                className="px-3 py-2 hover:bg-gray-50 cursor-pointer"
              >
                {type}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
