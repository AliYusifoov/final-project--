$(document).ready(function () {
  let storageKey = "laptopData";
  
  function validateField(input, condition, successMessage, errorMessage) {
    const field = $(input);
    const parent = field.closest(".mb-1");
    parent.find(".validation-message").remove(); // Clear existing message

    if (condition) {
      field.removeClass("is-invalid").addClass("is-valid");
      parent.append(`<small class="validation-message text-success">${successMessage}</small>`);
    } else {
      field.removeClass("is-valid").addClass("is-invalid");
      parent.append(`<small class="validation-message text-danger">${errorMessage}</small>`);
    }
  }

  $(".checker").on("input", function () {
    let text = $(this).val();
    validateField(
      this,
      text.length > 0,
      "Düzgündür",
      "Boş qoymayın."
    );
  });

  $(".dom").click(function () {
    window.location.href = "home.html";
  })
  // Load data from local storage
  function loadFromLocalStorage() {
    let storedData = localStorage.getItem(storageKey);
    return storedData ? JSON.parse(storedData) : [];
  }

  // Save data to local storage
  function saveToLocalStorage(data) {
    localStorage.setItem(storageKey, JSON.stringify(data));
  }

  let i = 1;
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
    let id = i++;
    let laptops = loadFromLocalStorage();
    let newLaptop = {
      id: id,
      category: $('#category').val(),
      name: $('#computerName').val(),
      price: $('#computerPrice').val(),
      description: $('#description').val(),
      status: $('#newStatus').val(),
      image: $('#imageUrl').val(),
      ram: $('#ram').val(),
      processor: $('#processor').val(),
      storage: $('#storage').val(),
      storageType: $('#storageType').val(),
      os: $('#os').val(),
      gpu: $('#gpu').val(),
      phone: localStorage.getItem("phone")
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
      $('#computername').val(laptop.name);
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
      renderTable();

      laptops = laptops.filter((laptop) => laptop.id != id);
      saveToLocalStorage(laptops);
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
    let imageUrl = $(this).val();
    if (imageUrl) {
      $('#imagePreview').attr('src', imageUrl).show();
    } else {
      $('#imagePreview').hide();
    }
  });


  $('#computerTable').on('click', 'tr img', function () {
    let imgSrc = $(this).attr('src');
    $('#expandedImage').attr('src', imgSrc);
    $('#fullscreenModal').fadeIn();
  });
  

  // When the close button is clicked, close the modal
  $('.close-btn').click(function() {
    $('#fullscreenModal').fadeOut(); // Hide the modal
  });

  // Close the modal if the background is clicked
  $('#fullscreenModal').click(function(e) {
    if ($(e.target).is('#fullscreenModal')) {
      $('#fullscreenModal').fadeOut(); // Hide the modal
    }
  });

  
});