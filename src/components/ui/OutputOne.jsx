"use client"

export default function OutputOne() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-yellow-400 via-yellow-300 to-white py-16 px-4 md:px-0">
        <div className="container mx-auto max-w-4xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
              Discover the Best Deals on <span className="text-yellow-600">Top Products</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-6 max-w-xl">
              Shop our curated selection of high-quality products at unbeatable prices. Fast shipping, easy returns, and 24/7 customer support—just like Amazon.
            </p>
            <a
              href="#features"
              className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
            >
              Shop Now
            </a>
          </div>
          <div className="flex-1 flex justify-center md:justify-end">
            <img
              src="https://images.unsplash.com/photo-1513708927688-890fe8a1df19?auto=format&fit=crop&w=400&q=80"
              alt="Ecommerce Hero"
              className="rounded-xl shadow-xl w-80 h-80 object-cover border-4 border-yellow-200"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto max-w-4xl py-16 px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-10">
          Why Shop With Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center border-t-4 border-yellow-400">
            <svg className="h-10 w-10 text-yellow-500 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h2l1 2h13l1-2h2M5 12v6a2 2 0 002 2h10a2 2 0 002-2v-6" />
            </svg>
            <h3 className="font-semibold text-lg mb-2">Fast & Free Shipping</h3>
            <p className="text-gray-600">Get your orders delivered quickly and for free on all purchases over $25.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center border-t-4 border-yellow-400">
            <svg className="h-10 w-10 text-yellow-500 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="font-semibold text-lg mb-2">24/7 Customer Support</h3>
            <p className="text-gray-600">Our support team is always here to help you, day or night, just like Amazon.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center border-t-4 border-yellow-400">
            <svg className="h-10 w-10 text-yellow-500 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <h3 className="font-semibold text-lg mb-2">Easy Returns</h3>
            <p className="text-gray-600">Not satisfied? Return your product within 30 days for a full refund—no questions asked.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-200 py-8 mt-auto">
        <div className="container mx-auto max-w-4xl flex flex-col md:flex-row items-center justify-between px-4">
          <div className="mb-4 md:mb-0">
            <span className="font-bold text-yellow-400 text-xl">ShopPrime</span>
            <span className="ml-2 text-sm text-gray-400">&copy; {new Date().getFullYear()} All rights reserved.</span>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-yellow-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-yellow-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-yellow-400 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
} 