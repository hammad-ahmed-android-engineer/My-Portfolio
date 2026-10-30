"use client";

import React, { useState } from "react";
import { Plus, X } from "lucide-react";

interface ItemListInputProps {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
  helperText?: string;
}

export function ItemListInput({
  label,
  items = [],
  onChange,
  placeholder = "Type item and press Enter...",
  helperText,
}: ItemListInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleAddItem = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    onChange([...items, trimmed]);
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddItem();
    }
  };

  const handleRemoveItem = (index: number) => {
    onChange(items.filter((_, idx) => idx !== index));
  };

  const handleUpdateItem = (index: number, newValue: string) => {
    const updated = [...items];
    updated[index] = newValue;
    onChange(updated);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-[11px] font-medium text-zinc-400">{label}</label>
        <span className="text-[10px] text-zinc-500 font-mono">({items.length} items)</span>
      </div>

      {/* Input row */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 px-3 py-1.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 placeholder-zinc-600 focus:border-emerald-500 outline-none"
        />
        <button
          type="button"
          onClick={handleAddItem}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-emerald-400 text-xs font-semibold transition shrink-0 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add</span>
        </button>
      </div>

      {helperText && <p className="text-[10px] text-zinc-500">{helperText}</p>}

      {/* Items list / badges */}
      {items.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 group"
            >
              <input
                type="text"
                value={item}
                onChange={(e) => handleUpdateItem(idx, e.target.value)}
                className="bg-transparent border-none outline-none text-xs text-zinc-200 min-w-[60px]"
              />
              <button
                type="button"
                onClick={() => handleRemoveItem(idx)}
                className="text-zinc-500 hover:text-red-400 transition cursor-pointer"
                title="Remove item"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

