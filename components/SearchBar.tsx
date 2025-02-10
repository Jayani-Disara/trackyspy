'use client';

import { scrapeAndStoreProduct } from '@/lib/actions';
import { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const isValidAmazonURL = (url: string) => {
  try {
    const parsedURL = new URL(url);
    const hostname = parsedURL.hostname;

    if (
      hostname.includes('amazon.com') ||
      hostname.includes('amazon.in') ||
      hostname.includes('amazon')
    ) {
      return true;
    }
  } catch (error) {
    return false;
  }

  return false;
};

const SearchBar = () => {
  const [searchPrompt, setSearchPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter(); // Initialize Next.js router

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValidLink = isValidAmazonURL(searchPrompt);
    if (!isValidLink) {
      toast.error('Please enter a valid Amazon product link');
      return;
    }

    try {
      setIsLoading(true);
      const product = await scrapeAndStoreProduct(searchPrompt);

      if (product && product._id) {
        toast.success('Product added successfully');
        router.push(`/products/${product._id}`); // Redirect to product page
      } else {
        toast.error('Failed to retrieve product details');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while fetching the product');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="flex flex-wrap gap-4 mt-12" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter product link"
        className="searchbar-input"
        value={searchPrompt}
        onChange={(e) => setSearchPrompt(e.target.value)}
      />
      <button
        disabled={searchPrompt === '' || isLoading}
        type="submit"
        className="searchbar-btn"
      >
        {isLoading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
};

export default SearchBar;
