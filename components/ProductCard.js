import Image from 'next/image'
import Link from 'next/link'
import Price from '@/components/Price'

function ProductCard({ product }) {
  const handle = product.node.handle
  const title = product.node.title
  const description = product.node.description
  const price = product.node.variants.edges[0].node.price
  const imageNode = product.node.images.edges[0].node

  return (
    <div className="group flex flex-col w-80 bg-white rounded-sm shadow-sm hover:shadow-xl transition-shadow duration-300 mx-auto overflow-hidden border border-gray-100">
      
      {/* Top Image Area */}
      <Link href={`/products/${handle}`} passHref>
        <div className="h-72 relative flex items-center justify-center p-8 cursor-pointer">
          <Image
            src={imageNode.originalSrc}
            alt={imageNode.altText || title}
            width={400}
            height={400}
            className="object-contain transform duration-500 ease-in-out group-hover:scale-105"
          />
        </div>
      </Link>

      {/* Content Area */}
      <div className="flex-1 flex flex-col p-6 pt-0">
        {/* Title: Purple and Bold */}
        <h3 className="text-[#5a2ab1] text-2xl font-bold mb-4">
          {title}
        </h3>
        
        {/* Description: Grey and Light weight */}
        <p className="text-gray-500 font-light text-lg leading-relaxed mb-8">
          {description}
        </p>

        {/* Price Section: Angled Ribbon at bottom right */}
        <div className="mt-auto -mr-6 -mb-0 flex justify-end">
          <div 
            className="bg-[#f0efff] text-[#5a2ab1] py-1 px-8 relative font-bold"
            style={{ 
              clipPath: 'polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%)' 
            }}
          >
            <Price currency="$" num={price} numSize="text-lg" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard