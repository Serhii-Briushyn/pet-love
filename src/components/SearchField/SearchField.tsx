import { useState } from "react";

type SearchFieldProps = {
  onSearch: (value: string) => void;
};

const SearchField: React.FC<SearchFieldProps> = ({ onSearch }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(value.trim());
  };

  const handleClear = () => {
    setValue("");
    onSearch("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center w-full tablet:w-57.5"
    >
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full border border-black/15 rounded-main p-3 pr-15 outline-none transition-all duration-200 ease-in hover:border-primary focus:border-primary"
        />

        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {value && (
            <button
              type="button"
              onClick={handleClear}
              className=" cursor-pointer transition-all duration-200 ease-in hover:scale-120"
              aria-label="Clear search"
            >
              <svg className="w-4.5 h-4.5 stroke-black fill-amber-200">
                <use href="/sprite.svg#icon-close" />
              </svg>
            </button>
          )}

          <button
            type="submit"
            className=" cursor-pointer transition-all duration-200 ease-in hover:scale-120"
            aria-label="Search"
          >
            <svg className="w-4.5 h-4.5 stroke-black fill-none">
              <use href="/sprite.svg#icon-search" />
            </svg>
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchField;
