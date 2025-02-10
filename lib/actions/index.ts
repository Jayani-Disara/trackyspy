'use server';

import { revalidatePath } from 'next/cache';
import Product from '../models/product.models';
import { connectToDB } from '../mongoose';
import { scrapeAmazonProduct } from '../scraper';
import { getAveragePrice, getHighestPrice, getLowestPrice } from '../utils';
import { log } from 'node:console';
import { generateEmailBody, sendEmail } from '../nodemailer';
import { send } from 'node:process';
import { User } from '@/types';
import { toast } from 'react-toastify';

export async function scrapeAndStoreProduct(productUrl: string) {
  if (!productUrl) {
    throw new Error('Please enter a valid Amazon product link');
  }

  try {
    connectToDB();

    const scrapedProduct = await scrapeAmazonProduct(productUrl);
    if (!scrapedProduct) return;

    let product = scrapedProduct;

    const existingProduct = await Product.findOne({ url: scrapedProduct.url });

    if (existingProduct) {
      const updatedPriceHistory: any = [
        ...existingProduct.priceHistory,
        { price: scrapedProduct.currentPrice },
      ];

      product = {
        ...scrapedProduct,
        priceHistory: updatedPriceHistory,
        lowestPrice: getLowestPrice(updatedPriceHistory),
        highestPrice: getHighestPrice(updatedPriceHistory),
        averagePrice: getAveragePrice(updatedPriceHistory),
      };
    }

    const newProduct = await Product.findOneAndUpdate(
      { url: scrapedProduct.url },
      product,
      { upsert: true, new: true, returnDocument: 'after' } // Ensures updated document is returned
    );

    revalidatePath(`/products/${newProduct._id}`);
    return JSON.parse(JSON.stringify(newProduct));
  } catch (error: any) {
    throw new Error('Failed to fetch product details', error.message);
  }
}

export async function getProductId(productId: string) {
  try {
    connectToDB();
    const product = await Product.findOne({ _id: productId });

    if (!product) {
      throw new Error('Product not found');
    }

    return product;
  } catch (error: any) {
    console.log('Failed to fetch product details', error.message);
  }
}

export async function getAllProducts() {
  try {
    connectToDB();
    const products = await Product.find();

    return products;
  } catch (error: any) {
    console.log('Failed to fetch products', error.message);
  }
}

export async function getSimilarProducts(productId: string) {
  try {
    connectToDB();
    const currentProduct = await Product.findById(productId);

    if (!currentProduct) {
      throw new Error('Product not found');
    }

    const similarProducts = await Product.find({
      _id: { $ne: productId },
    }).limit(4);

    return similarProducts;
  } catch (error: any) {
    console.log('Failed to fetch products', error.message);
  }
}

export async function addUserEmailToProduct(
  productId: string,
  userEmail: string
) {
  try {
    const product = await Product.findById(productId);

    if (!product) {
      toast.error('Product not found');
      throw new Error('Product not found');
    }
    const userExists =
      product.users?.some((user: User) => user.email === userEmail) ?? false;

    if (!userExists) {
      product.users.push({ email: userEmail });
      await product.save();

      const emailContent = await generateEmailBody(product, 'WELCOME');

      await sendEmail(emailContent, [userEmail]);
    }
  } catch (error: any) {
    console.log('Failed to add user email to product: ', error.message);
  }
}
