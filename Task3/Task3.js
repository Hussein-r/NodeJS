import fetch from "node-fetch";
import http from "http";
import { object, string, number, array } from "yup";

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
const getExchangeRate = async function (currency) {
  let myHeaders = new Headers();
  myHeaders.append("apikey", "R0DZh807qLAzCY6zPIzI0L23JmJCPnqu");

  let requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: myHeaders,
  };
  try {
    const response = await fetch(
      `https://api.apilayer.com/exchangerates_data/convert?to=${currency}&from=USD&amount=1`,
      requestOptions
    );
    const { result } = await response.json();
    return result;
  } catch (Error) {
    console.log(`Error!: ${Error}`);
  }
};

const convertPrice = function (data) {
  let products = data[1].map((product) => ({
    ...product,
    price: `${(product.price * data[0]).toFixed(2)}`,
  }));
  return products;
};

const productScheme = object({
  title: string().required(),
  price: number().required().positive(),
  description: string().required(),
  categoryId: number().required().min(1).max(5),
  images: array(string()).required(),
});

const server = http.createServer((req, res) => {
  if (req.method === "GET") {
    const currency = req.url.split("/").at(-1);
    Promise.all([
      getExchangeRate(currency ? currency : "USD"),
      getProductsData(),
    ])
      .then(convertPrice)
      .then((data) => {
        res.setHeader("Content-Type", "application/json");
        res.writeHead(200);
        res.write(JSON.stringify(data));
        res.end();
      });
  }

  // add todo
  if (req.method === "POST") {
    const chunks = [];
    req.on("data", (chunk) => {
      chunks.push(chunk);
    });

    req.on("end", async () => {
      const myProduct = JSON.parse(chunks.toString());
      try {
        productScheme.validateSync(myProduct, {
          strict: true,
        });
      } catch (error) {
        res.writeHead(400);
        res.write("Enter Valid Data");
        res.end();
      }
      try {
        const response = await fetch(
          "https://api.escuelajs.co/api/v1/products/",
          {
            method: "post",
            body: JSON.stringify(myProduct),
            headers: { "Content-Type": "application/json" },
          }
        );
        const data = await response.json();
        res.setHeader("Content-Type", "application/json");
        res.writeHead(201);
        res.write(JSON.stringify(data));
        res.end();
      } catch (error) {
        res.writeHead(400);
        res.write("An Error has happened during sending post request");
        res.end();
      }
    });

    req.on("error", (error) => {
      res.setHeader("Content-Type", "text");
      res.writeHead(500);
      res.write(error.message);
      res.end();
    });
  }
});

server.listen(8080, () => {
  console.log("SERVER is running on http://localhost:8080");
});
