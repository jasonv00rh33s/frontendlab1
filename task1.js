const products = [
  {
    vendorCode: "DB001",
    id: 1,
    name: "Гантелі складальні 10 кг",
    country: "Україна",
    oldPrice1: 1200,
    oldPrice2: 1100,
    currentPrice: 1000,
    quantity: 15
  },
  {
    vendorCode: "BB002",
    id: 2,
    name: "Штанга олімпійська 20 кг",
    country: "Польща",
    oldPrice1: 4000,
    oldPrice2: 4200,
    currentPrice: 4500,
    quantity: 8
  },
  {
    vendorCode: "YM003",
    id: 3,
    name: "Килимок для йоги 6 мм",
    country: "Німеччина",
    oldPrice1: 900,
    oldPrice2: 800,
    currentPrice: 850,
    quantity: 25
  },
  {
    vendorCode: "RB004",
    id: 4,
    name: "Набір фітнес-резинок",
    country: "Китай",
    oldPrice1: 600,
    oldPrice2: 550,
    currentPrice: 500,
    quantity: 40
  },
  {
    vendorCode: "KB005",
    id: 5,
    name: "Гиря чавунна 16 кг",
    country: "Україна",
    oldPrice1: 1100,
    oldPrice2: 1250,
    currentPrice: 1400,
    quantity: 12
  },
  {
    vendorCode: "SR006",
    id: 6,
    name: "Скакалка швидкісна",
    country: "Китай",
    oldPrice1: 400,
    oldPrice2: 350,
    currentPrice: 320,
    quantity: 30
  },
  {
    vendorCode: "GL007",
    id: 7,
    name: "Рукавички атлетичні",
    country: "Пакистан",
    oldPrice1: 500,
    oldPrice2: 600,
    currentPrice: 550,
    quantity: 18
  },
  {
    vendorCode: "BL008",
    id: 8,
    name: "Пояс атлетичний шкіряний",
    country: "Пакистан",
    oldPrice1: 1300,
    oldPrice2: 1200,
    currentPrice: 1100,
    quantity: 10
  },
  {
    vendorCode: "WB009",
    id: 9,
    name: "Пляшка для води 750 мл",
    country: "Німеччина",
    oldPrice1: 300,
    oldPrice2: 320,
    currentPrice: 350,
    quantity: 50
  },
  {
    vendorCode: "ST010",
    id: 10,
    name: "Степ-платформа",
    country: "Польща",
    oldPrice1: 1600,
    oldPrice2: 1550,
    currentPrice: 1500,
    quantity: 7
  }
];

console.log("Початковий список товарів:");
console.table(products);

// 1. впорядкування товарів за країною походження 
products.sort(function(a, b) {
  if (a.country > b.country) return 1;
  if (a.country < b.country) return -1;
  return 0;
});

console.log("Відсортовано за країною:");
console.table([...products]);

// 1. знаходження середньої вартості товару, з однієї і тієї ж країни

let countryStats = {};
for (let i = 0; i < products.length; i++){
    let c = products[i].country;
    if (!countryStats[c]){
        countryStats[c] = { total: 0, count: 0 };
    }
    countryStats[c].total += products[i].currentPrice;
    countryStats[c].count++; 
}

let averagePricesTable = [];
for (let c in countryStats) {
  averagePricesTable.push({
    Країна: c,
    "Середня вартість": Math.round(countryStats[c].total / countryStats[c].count)
  });
}
console.log("Середня вартість товарів за країнами:");
console.table(averagePricesTable);

// 2. знаходження товару, який має мінімальну «вартість2_недіюча» та вивід внутрішнього id, що йому відповідає. 

let minProduct = products[0];
for (let i = 1; i < products.length; i++) {
  if (products[i].oldPrice2 < minProduct.oldPrice2) {
    minProduct = products[i];
  }
}
console.log("Товар із мінімальною ціною 2:", minProduct.name, "| id:", minProduct.id, "| ціна:", minProduct.oldPrice2);

// 3. додавання нового запису до 10 записів: якщо у нього відсутня хоч якась 
// інфо то додаємо в кінець списку товарів; якщо вся інфо наявна, то на 
// початок списку товарів. 
function addProduct(item) {
  if (!item.vendorCode || !item.id || !item.name || !item.country || !item.oldPrice1 || !item.oldPrice2 || !item.currentPrice || !item.quantity) {
    products.push(item);
  } else {
    products.unshift(item);
  }
}

let fullProduct = { vendorCode: "TR11", id: 11, name: "Еспандер", country: "Україна", oldPrice1: 200, oldPrice2: 250, currentPrice: 300, quantity: 20 };
let incompleteProduct = { vendorCode: "BL12", id: 12, name: "М'яч", country: "Польща", oldPrice1: 400 };

addProduct(fullProduct);
addProduct(incompleteProduct);

console.log("Список після додавання товарів:");
console.table(products);

// 4. створити список, який містить динаміку зміни ціни на кожен товару (за 
// його id або назвою), виходячи з наявних цін, за правилом якщо ціни 
// утворюють спадну (зростаючу) послідовність, то товар «стабільно 
// дешевшає» («стабільно дорожчає»), у протилежному випадку товар «не 
// стабільні зміни».

let priceDynamics = [];
for (let i = 0; i < products.length; i++) {
  let p = products[i];
  let status = "не стабільні зміни";

  if (p.oldPrice1 > p.oldPrice2 && p.oldPrice2 > p.currentPrice) {
    status = "стабільно дешевшає";
  } else if (p.oldPrice1 < p.oldPrice2 && p.oldPrice2 < p.currentPrice) {
    status = "стабільно дорожчає";
  }

  priceDynamics.push({
    id: p.id,
    Назва: p.name,
    "Ціна 1": p.oldPrice1,
    "Ціна 2": p.oldPrice2,
    "Ціна 3": p.currentPrice,
    Динаміка: status
  });
}

console.log("Динаміка зміни цін:");
console.table(priceDynamics);