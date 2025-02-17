const filtered = [67186614,
  51534303, 253782, 65848252, 4328785, 25565916, 2859599, 2260470, 14033542,
  17333325, 4722129, 14229363, 14229363, 57295505, 4722129, 66942198, 14769870,
  58900, 11520995, 14769870, 57463713, 33182870, 40395096, 58743047, 60288619,26917287,
  1347842, 62161607, 12252248, 7505861, 27853106, 606717, 43868446, 64804481,21350876,8599849, 340441,64804481,58959819,32550034,2602612,20552494,24270016,58582309,1658638,33371144,100001749692664,69294002
];
let numberOfPages;
//let page = 0;
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
	
	
	const dateText = document.createElement("p");
    if(product.natural_date)
		dateText.textContent = product.natural_date;
	else{
		let date = new Date(product.record_posted_date_timestamp * 1000);
		let formatted = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes();
		dateText.textContent = formatted;
	}
	
    const price = document.createElement("p");
    price.textContent = `${product.price} JOD`;

    const link = document.createElement("a");
    link.href = product.deeplink;
    link.target = "blank";
    link.textContent = "عرض";

    // Append elements to the product container
    productDiv.appendChild(img);
    productDiv.appendChild(name);
    productDiv.appendChild(dateText);
    productDiv.appendChild(description);
    productDiv.appendChild(price);
    productDiv.appendChild(link);

    productContainer.appendChild(productDiv);
  });
}
const getData = (page) => {
  const myHeaders = new Headers();
  myHeaders.append("country", "jo");
  myHeaders.append("source", "desktop");
  myHeaders.append("session-id", "30878133");
  myHeaders.append("Accept-Language", "ar");
  myHeaders.append("release-version", "9.4.02");
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
    `https://api.opensooq.com/v2.1/posts?fields=id,record_posted_date_timestamp,members_id,title,natural_date,price,display_name,deeplink,first_image_thumb,description,statusLabel&expand=custom_param_array&acceptDecimalPrice=1&supportCurrency=true&PostSearch[cityId]=59&PostSearch[neighborhood_id]=6727,6729,6731,6777,6781,6805,6809,6835,6795,18397,6867,21836,21834,6733,6735&PostSearch[categoryId]=8035&PostSearch[subCategoryId]=8037&PostSearch[dynamicAttributes][Surface][from]=101&PostSearch[dynamicAttributes][Surface][to]=175&PostSearch[dynamicAttributes][Surface][unit]=1&PostSearch[search_type]=all&PostSearch[priceFrom]=200&PostSearch[priceTo]=5000&per-page=50&page=${page}&PostSearch[term]=`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      !numberOfPages && (numberOfPages = result._meta.pageCount);
      console.log(!!numberOfPages);
      displayProducts(
        result.items.filter((a) => filtered.indexOf(a.members_id) === -1 && a.custom_param_array.indexOf("مفروشة") === -1
			   && a.display_name.indexOf("عقاريه") === -1 && a.display_name.indexOf("عقارية") === -1 && a.display_name.indexOf("group") === -1
			   && a.display_name.indexOf("العقارية") === -1 && a.display_name.indexOf("العقاريه") === -1 && a.display_name.indexOf("Group") === -1
			   )
      );
    })
    .then(() => {
		if(page < numberOfPages)
		  incrementPage(page);
    })
    .catch((error) => console.log("error", error));
};

const incrementPage = (p) => {
  setTimeout(getData(p + 1), 1000 * 0.2);
};

getData(1);
