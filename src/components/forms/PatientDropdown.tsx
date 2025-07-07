
import { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, User } from 'lucide-react';
import { Patient } from '@/types';

interface PatientDropdownProps {
  onSelect: (patient: Patient) => void;
  selectedPatient?: Patient | null;
}

const mockPatients: Patient[] = [
  { id: '12345', name: 'Mariana Costa' },
  { id: '12346', name: 'Pedro Almeida' },
  { id: '12347', name: 'Juliana Santos' },
  { id: '12348', name: 'Rafael Mendes' },
];

export function PatientDropdown({ onSelect, selectedPatient }: PatientDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredPatients = mockPatients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <span className={selectedPatient ? 'text-gray-900' : 'text-gray-500'}>
          {selectedPatient ? selectedPatient.name : 'Selecionar paciente'}
        </span>
        <ChevronDown className="w-5 h-5 text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 max-h-60 overflow-y-auto">
          <div className="p-2 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full bg-gray-50 border-none rounded-md text-sm focus:outline-none"
                placeholder="Buscar paciente..."
              />
            </div>
          </div>
          <ul className="py-1">
            {filteredPatients.map((patient) => (
              <li
                key={patient.id}
                onClick={() => {
                  onSelect(patient);
                  setIsOpen(false);
                  setSearchTerm('');
                }}
                className="px-3 py-2 hover:bg-gray-50 cursor-pointer flex items-center space-x-3"
              >
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="w-5 h-5 text-gray-500" />
                </div>
                <div>
                  <p className="font-medium">{patient.name}</p>
                  <p className="text-xs text-gray-500">ID: {patient.id}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
