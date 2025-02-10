import axios from 'axios';
import * as cheerio from 'cheerio';
import { extractCurrency, extractDescription, extractPrice } from '../utils';
import { log } from 'console';

export async function scrapeAmazonProduct(url: string) {
  if (!url) {
    throw new Error('Please enter a valid Amazon product link');
  }

  //bright data proxy configuration
  const username = String(process.env.BRIGHT_DATA_USERNAME);
  const password = String(process.env.BRIGHT_DATA_PASSWORD);
  const port = 22225;
  const session_id = (1000000 * Math.random()) | 0;
  const options = {
    auth: {
      username: `${username}-session-${session_id}`,
      password: password,
    },
    host: 'brd.superproxy.io',
    port,
    rejectUnauthorized: false,
  };

  try {
    // fetch the product page
    const response = await axios.get(url, options);
    const $ = cheerio.load(response.data);

    // extract product details
    const title = $('#productTitle').text().trim();
    const currentPrice = extractPrice(
      $('.priceToPay span.a-price-whole'),
      $('a.size.base.a-color-price'),
      $('.a-button-selected .a-color-base')
    );

    const originalPrice = extractPrice(
      $('#priceblock_ourprice'),
      $('#priceblock_dealprice'),
      $('.a-price.a-text-price span.a-offscreen'),
      $('#listPrice'),
      $('.a-size-base.a-color-price')
    );

    const outOfStock = $('#availability span')
      .text()
      .trimEnd()
      .toLowerCase()
      .includes('Currently unavailable');

    const image =
      $('#imgBlkFront').attr('data-a-dynamic-image') ||
      $('#landingImage').attr('data-a-dynamic-image') ||
      '{}';

    const imageUrls = Object.keys(JSON.parse(image));

    const currency = extractCurrency($('.a-price-symbol'));

    const discountRate = $('.savingsPercentage').text().replace(/[-%]/g, '');

    const description = extractDescription($);

    //construct data object with extracted details
    const data = {
      url,
      currency: currency || '₹',
      image: imageUrls[0],
      title,
      currentPrice: Number(currentPrice) || Number(originalPrice),
      originalPrice: Number(originalPrice) || Number(currentPrice),
      priceHistory: [],
      discountRate: Number(discountRate),
      category: 'category',
      reviewsCount: 0,
      stars: 0,
      isOutOfStock: outOfStock,
      description: description,
      lowestPrice: Number(currentPrice) || Number(originalPrice),
      highestPrice: Number(originalPrice) || Number(currentPrice),
      averagePrice: (Number(currentPrice) + Number(originalPrice)) / 2,
    };

    return data;
  } catch (error: any) {
    throw new Error('Failed to fetch product details', error.message);
  }
}
