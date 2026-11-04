const API_URL = "https://fakestoreapi.com/products";

function formatNewArrival(product) {
  return {
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
    reviews: [],
  };
}

export async function getNewArrivals() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch new arrivals");
  }

  const data = await response.json();

  return data.map(formatNewArrival);
}

export async function getNewArrivalById(id) {
  const sourceId = String(id).replace("new-", "");

  const response = await fetch(`${API_URL}/${sourceId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch new arrival");
  }

  const data = await response.json();

  return formatNewArrival(data);
}