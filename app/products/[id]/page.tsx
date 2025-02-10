import Modal from '@/components/Modal';
import PriceInfoCard from '@/components/PriceInfoCard';
import ProductCard from '@/components/ProductCard';
import { getProductId, getSimilarProducts } from '@/lib/actions';
import { formatNumber } from '@/lib/utils';
import { Product } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import Footer from "@/components/Footer";

type Props = Promise<{
  params: { id: string };
}>;

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  // Fetch product and similar products
  const product: Product | null = await getProductId(id);
  const similarProducts = await getSimilarProducts(id); // Await the promise to get the array

  // Check if product is found, else redirect
  if (!product) {
    redirect('/404');
    return null; // Ensure that nothing renders if the product is not found
  }

  return (
    <>
    <div className="product-container">
      <div className="flex gap-28 xl:flex-row flex-col">
        <div className="product-image">
          <Image
            src={product.image}
            alt={product.title}
            width={400}
            height={400}
            className="mx-auto"
          />
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-start gap-5 flex-wrap pb-6">
            <div className="flex flex-col gap-3">
              <p className="text-[28px] text-secondary font-semibold">
                {product.title}
              </p>
            </div>            
          </div>

          <div className="product-info">
            <div className="flex flex-col gap-2">
              <p className="text-[34px] text-secondary font-bold">
                {product.currency} {formatNumber(product.currentPrice)}
              </p>
            
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex gap-3">
                <div className="product-stars">
                  <Image
                    src={'/assets/icons/star.svg'}
                    alt="stars"
                    width={16}
                    height={16}
                  />
                  <p className="text-sm text-primary-orange font-semibold">
                    {product.stars || '25'}
                  </p>
                </div>
                <div className="product-reviews">
                  <Image
                    src={'/assets/icons/comment.svg'}
                    alt="comment"
                    width={16}
                    height={16}
                  />
                  <p className="text-sm text-secondary font-semibold">
                    {product.reviewsCount || '80'} Reviews
                  </p>
                </div>
              </div>
              <p className="text-sm text-black opacity-50">
                <span className="text-primary-green font-semibold">93%</span> of
                buyers have recommend this!
              </p>
            </div>
          </div>
          <div className="my-7 flex flex-col gap5">
            <div className="flex gap-5 flex-wrap">
              <PriceInfoCard
                title={'Current Price'}
                iconSrc="/assets/icons/price-tag.svg"
                value={`${product.currency} ${formatNumber(
                  product.currentPrice
                )}`}
              />
              <PriceInfoCard
                title={'Average Price'}
                iconSrc="/assets/icons/chart.svg"
                value={`${product.currency} ${formatNumber(
                  product.averagePrice
                )}`}
              />
              <PriceInfoCard
                title={'Highest Price'}
                iconSrc="/assets/icons/arrow-up.svg"
                value={`${product.currency} ${formatNumber(
                  product.highestPrice
                )}`}
              />
              <PriceInfoCard
                title={'Lowest Price'}
                iconSrc="/assets/icons/arrow-down.svg"
                value={`${product.currency} ${formatNumber(
                  product.lowestPrice
                )}`}
              />
            </div>
          </div>

          <Modal productId={id} />

          <div className="my-2"></div>{" "}            
            {/* Buy Now Button */}
            <button className="btn flex items-center justify-center gap-3 min-w-[200px]">
              <Image
                src="/assets/icons/bag.svg"
                alt="check"
                width={22}
                height={22}
              />
              <Link
                href={product.url}
                target="_blank"
                className="text-base text-white"
              >
                Buy Now
              </Link>
            </button>
        </div>
      </div>

      

      {similarProducts && similarProducts.length > 0 && (
        <div className="py-14 flex flex-col gap-2 w-full">
          <p className="section-text">Other Products</p>
          <div className="flex flex-wrap gap-10 mt-7 w-full">
            {similarProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>

    {/* Footer */}
    <Footer />
    
  </>  
  );
};

export default Page;
