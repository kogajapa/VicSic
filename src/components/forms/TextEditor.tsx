
import { useState } from 'react';

interface TextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export function TextEditor({ content, onChange }: TextEditorProps) {
  const [focused, setFocused] = useState(false);
  const placeholder = 'Digite ou cole o texto da consulta aqui...';
  const isEmpty = content.trim() === '' || content === placeholder;

  const handleFocus = () => {
    setFocused(true);
    if (content === placeholder) {
      onChange('');
    }
  };

  const handleBlur = () => {
    setFocused(false);
    if (content.trim() === '') {
      onChange(placeholder);
    }
  };

  const handleChange = (e: React.FormEvent<HTMLDivElement>) => {
    onChange(e.currentTarget.textContent || '');
  };

  return (
    <div
      contentEditable
      onFocus={handleFocus}
      onBlur={handleBlur}
      onInput={handleChange}
      className={`min-h-[200px] border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary ${
        isEmpty && !focused ? 'text-gray-400' : 'text-gray-900'
      }`}
      suppressContentEditableWarning={true}
    >
      {isEmpty && !focused ? placeholder : content}
    </div>
  );
}
