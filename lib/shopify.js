const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STORE_FRONT_ACCESS_TOKEN
const collection = process.env.NEXT_PUBLIC_SHOPIFY_COLLECTION

async function callShopify(query) {
  const fetchUrl = `https://${domain}/api/2021-01/graphql.json`;

  const fetchOptions = {
    endpoint: fetchUrl,
    method: "POST",
    headers: {
      "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  };

  try {
    const data = await fetch(fetchUrl, fetchOptions).then((response) =>
      response.json(),
    );
    return data;
  } catch (error) {
    throw new Error("Could not fetch products!");
  }
}

export async function getAllProductsInCollection() {
  // MOCK DATA with working images
  const allProducts = [
    {
      node: {
        id: "1",
        title: "Cute Puppy Sticker",
        description: "Adorable puppy sticker perfect for laptops and notebooks.",
        handle: "dog-sticker-1",
        images: {
          edges: [
            { 
              node: { 
                id: "img1", 
                originalSrc: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop", 
                height: 400, 
                width: 400, 
                altText: "Cute Puppy Sticker" 
              } 
            }
          ]
        },
        variants: {
          edges: [
            { node: { id: "var1", title: "Standard", price: "5.99" } }
          ]
        }
      }
    },
    {
      node: {
        id: "2",
        title: "Happy Golden Retriever",
        description: "Cheerful golden retriever sticker to brighten your day.",
        handle: "dog-sticker-2",
        images: {
          edges: [
            { 
              node: { 
                id: "img2", 
                originalSrc: "https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=400&h=400&fit=crop", 
                height: 400, 
                width: 400, 
                altText: "Happy Golden Retriever" 
              } 
            }
          ]
        },
        variants: {
          edges: [
            { node: { id: "var2", title: "Standard", price: "6.99" } }
          ]
        }
      }
    },
    {
      node: {
        id: "3",
        title: "Playful Corgi Sticker",
        description: "Cute corgi sticker for all your sticker needs.",
        handle: "dog-sticker-3",
        images: {
          edges: [
            { 
              node: { 
                id: "img3", 
                originalSrc: "https://images.unsplash.com/photo-1546527868-ccb7ee7dfa6a?w=400&h=400&fit=crop", 
                height: 400, 
                width: 400, 
                altText: "Playful Corgi Sticker" 
              } 
            }
          ]
        },
        variants: {
          edges: [
            { node: { id: "var3", title: "Standard", price: "4.99" } }
          ]
        }
      }
    },
    {
      node: {
        id: "4",
        title: "Sleepy Bulldog",
        description: "Relaxed bulldog sticker perfect for your water bottle.",
        handle: "dog-sticker-4",
        images: {
          edges: [
            { 
              node: { 
                id: "img4", 
                originalSrc: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&h=400&fit=crop", 
                height: 400, 
                width: 400, 
                altText: "Sleepy Bulldog" 
              } 
            }
          ]
        },
        variants: {
          edges: [
            { node: { id: "var4", title: "Standard", price: "5.49" } }
          ]
        }
      }
    },
    {
      node: {
        id: "5",
        title: "Energetic Husky",
        description: "Beautiful husky sticker with striking blue eyes.",
        handle: "dog-sticker-5",
        images: {
          edges: [
            { 
              node: { 
                id: "img5", 
                originalSrc: "https://images.unsplash.com/photo-1568572933382-74d440642117?w=400&h=400&fit=crop", 
                height: 400, 
                width: 400, 
                altText: "Energetic Husky" 
              } 
            }
          ]
        },
        variants: {
          edges: [
            { node: { id: "var5", title: "Standard", price: "6.49" } }
          ]
        }
      }
    },
    {
      node: {
        id: "6",
        title: "Tiny Chihuahua",
        description: "Small but mighty chihuahua sticker.",
        handle: "dog-sticker-6",
        images: {
          edges: [
            { 
              node: { 
                id: "img6", 
                originalSrc: "https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?w=400&h=400&fit=crop", 
                height: 400, 
                width: 400, 
                altText: "Tiny Chihuahua" 
              } 
            }
          ]
        },
        variants: {
          edges: [
            { node: { id: "var6", title: "Standard", price: "4.99" } }
          ]
        }
      }
    }
  ];

  return allProducts;
}

export async function getProductSlugs() {
  return [
    { node: { handle: "dog-sticker-1" } },
    { node: { handle: "dog-sticker-2" } },
    { node: { handle: "dog-sticker-3" } },
    { node: { handle: "dog-sticker-4" } },
    { node: { handle: "dog-sticker-5" } },
    { node: { handle: "dog-sticker-6" } }
  ];
}

export async function getProduct(handle) {
  const allProducts = await getAllProductsInCollection();
  const product = allProducts.find(p => p.node.handle === handle);
  return product ? product.node : null;
}


export async function createCheckout(id, quantity) {
  // Mock checkout response
  return {
    id: `checkout_${Date.now()}`,
    webUrl: "https://checkout.example.com/mock-checkout",
    lineItems: {
      edges: []
    }
  };
}

export async function updateCheckout(id, lineItems) {
  // Mock update response
  return {
    id: id,
    webUrl: "https://checkout.example.com/mock-checkout",
    lineItems: {
      edges: []
    }
  };
}