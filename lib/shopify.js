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

/* export async function getAllProductsInCollection() {
  const query =
    `{
      collectionByHandle(handle: "${collection}") {
        id
        title
        products(first: 250) {
          edges {
            node {
              id
              title
              description
              handle
              images(first: 250) {
                edges {
                  node {
                    id
                    originalSrc
                    height
                    width     
                    altText             
                  }
                }
              }
              variants(first: 250) {
                edges {
                  node {
                    id
                    title
                    price                
                  }
                }
              }
            }
          }
        }
      }
    }`
  ;

  const response = await callShopify(query);

  const allProducts = response.data.collectionByHandle.products.edges
    ? response.data.collectionByHandle.products.edges
    : [];

  return allProducts;
} */

  export async function getAllProductsInCollection() {
  // MOCK DATA
  const allProducts = [
    {
      node: {
        id: "1",
        title: "Dog Sticker 1",
        description: "Cute dog sticker for laptops or water bottles.",
        handle: "dog-sticker-1",
        images: {
          edges: [
            { node: { id: "img1", originalSrc: "https://doggystickers.vercel.app/_next/image?url=https%3A%2F%2Fcdn.shopify.com%3Fv%3D1616988549&w=1920&q=75", height: 400, width: 400, altText: "Dog Sticker 1" } }
          ]
        },
        variants: {
          edges: [
            { node: { id: "var1", title: "Default Variant", price: "5.99" } }
          ]
        }
      }
    },
    {
      node: {
        id: "2",
        title: "Dog Sticker 2",
        description: "Funny dog sticker for notebooks or gifts.",
        handle: "dog-sticker-2",
        images: {
          edges: [
            { node: { id: "img2", originalSrc: "https://doggystickers.vercel.app/_next/image?url=https%3A%2F%2Fcdn.shopify.com%3Fv%3D1616988549&w=1920&q=75", height: 400, width: 400, altText: "Dog Sticker 2" } }
          ]
        },
        variants: {
          edges: [
            { node: { id: "var2", title: "Default Variant", price: "6.99" } }
          ]
        }
      }
    },
    {
      node: {
        id: "3",
        title: "Dog Sticker 3",
        description: "Adorable dog sticker for any surface.",
        handle: "dog-sticker-3",
        images: {
          edges: [
            { node: { id: "img3", originalSrc: "https://doggystickers.vercel.app/_next/image?url=https%3A%2F%2Fcdn.shopify.com%3Fv%3D1616988549&w=1920&q=75", height: 400, width: 400, altText: "Dog Sticker 3" } }
          ]
        },
        variants: {
          edges: [
            { node: { id: "var3", title: "Default Variant", price: "4.99" } }
          ]
        }
      }
    }
  ];

  // Return the mock products just like the real Shopify API would
  return allProducts;
}


/* export async function getProductSlugs() {
  const query =
    `{
      collectionByHandle(handle: "${collection}") {
        products(first: 250) {
          edges {
            node {
              handle              
            }
          }
        }
      }
    }`
  ;

  const response = await callShopify(query);

  const slugs = response.data.collectionByHandle.products.edges
    ? response.data.collectionByHandle.products.edges
    : [];

  return slugs;
}

export async function getProduct(handle) {
  const query =
    `{
      productByHandle(handle: "${handle}") {
        id
        title
        handle
        description
        images(first: 250) {
          edges {
            node {
              id
              originalSrc
              height
              width     
              altText             
            }
          }
        }
        variants(first: 250) {
          edges {
            node {
              id
              title
              price                
            }
          }
        }
      }
    }`
  ;

  const response = await callShopify(query);

  const product = response.data.productByHandle
    ? response.data.productByHandle
    : [];

  return product;
} */

export async function getProductSlugs() {
  return [
    { node: { handle: "dog-sticker-1" } },
    { node: { handle: "dog-sticker-2" } },
    { node: { handle: "dog-sticker-3" } }
  ];
}

export async function getProduct(handle) {
  const allProducts = await getAllProductsInCollection();
  const product = allProducts.find(p => p.node.handle === handle);
  return product ? product.node : null;
}


export async function createCheckout(id, quantity) {
  const query =
    `mutation 
      {
        checkoutCreate(input: {
          lineItems: [{ variantId: "${id}", quantity: ${quantity} }]
        }) {
          checkout {
             id
             webUrl
             lineItems(first: 250) {
               edges {
                 node {
                   id
                   title
                   quantity
                 }
               }
             }
          }
        }
      }      
    `
  ;

  const response = await callShopify(query);

  const checkout = response.data.checkoutCreate.checkout
    ? response.data.checkoutCreate.checkout
    : [];

  return checkout;
}

export async function updateCheckout(id, lineItems) {  
  const formattedLineItems = lineItems.map(item => {
    return `{
      variantId: "${item.variantId}",
      quantity:${item.quantity}
    }`
  })

  const query =
    `mutation 
      {
        checkoutLineItemsReplace(lineItems: [${formattedLineItems}], checkoutId: "${id}") {
          checkout {
             id
             webUrl
             lineItems(first: 250) {
               edges {
                 node {
                   id
                   title
                   quantity
                 }
               }
             }
          }
        }
      }      
    `
  ;

  const response = await callShopify(query);

  const checkout = response.data.checkoutLineItemsReplace.checkout
    ? response.data.checkoutLineItemsReplace.checkout
    : [];

  return checkout;
}
