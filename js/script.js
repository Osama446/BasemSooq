const filtered = [
  51534303, 253782, 65848252, 4328785, 25565916, 2859599, 2260470, 14033542,
  17333325, 4722129, 14229363, 14229363, 57295505, 4722129, 66942198, 14769870,
  58900, 11520995, 14769870, 57463713, 33182870, 40395096, 58743047, 60288619,
];
let page = 0;
let numberOfPages;
function displayProducts(products) {
  const productContainer = document.getElementById("product-container");

  // Loop through the products and create HTML elements
  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");

    const img = document.createElement("img");
    img.src = product.first_image_thumb;
    img.alt = product.display_name;

    const name = document.createElement("h2");
    name.textContent = product.title;

    const description = document.createElement("p");
    description.textContent = product.description;

    const price = document.createElement("p");
    price.textContent = `Price: ${product.price} JOD`;

    const link = document.createElement("a");
    link.href = product.deeplink;
    link.target = "blank";
    link.textContent = "View Details";

    // Append elements to the product container
    productDiv.appendChild(img);
    productDiv.appendChild(name);
    productDiv.appendChild(description);
    productDiv.appendChild(price);
    productDiv.appendChild(link);

    productContainer.appendChild(productDiv);
  });
}
const getData = () => {
  const myHeaders = new Headers();
  myHeaders.append("country", "jo");
  myHeaders.append("source", "desktop");
  myHeaders.append("session-id", "30878133");
  myHeaders.append("Accept-Language", "ar");
  myHeaders.append(
    "Authorization",
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdDAiOjE3MDMxNzgxMzQsImF1ZCI6ImRlc2t0b3AiLCJzdWIiOjMwODc4MTMzLCJybmQiOiI0NjEzMTUxNSIsImV4cCI6MTcwNTI0MTg2Nn0.pSibFuArB0CjtdI1poSkQb1TsnnEyuMErnZh7YrQogg"
  );

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    `https://api.opensooq.com/v2.1/posts?fields=id,members_id,title,natural_date,price,display_name,deeplink,first_image_thumb,description,statusLabel&acceptDecimalPrice=1&supportCurrency=true&PostSearch[cityId]=59&PostSearch[neighborhood_id]=6833&PostSearch[categoryId]=8035&PostSearch[subCategoryId]=8037&PostSearch[dynamicAttributes][Surface][from]=101&PostSearch[dynamicAttributes][Surface][to]=175&PostSearch[dynamicAttributes][Surface][unit]=1&PostSearch[search_type]=all&PostSearch[priceFrom]=200&PostSearch[priceTo]=370&per-page=50&page=${page}&PostSearch[term]=`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      !numberOfPages && (numberOfPages = result._meta.pageCount);
      console.log(!!numberOfPages);
      displayProducts(
        result.items.filter((a) => filtered.indexOf(a.members_id) === -1)
      );
    })
    .then(() => {
      if (numberOfPages) {
        while (page < numberOfPages) {
          incrementPage();
        }
      }
    })
    .catch((error) => console.log("error", error));
};

const incrementPage = () => {
  ++page;
  getData();
};
getData();
