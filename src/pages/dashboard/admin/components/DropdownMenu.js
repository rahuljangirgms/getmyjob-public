import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function DropdownMenu({ title, items }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-200 transition"
      >
        {title} <ChevronDown size={16} />
      </button>
      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-white shadow-md rounded-md p-2">
          {items.map((item, index) => (
            <div
              key={index}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
