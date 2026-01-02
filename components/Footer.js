import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

function Footer() {
  return (
     <footer className="py-8 mt-12 border-t border-palette-lighter bg-gradient-to-b from-white to-palette-lighter">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-4">
          <p className="text-sm text-gray-600">
            © 2026 Doggy Stickers. Computer Science Project - Tribhuwan University
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
