const Footer = () => {
    return (
      <footer className="bg-black text-white py-8 px-20">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-start gap-4">
          {/* Product Section */}
          <div className="mb-6 md:mb-0 px-4">
            <h4 className="text-lg font-bold mb-8">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/whats-new" className="hover:underline">
                  What’s New?
                </a>
              </li>
              <li>
                <a href="/pricing" className="hover:underline">
                  Pricing
                </a>
              </li>
              <li>
                <a href="/affiliate-program" className="hover:underline">
                  Affiliate Program
                </a>
              </li>
            </ul>
          </div>
  
          {/* Company Section */}
          <div className="mb-6 md:mb-0 px-4">
            <h4 className="text-lg font-bold mb-8">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/about-us" className="hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact-us" className="hover:underline">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/support" className="hover:underline">
                  Support
                </a>
              </li>
              <li>
                <a href="/faqs" className="hover:underline">
                  FAQs
                </a>
              </li>
              <li>
                <a href="/privacy-policy" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms-and-conditions" className="hover:underline">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>
  
          {/* Social Media Section */}
          <div className="flex space-x-4 mt-6 md:mt-0 px-4">
            <a href="https://x.com" target="_blank" rel="noopener noreferrer">
              <img src="/assets/icons/twitter.svg" alt="Twitter" className="w-4 h-4" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <img src="/assets/icons/instagram.svg" alt="Instagram" className="w-4 h-4" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <img src="/assets/icons/youtube.svg" alt="YouTube" className="w-4 h-4" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <img src="/assets/icons/linkedin.svg" alt="LinkedIn" className="w-4 h-4" />
            </a>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  