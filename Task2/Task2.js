import fetch from "node-fetch";
const getProductsData = async function () {
  try {
    const response = await fetch(
      "https://api.escuelajs.co/api/v1/products?offset=10&limit=10"
    );
    const data = await response.json();
    return data;
  } catch (Error) {
    console.log(`Error!: ${Error}`);
  }
};
const getExchangeRate = async function () {
  let myHeaders = new Headers();
  myHeaders.append("apikey", "R0DZh807qLAzCY6zPIzI0L23JmJCPnqu");

  let requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: myHeaders,
  };
  try {
    const response = await fetch(
      "https://api.apilayer.com/exchangerates_data/convert?to=EGP&from=USD&amount=1",
      requestOptions
    );
    const { result } = await response.json();
    return result.toFixed(2);
  } catch (Error) {
    console.log(`Error!: ${Error}`);
  }
};

const getGroupedProductsByCategory = function (data) {
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

const convertPriceToEGP = function (data) {
  let products = data[1].map((product) => ({
    ...product,
    price: `${product.price * data[0]} EGP`,
  }));
  return products;
};

Promise.all([getExchangeRate(), getProductsData()])
  .then(convertPriceToEGP)
  .then(getGroupedProductsByCategory)
  .then(console.log);
