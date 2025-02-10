import HeroCarousel from '@/components/HeroCarousel';
import SearchBar from '@/components/SearchBar';
import Image from 'next/image';
import React from 'react';
import { getAllProducts } from '@/lib/actions';
import ProductCard from '@/components/ProductCard';
import Footer from "@/components/Footer";

const Home = async () => {
  const allProducts = await getAllProducts();

  return (
    <>
      <section className="px-6 md:px-20 py-24">
        <div className="flex max-xl:flex-col gap-16">
          <div className="flex flex-col justify-center">
            <p className="small-text">
              Smart Shopping Starts Here:
              <Image
                src={'/assets/icons/arrow-right.svg'}
                alt="arrow-right"
                width={16}
                height={16}
              />
            </p>

            <h1 className="head-text">
              Unleash the Power of
              <span className="text-primary"> TrackySpy</span>
            </h1>

            <p className="mt-6 ">
              Powerful, self-hosted price tracking tool to help you 
              save money on your favorite products.
            </p>

            <SearchBar />

          </div>

          <HeroCarousel />

        </div>
      </section>


      <section className="trending-section">
        <h2 className="section-text">Trending</h2>

        <div className="flex flex-wrap gap-x-24 gap-y-16">
          {allProducts?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>



      {/* Customer Reviews Section */}
      <section className="reviews-section py-24 px-6 md:px-20 bg-gray-50">
        <h2 className="section-text text-center mb-12">
          What customers say about us!
        </h2>
        <div className="flex flex-col md:flex-row gap-8 justify-center">
          <div className="review-card bg-white shadow-lg p-6 rounded-lg hover:shadow-md transition-all duration-200 ease-in-out transform hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <Image
                  src="/assets/avatar1.jpeg"
                  alt="Alice Johnson"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div>
                  <h3 className="font-semibold">Alice Johnson</h3>
                  <p className="text-sm text-gray-500">Posted 2 days ago</p>
                </div>
              </div>
              <div className="flex items-center text-yellow-400">
                <span>★★★★★</span>
              </div>
            </div>
            <p className="text-gray-700">
              I love using Price Wise for tracking discounts. It's saved me so
              much money!
            </p>
          </div>

          <div className="review-card bg-white shadow-lg p-6 rounded-lg hover:shadow-md transition-all duration-200 ease-in-out transform hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <Image
                  src="/assets/avatar2.jpeg"
                  alt="Michael Smith"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div>
                  <h3 className="font-semibold">Michael Smith</h3>
                  <p className="text-sm text-gray-500">Posted 5 days ago</p>
                </div>
              </div>
              <div className="text-yellow-400 flex items-center">
                <span>★★★★★</span>
              </div>
            </div>
            <p className="text-gray-700">
              This app is a game-changer! I always know when to buy at the best
              price.
            </p>
          </div>
        </div>
      </section>    

      {/* Footer component */}
      <Footer />
    </>
  );
};


export default Home;
