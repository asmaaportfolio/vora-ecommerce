
const API_URL = "https://fakestoreapi.com/products";

export async function getNewArrivals() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch new arrivals");
  }

  const data = await response.json();

  return data.map((product) => ({
    ...product,
    id: `new-${product.id}`,
    sourceId: product.id,
    title: product.title,
    thumbnail: product.image,
    images: [product.image],
    rating: product.rating?.rate ?? 0,
    stock: 10,
    discountPercentage: 0,
    brand: "VORA Selection",
  }));
}
