import fetch from "node-fetch";
async function getProductsData() {
  try {
    const response = await fetch(
      "https://api.escuelajs.co/api/v1/products?offset=10&limit=10"
    );
    const data = await response.json();
    return data;
  } catch (Error) {
    console.log(`Error!: ${Error}`);
  }
}

const getCategories = function (data) {
  const categories = data.reduce((groupedProducts, product) => {
    const id = product.category.id;
    if (
      !groupedProducts.some((category) => category["category"]["id"] === id)
    ) {
      groupedProducts.push({ category: product.category, products: [product] });
    } else {
      const category = groupedProducts.find(
        (category) => category["category"]["id"] === product.category.id
      );
      category.products.push(product);
    }
    return groupedProducts;
  }, []);
  return JSON.stringify(categories, null, 2);
};

getProductsData().then(getCategories).then(console.log);
