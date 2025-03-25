"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { Coffee } from "@/lib/types"
import Image from "next/image"

export default function LandingPage() {
  const [coffees, setCoffees] = useState<Coffee[]>([])
  const [filteredCoffees, setFilteredCoffees] = useState<Coffee[]>([])
  const [activeFilter, setActiveFilter] = useState<"ALL" | "HOT" | "COLD">("ALL")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCoffees = async () => {
      try {
        setIsLoading(true)
        const url =
          activeFilter === "ALL"
            ? "http://localhost:8080/coffee"
            : `http://localhost:8080/coffee?coffeeType=${activeFilter}`

        const response = await fetch(url)
        const data = await response.json()
        setCoffees(data)
        setFilteredCoffees(data)
      } catch (error) {
        console.error("Error fetching coffee data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCoffees()
  }, [activeFilter])

  const handleFilterChange = (filter: "ALL" | "HOT" | "COLD") => {
    setActiveFilter(filter)
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md py-4 px-6 sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold text-green-700"
          >
            SPRING
          </motion.div>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <a href="#" className="text-gray-700 hover:text-green-700 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#menu" className="text-gray-700 hover:text-green-700 transition-colors">
                  Menu
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-green-700 transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-green-700 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section with Video Background */}
      <section className="relative h-[80vh] overflow-hidden">
        <video
        src="/hero.mp4" 
        autoPlay 
        loop 
        muted
        playsInline
        className="absolute w-full h-full object-cover"> 
        </video>
        <div className="absolute inset-0 bg-transparent bg-opacity-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center text-white px-4"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Welcome to Spring Coffee</h1>
            
            <p className="text-xl md:text-2xl mb-8">Brewing perfection in every cup</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition-colors"
            >
              Order Now
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Coffee Menu Section */}
      <section id="menu" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Our Coffee Selection</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our handcrafted coffee drinks made with premium beans and expert brewing techniques.
            </p>
          </motion.div>

          {/* Filter Buttons */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex rounded-md shadow-sm" role="group">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleFilterChange("ALL")}
                className={`px-6 py-2 text-sm font-medium rounded-l-lg ${
                  activeFilter === "ALL" ? "bg-green-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                All
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleFilterChange("HOT")}
                className={`px-6 py-2 text-sm font-medium ${
                  activeFilter === "HOT" ? "bg-green-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                Hot
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleFilterChange("COLD")}
                className={`px-6 py-2 text-sm font-medium rounded-r-lg ${
                  activeFilter === "COLD" ? "bg-green-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                Cold
              </motion.button>
            </div>
          </div>

          {/* Coffee Cards */}
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <AnimatePresence>
                {filteredCoffees.map((coffee) => (
                  <motion.div
                    key={coffee.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ y: -10, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-xl overflow-hidden shadow-lg"
                  >
                    <div className="h-48 bg-gray-200 relative">
                      <div
                        className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${
                          coffee.coffeeType === "COLD" ? "bg-blue-100 text-blue-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {coffee.coffeeType}
                      </div>
                      <div className="w-full h-full">
                        <Image
                          src={`/coffee-${(coffee.id % 3) + 1}.jpg`}
                          fill
                          
                          alt={coffee.name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{coffee.name}</h3>
                      <p className="text-gray-600 mb-4">{coffee.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-green-700">${coffee.price.toFixed(2)}</span>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
                        >
                          Add to Cart
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">SPRING</h3>
              <p className="text-gray-400">
                Brewing the perfect cup since 2010. Our mission is to provide the highest quality coffee experience.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Hours</h3>
              <ul className="text-gray-400">
                <li className="mb-2">Monday - Friday: 6am - 8pm</li>
                <li className="mb-2">Saturday: 7am - 8pm</li>
                <li className="mb-2">Sunday: 7am - 6pm</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <ul className="text-gray-400">
                <li className="mb-2">123 Coffee Street</li>
                <li className="mb-2">Brewville, CA 90210</li>
                <li className="mb-2">info@springcoffee.com</li>
                <li className="mb-2">(555) 123-4567</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Spring Coffee. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

