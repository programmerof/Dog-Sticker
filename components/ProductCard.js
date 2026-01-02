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
    <Link href={`/products/${handle}`} passHref legacyBehavior>
      <a className="group h-120 w-72 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 mx-auto border border-palette-lighter overflow-hidden bg-white">
        <div className="h-72 border-b-2 border-palette-lighter relative overflow-hidden bg-gray-50">
          <Image
            src={imageNode.originalSrc}
            alt={imageNode.altText || title}
            width={400}
            height={400}
            className="w-full h-full object-cover transform duration-500 ease-in-out group-hover:scale-110"
            priority={false}
          />
        </div>
        <div className="h-48 relative p-4 flex flex-col justify-between">
          <div>
            <h3 className="font-primary text-palette-primary text-xl font-semibold mb-2 line-clamp-2">
              {title}
            </h3>
            <p className="text-base text-gray-600 font-primary font-light line-clamp-2">
              {description}
            </p>
          </div>
          <div className="flex justify-between items-center mt-4">
            <Price currency="$" num={price} numSize="text-2xl" />
            <span className="text-sm text-palette-primary font-semibold group-hover:underline">
              View Details →
            </span>
          </div>
        </div>
      </a>
    </Link>
  )
}

export default ProductCard