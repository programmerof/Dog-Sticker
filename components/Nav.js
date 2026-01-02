import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCartContext } from '@/context/Store'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

function Nav() {
  const cart = useCartContext()[0]
  const [cartItems, setCartItems] = useState(0)

  useEffect(() => {
    let numItems = 0
    cart.forEach(item => {
      numItems += item.variantQuantity
    })
    setCartItems(numItems)
  }, [cart])

  return (
    <header className="border-b border-palette-lighter sticky top-0 z-20 bg-white">
      <div className="flex items-center justify-between mx-auto max-w-6xl px-6 pb-2 pt-4 md:pt-6">
        <Link href="/" passHref legacyBehavior>
          <a className=" cursor-pointer">
            <h1 className="flex no-underline">
              <img height="32" width="32" alt="logo" className="h-8 w-8 mr-1 object-contain" src="/icon.svg" />
              <span className="text-xl font-primary font-bold tracking-tight pt-1">
                {process.env.siteTitle}
              </span>
            </h1>
          </a>
        </Link>
        <div>
          {/* // Update the cart section: */}
<Link href="/cart" passHref legacyBehavior>
  <a className="relative group" aria-label="cart">
    <div className="p-2 rounded-full hover:bg-palette-lighter transition-colors duration-200">
      <FontAwesomeIcon 
        className="text-palette-primary w-6 h-6 group-hover:scale-110 transition-transform" 
        icon={faShoppingCart} 
      />
      {cartItems > 0 && (
        <div className="absolute -top-1 -right-1 bg-palette-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {cartItems}
        </div>
      )}
    </div>
  </a>
</Link>
        </div>
      </div>
    </header >
  )
}

export default Nav
