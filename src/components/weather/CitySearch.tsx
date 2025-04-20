import React, { useState } from 'react';
import { Search, Loader } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

interface CitySearchProps {
  onSearch: (city: string) => void;
  isLoading: boolean;
}

export function CitySearch({ onSearch, isLoading }: CitySearchProps) {
  const [city, setCity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full gap-2">
      <div className="relative flex-grow">
        <Input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search for a city..."
          className="pl-10 pr-4 w-full"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
      </div>
      <Button type="submit" disabled={isLoading || !city.trim()}>
        {isLoading ? <Loader className="animate-spin" size={18} /> : 'Search'}
      </Button>
    </form>
  );
}