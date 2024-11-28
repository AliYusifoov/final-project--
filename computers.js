$(document).ready(function () {
  let storageKey = "laptopData";

  // Load data from local storage
  function loadFromLocalStorage() {
    let storedData = localStorage.getItem(storageKey);
    return storedData ? JSON.parse(storedData) : [];
  }

  // Save data to local storage
  function saveToLocalStorage(data) {
    localStorage.setItem(storageKey, JSON.stringify(data));
  }

  // Render table from local storage
  function renderTable() {
    let laptops = loadFromLocalStorage();
    let tbody = $('#computerTable tbody');
    tbody.empty();

    laptops.forEach((laptop) => {
      let newRow = `
        <tr data-id="${laptop.id}">
          <td>${laptop.id}</td>
          <td>${laptop.name}</td>
          <td><img src="${laptop.image}" alt="Image" style="max-width: 50px;"></td>
          <td>${laptop.price} AZN</td>
          <td>
            <button class="btn btn-primary btn-sm btn-edit">Edit</button>
            <button class="btn btn-danger btn-sm btn-delete">Delete</button>
          </td>
        </tr>
      `;
      tbody.append(newRow);
    });
  }

  // Save button - Add or update data
  $('#saveComputerBtn').on('click', function () {
    let id = Date.now();
    let laptops = loadFromLocalStorage();

    let newLaptop = {
      id: id,
      category: $('#category').val().trim(),
      name: $('#computerName').val().trim(),
      price: $('#computerPrice').val().trim(),
      description: $('#description').val().trim(),
      status: $('#newStatus').val().trim(),
      image: $('#imageUrl').val().trim(),
      ram: $('#ram').val().trim(),
      processor: $('#processor').val().trim(),
      storage: $('#storage').val().trim(),
      storageType: $('#storageType').val().trim(),
      os: $('#os').val().trim(),
      gpu: $('#gpu').val().trim(),
    };

    let index = laptops.findIndex((laptop) => laptop.id == id);

    if (index !== -1) {
      laptops[index] = newLaptop; // Update existing laptop
    } else {
      laptops.push(newLaptop); // Add new laptop
    }

    saveToLocalStorage(laptops);
    renderTable();
    $('#addComputerModal').modal('hide');
    $('#computerForm')[0].reset();
    $('#imagePreview').hide();
  });

  // Handle Delete Button Click
  $(document).on('click', '.btn-delete', function () {
    let row = $(this).closest('tr');
    let id = row.data('id');
    let laptops = loadFromLocalStorage();
    laptops = laptops.filter((laptop) => laptop.id != id);

    saveToLocalStorage(laptops);
    renderTable();
  });

  // Handle Edit Button Click
  $(document).on('click', '.btn-edit', function () {
    let row = $(this).closest('tr');
    let id = row.data('id');
    let laptops = loadFromLocalStorage();
    let laptop = laptops.find((laptop) => laptop.id == id);

    if (laptop) {
      $('#computerId').val(laptop.id); // Hidden input to track the ID
      $('#category').val(laptop.category);
      $('#computerName').val(laptop.name);
      $('#computerPrice').val(laptop.price);
      $('#description').val(laptop.description);
      $('#newStatus').val(laptop.status);
      $('#imageUrl').val(laptop.image);
      $('#ram').val(laptop.ram);
      $('#processor').val(laptop.processor);
      $('#storage').val(laptop.storage);
      $('#storageType').val(laptop.storageType);
      $('#os').val(laptop.os);
      $('#gpu').val(laptop.gpu);

      if (laptop.image) {
        $('#imagePreview').attr('src', laptop.image).show();
      }

      $('#addComputerModal').modal('show');
    }
  });

  // Initialize the table on page load
  renderTable();

  // Reset Form and Hide Image Preview
  $('.btn-warning').on('click', function () {
    $('#computerForm')[0].reset();
    $('#imagePreview').hide();
    $('#computerId').val('');
  });

  // Show Image Preview
  $('#imageUrl').on('input', function () {
    let imageUrl = $(this).val().trim();
    if (imageUrl) {
      $('#imagePreview').attr('src', imageUrl).show();
    } else {
      $('#imagePreview').hide();
    }
  });
});
