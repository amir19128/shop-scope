'use client';

interface Props {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

const SearchInput = ({ value = '', onChange, placeholder = 'جستجو...' }: Props) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      placeholder={placeholder}
      className=""
    />
  );
};

export default SearchInput;
