$(document).ready(function () {
  $("#searchInput").keyup(function () {
    let searchQuery = $(this).val().toLowerCase();
    filterLaptops(searchQuery);
  });

  let laptops = [];
  let categories = ["Acer", "HP", "Asus", "Dell", "Lenovo", "LG", "Casper", "Fujitsu", "Nexus", "Samsung", "Toshiba", "Sony"];
  const storedLaptops = JSON.parse(localStorage.getItem("laptopData" + localStorage.getItem("loggedInUsername")));
  let container = $("#productsContainer");
  
  // Function to generate random phone number
  function generateRandomPhoneNumber() {
    let prefixes = ['055', '051', '050', '070', '099'];
    let prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    let random3Digit = Math.floor(Math.random() * 900) + 100;
    let random4Digit = Math.floor(Math.random() * 9000) + 1000;
    return `${prefix}-${random3Digit}-${random4Digit}`;
  }
  
  // Predefined category images
  const categoryImages = {
    "Acer": "https://m.media-amazon.com/images/I/71rvYWl5fuL._AC_UF894,1000_QL80_.jpg",
    "HP": "https://www.hp.com/ca-en/shop/Html/Merch/Images/c08505208_500x367.jpg",
    "Asus": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUxBtMcVBerDUmev1yLTfgo92EOQt6xNokHA&s",
    "Dell": "https://m.media-amazon.com/images/I/71-4WO0hXzL._AC_UF894,1000_QL80_.jpg",
    "Lenovo": "https://rukminim2.flixcart.com/image/850/1000/xif0q/computer/f/z/r/15itl6-thin-and-light-laptop-lenovo-original-imah44ptjjhubfpn.jpeg?q=90&crop=false",
    "LG": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7qFB6hR2Q3Mc4b2DaKh94rCsrULepC_WF7Q&s",
    "Casper": "https://cdn.cimri.io/image/1200x1200/https://cdn.cimri.io/image/200x200/casper-nirvana-c370-4020-4c00b-intel-celeron-n4020-4gb-ram-120gb-ssd-windows-11-home-15-6-inc-laptop-notebook_848029192.jpg",
    "Fujitsu": "https://m.media-amazon.com/images/I/417ssoyXWsL._AC_UF894,1000_QL80_.jpg",
    "Nexus": "https://www.notebookcheck.net/fileadmin/_migrated/pics/100348_1_01.jpg",
    "Samsung": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg4nkc2GdEe-wETPlNaUAGaXke6gWlPM-KJw&s",
    "Toshiba": "https://m.media-amazon.com/images/I/81feioWX4oL.jpg",
    "Sony": "https://4.imimg.com/data4/LH/XI/MY-3561865/sony-laptop-500x500.png"
  };
  
  // Generate new laptops
  let processors = [3, 5, 7, 9];
  let generations = [7, 8, 9, 10, 11, 12, 13, 14];
  let ram = [4, 8, 16, 32, 64];
  let storage = [128, 256, 512, 1024];
  
  categories.forEach(category => {
    for (let i = 1; i <= 50; i++) {
      laptops.push({
        category,
        name: `${category} Laptop ${i}`,
        description: `${category} laptop description ${i}`,
        price: Math.floor(Math.random() * 150 + 100) * 10,
        isNew: i % 2 === 0 ? "Bəli" : "Xeyr",
        phone: generateRandomPhoneNumber(),
        imageUrl: categoryImages[category] || "https://via.placeholder.com/150",
        processor: `Intel Core i${processors[Math.floor(Math.random() * processors.length)]} ${generations[Math.floor(Math.random() * generations.length)]}th Gen`,
        ram: `${ram[Math.floor(Math.random() * ram.length)]} GB`,
        storage: `${storage[Math.floor(Math.random() * storage.length)]} GB SSD`
      });
    }
  });
  if (storedLaptops.length !== 0) { 
    storedLaptops.forEach((laptop) => {
      let laptop1 = {
        category: laptop.category,
        name: `Laptop ${laptop.name}`,
        description: `Laptop description ${laptop.description}`,
        price: laptop.price,
        isNew: laptop.status,
        phone: localStorage.getItem("loggedInPhone"),
        imageUrl: laptop.image,
        processor: `Intel Core ${laptop.processor}`,
        ram: `${laptop.ram} GB`,
        storage: `${laptop.storage} GB ${laptop.storageType}`
      };
      laptops.push(laptop1);
    });
  } 
  
  // Function to create a laptop card
  function createCard(laptop) {
    return `
      <div class="product-card">
        <img src="${laptop.imageUrl}" alt="${laptop.name}">
        <p><strong>Ad:</strong> ${laptop.name}</p>
        <p><strong>Təsvir:</strong> ${laptop.description}</p>
        <p><strong>Qiymət:</strong> ${laptop.price} AZN</p>
        <p><strong>Yeni:</strong> ${laptop.isNew}</p>
        <p><strong>Telefon:</strong> ${laptop.phone}</p>
        <button class="btn" data-laptop='${JSON.stringify(laptop)}'>Ətraflı</button>
      </div>`;
  }

  // Render laptops
  function renderLaptops(category = '') {
    container.empty();
    let filteredLaptops = category ? laptops.filter(laptop => laptop.category === category) : laptops;
    if (filteredLaptops.length === 0) {
      container.append("<p>No laptops found in this category.</p>");
    } else {
      filteredLaptops.forEach(laptop => {
        container.append(createCard(laptop));
      });
    }
  }

  // Search laptops by query
  function filterLaptops(query) {
    container.empty();
    let filteredLaptops = laptops.filter(laptop => 
      laptop.name.toLowerCase().includes(query) || 
      laptop.description.toLowerCase().includes(query) || 
      laptop.category.toLowerCase().includes(query)
    );
    if (filteredLaptops.length === 0) {
      container.append("<p>No laptops match your search.</p>");
    } else {
      filteredLaptops.forEach(laptop => {
        container.append(createCard(laptop));
      });
    }
  }

  // Initial render
  renderLaptops("Acer");

  // Category filtering
  $(".category-item").click(function () {
    let category = $(this).data("category");
    renderLaptops(category);
  });

  // Show laptop details in modal
  $(document).on("click", ".btn", function () {
    let laptop = JSON.parse($(this).attr("data-laptop"));
    $("#modal-laptop-details").html(`
      <img src="${laptop.imageUrl}">
      <p><strong>Ad:</strong> ${laptop.name}</p>
      <p><strong>Təsvir:</strong> ${laptop.description}</p>
      <p><strong>Qiymət:</strong> ${laptop.price} AZN</p>
      <p><strong>Telefon:</strong> ${laptop.phone}</p>
      <p><strong>Processor:</strong> ${laptop.processor}</p>
      <p><strong>RAM:</strong> ${laptop.ram}</p>
      <p><strong>Storage:</strong> ${laptop.storage}</p>
    `);
    $("#laptopModal").modal("show");
  });
});
