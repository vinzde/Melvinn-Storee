/* ==========================================
   MELVIN STORE
   TANPA SISTEM KERANJANG
========================================== */


/* =========================
   PENGATURAN
========================= */

const WHATSAPP_NUMBER =
  "6281919655663";


/*
   PASSWORD ADMIN

   Kalau mau mengganti password,
   ubah tulisan di bawah ini.
*/

const ADMIN_PASSWORD =
  "MelvinStore2026";


const STORAGE_KEY =
  "melvin_store_products";


/* =========================
   PRODUK DEFAULT
========================= */

const defaultProducts = [

  {
    id: 1,

    name:
      "Alight Motion Premium",

    category:
      "editing",

    price:
      5000,

    image:
      "",

    icon:
      "🎬",

    description:
      "Aplikasi editing video dengan fitur premium."
  },


  {
    id: 2,

    name:
      "CapCut Premium",

    category:
      "editing",

    price:
      10000,

    image:
      "",

    icon:
      "✂️",

    description:
      "Editing video dengan berbagai fitur premium."
  },


  {
    id: 3,

    name:
      "Canva Pro",

    category:
      "design",

    price:
      10000,

    image:
      "",

    icon:
      "🎨",

    description:
      "Desain lebih mudah dengan fitur Canva Pro."
  },


  {
    id: 4,

    name:
      "Spotify Premium",

    category:
      "music",

    price:
      15000,

    image:
      "",

    icon:
      "🎵",

    description:
      "Nikmati musik dengan pengalaman Premium."
  },


  {
    id: 5,

    name:
      "Microsoft 365",

    category:
      "productivity",

    price:
      20000,

    image:
      "",

    icon:
      "💼",

    description:
      "Paket produktivitas untuk kebutuhan sehari-hari."
  },


  {
    id: 6,

    name:
      "Adobe Creative Cloud",

    category:
      "design",

    price:
      25000,

    image:
      "",

    icon:
      "✨",

    description:
      "Tools kreatif untuk berbagai kebutuhan desain."
  }

];


/* =========================
   LOAD DATA
========================= */

let products = [];

const savedProducts =
  localStorage.getItem(
    STORAGE_KEY
  );


if (savedProducts) {

  try {

    products =
      JSON.parse(savedProducts);

  } catch {

    products =
      [...defaultProducts];

  }

} else {

  products =
    [...defaultProducts];

}


/* =========================
   STATE
========================= */

let currentCategory =
  "all";


let selectedImage =
  "";


/* =========================
   SIMPAN PRODUK
========================= */

function saveProductsToStorage() {

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(products)
  );

}


/* =========================
   FORMAT RUPIAH
========================= */

function formatRupiah(number) {

  return new Intl.NumberFormat(
    "id-ID",
    {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0
    }
  ).format(number);

}


/* =========================
   AMANKAN TEXT
========================= */

function escapeHTML(text) {

  const div =
    document.createElement("div");

  div.textContent =
    text;

  return div.innerHTML;

}


/* =========================
   NAMA KATEGORI
========================= */

function getCategoryName(
  category
) {

  const names = {

    editing:
      "Editing",

    design:
      "Design",

    music:
      "Musik",

    productivity:
      "Produktivitas"

  };


  return (
    names[category] ||
    category
  );

}


/* =========================
   GAMBAR PRODUK
========================= */

function getProductImage(
  product
) {

  if (product.image) {

    return `
      <img
        src="${product.image}"
        alt="${escapeHTML(product.name)}"
      >
    `;

  }


  return `

    <div
      style="
        width:100%;
        height:100%;
        display:flex;
        align-items:center;
        justify-content:center;
        font-size:50px;
      "
    >
      ${product.icon || "📱"}
    </div>

  `;

}


/* =========================
   RENDER PRODUK
========================= */

function renderProducts(
  list = products
) {

  const grid =
    document.getElementById(
      "productGrid"
    );


  const empty =
    document.getElementById(
      "emptyProducts"
    );


  grid.innerHTML =
    "";


  if (
    list.length === 0
  ) {

    grid.style.display =
      "none";

    empty.style.display =
      "block";

    return;

  }


  grid.style.display =
    "grid";

  empty.style.display =
    "none";


  list.forEach(product => {

    const card =
      document.createElement("div");


    card.className =
      "product-card";


    card.innerHTML = `

      <div class="product-image">
        ${getProductImage(product)}
      </div>


      <span class="product-category">
        ${getCategoryName(product.category)}
      </span>


      <h3>
        ${escapeHTML(product.name)}
      </h3>


      <p>
        ${escapeHTML(product.description)}
      </p>


      <div class="product-bottom">

        <div class="price">
          ${formatRupiah(product.price)}
        </div>


        <button
          class="buy-btn"
          onclick="buyProduct(${product.id})"
        >
          💬 Beli Sekarang
        </button>

      </div>

    `;


    grid.appendChild(card);

  });

}


/* =========================
   BELI PRODUK
========================= */

function buyProduct(
  productId
) {

  const product =
    products.find(
      item =>
        item.id === productId
    );


  if (!product)
    return;


  const message =
    `Halo Melvin Store 👋

Saya ingin membeli produk:

📦 Produk: ${product.name}
💰 Harga: ${formatRupiah(product.price)}

Mohon informasi untuk proses selanjutnya. Terima kasih 🙏`;


  const url =
    `https://wa.me/${WHATSAPP_NUMBER}` +
    `?text=${encodeURIComponent(message)}`;


  window.open(
    url,
    "_blank"
  );

}


/* =========================
   SEARCH
========================= */

function searchProducts() {

  const input =
    document
      .getElementById(
        "searchInput"
      )
      .value
      .toLowerCase()
      .trim();


  const filtered =
    products.filter(product => {

      const categoryMatch =
        currentCategory === "all" ||
        product.category ===
          currentCategory;


      const searchMatch =
        product.name
          .toLowerCase()
          .includes(input) ||

        product.description
          .toLowerCase()
          .includes(input);


      return (
        categoryMatch &&
        searchMatch
      );

    });


  renderProducts(
    filtered
  );

}


/* =========================
   FILTER KATEGORI
========================= */

function filterCategory(
  category,
  button
) {

  currentCategory =
    category;


  document
    .querySelectorAll(
      ".category"
    )
    .forEach(btn => {

      btn.classList.remove(
        "active"
      );

    });


  button.classList.add(
    "active"
  );


  searchProducts();

}


/* =========================
   ADMIN LOGIN
========================= */

function openAdmin() {

  const overlay =
    document.getElementById(
      "loginOverlay"
    );


  const input =
    document.getElementById(
      "adminPasswordInput"
    );


  const error =
    document.getElementById(
      "loginError"
    );


  overlay.classList.add(
    "show"
  );


  input.value =
    "";


  error.classList.remove(
    "show"
  );


  setTimeout(
    () => input.focus(),
    100
  );

}


function closeLogin(event) {

  if (
    event &&
    event.target !==
      event.currentTarget
  ) {

    return;

  }


  document
    .getElementById(
      "loginOverlay"
    )
    .classList.remove(
      "show"
    );

}


function loginAdmin() {

  const input =
    document.getElementById(
      "adminPasswordInput"
    );


  const error =
    document.getElementById(
      "loginError"
    );


  if (
    input.value ===
    ADMIN_PASSWORD
  ) {

    error.classList.remove(
      "show"
    );


    closeLogin();


    document
      .getElementById(
        "adminOverlay"
      )
      .classList.add(
        "show"
      );


    document.body.style.overflow =
      "hidden";


    renderAdminProducts();


    return;

  }


  error.classList.add(
    "show"
  );


  input.value =
    "";


  input.focus();

}


function togglePassword() {

  const input =
    document.getElementById(
      "adminPasswordInput"
    );


  const button =
    document.getElementById(
      "togglePasswordBtn"
    );


  if (
    input.type ===
    "password"
  ) {

    input.type =
      "text";

    button.textContent =
      "🙈";

  } else {

    input.type =
      "password";

    button.textContent =
      "👁️";

  }

}


function handleLoginKey(
  event
) {

  if (
    event.key ===
    "Enter"
  ) {

    loginAdmin();

  }

}


/* =========================
   TUTUP ADMIN
========================= */

function closeAdmin(event) {

  if (
    event &&
    event.target !==
      event.currentTarget
  ) {

    return;

  }


  document
    .getElementById(
      "adminOverlay"
    )
    .classList.remove(
      "show"
    );


  document.body.style.overflow =
    "";

}


/* =========================
   PREVIEW GAMBAR
========================= */

function previewImage(
  event
) {

  const file =
    event.target.files[0];


  if (!file)
    return;


  if (
    !file.type.startsWith(
      "image/"
    )
  ) {

    alert(
      "File harus berupa gambar."
    );

    return;

  }


  const reader =
    new FileReader();


  reader.onload =
    function(e) {

      selectedImage =
        e.target.result;


      const preview =
        document.getElementById(
          "imagePreview"
        );


      const uploadText =
        document.getElementById(
          "uploadText"
        );


      preview.src =
        selectedImage;


      preview.style.display =
        "block";


      uploadText.style.display =
        "none";

    };


  reader.readAsDataURL(
    file
  );

}


/* =========================
   SIMPAN / EDIT PRODUK
========================= */

function saveProduct() {

  const name =
    document
      .getElementById(
        "productName"
      )
      .value
      .trim();


  const price =
    Number(
      document
        .getElementById(
          "productPrice"
        )
        .value
    );


  const category =
    document
      .getElementById(
        "productCategory"
      )
      .value;


  const description =
    document
      .getElementById(
        "productDescription"
      )
      .value
      .trim();


  const editId =
    document
      .getElementById(
        "editProductId"
      )
      .value;


  if (!name) {

    alert(
      "Nama produk belum diisi."
    );

    return;

  }


  if (
    !price ||
    price < 0
  ) {

    alert(
      "Harga produk belum benar."
    );

    return;

  }


  if (!description) {

    alert(
      "Deskripsi produk belum diisi."
    );

    return;

  }


  /* EDIT */

  if (editId) {

    const index =
      products.findIndex(
        product =>
          product.id ===
          Number(editId)
      );


    if (
      index !== -1
    ) {

      products[index].name =
        name;

      products[index].price =
        price;

      products[index].category =
        category;

      products[index].description =
        description;


      if (
        selectedImage
      ) {

        products[index].image =
          selectedImage;

      }

    }

  }


  /* TAMBAH */

  else {

    products.push({

      id:
        Date.now(),

      name:
        name,

      category:
        category,

      price:
        price,

      image:
        selectedImage,

      icon:
        "📱",

      description:
        description

    });

  }


  saveProductsToStorage();


  renderProducts();

  renderAdminProducts();


  resetForm();


  alert(
    "Produk berhasil disimpan!"
  );

}


/* =========================
   EDIT PRODUK
========================= */

function editProduct(
  productId
) {

  const product =
    products.find(
      item =>
        item.id ===
        productId
    );


  if (!product)
    return;


  document.getElementById(
    "formTitle"
  ).textContent =
    "Edit Produk";


  document.getElementById(
    "editProductId"
  ).value =
    product.id;


  document.getElementById(
    "productName"
  ).value =
    product.name;


  document.getElementById(
    "productPrice"
  ).value =
    product.price;


  document.getElementById(
    "productCategory"
  ).value =
    product.category;


  document.getElementById(
    "productDescription"
  ).value =
    product.description;


  selectedImage =
    product.image || "";


  const preview =
    document.getElementById(
      "imagePreview"
    );


  const uploadText =
    document.getElementById(
      "uploadText"
    );


  if (
    selectedImage
  ) {

    preview.src =
      selectedImage;

    preview.style.display =
      "block";

    uploadText.style.display =
      "none";

  } else {

    preview.style.display =
      "none";

    uploadText.style.display =
      "block";

  }


  document
    .querySelector(
      ".admin-modal"
    )
    .scrollTo({

      top: 0,

      behavior:
        "smooth"

    });

}


/* =========================
   HAPUS PRODUK
========================= */

function deleteProduct(
  productId
) {

  const product =
    products.find(
      item =>
        item.id ===
        productId
    );


  if (!product)
    return;


  const confirmation =
    confirm(
      `Hapus produk "${product.name}"?`
    );


  if (!confirmation)
    return;


  products =
    products.filter(
      item =>
        item.id !==
        productId
    );


  saveProductsToStorage();


  renderProducts();

  renderAdminProducts();

}


/* =========================
   RESET FORM
========================= */

function resetForm() {

  document.getElementById(
    "formTitle"
  ).textContent =
    "Tambah Produk";


  document.getElementById(
    "editProductId"
  ).value =
    "";


  document.getElementById(
    "productName"
  ).value =
    "";


  document.getElementById(
    "productPrice"
  ).value =
    "";


  document.getElementById(
    "productCategory"
  ).value =
    "editing";


  document.getElementById(
    "productDescription"
  ).value =
    "";


  document.getElementById(
    "productImage"
  ).value =
    "";


  selectedImage =
    "";


  document.getElementById(
    "imagePreview"
  ).style.display =
    "none";


  document.getElementById(
    "uploadText"
  ).style.display =
    "block";

}


/* =========================
   LIST PRODUK ADMIN
========================= */

function renderAdminProducts() {

  const list =
    document.getElementById(
      "adminProductList"
    );


  const count =
    document.getElementById(
      "adminProductCount"
    );


  count.textContent =
    `${products.length} produk`;


  list.innerHTML =
    "";


  if (
    products.length === 0
  ) {

    list.innerHTML = `

      <div
        style="
          text-align:center;
          padding:30px;
          color:#77778a;
          font-size:13px;
        "
      >
        Belum ada produk.
      </div>

    `;

    return;

  }


  products.forEach(
    product => {

      const item =
        document.createElement(
          "div"
        );


      item.className =
        "admin-product";


      item.innerHTML = `

        <div class="admin-product-image">

          ${
            product.image

              ? `
                <img
                  src="${product.image}"
                  alt=""
                >
              `

              : `
                <div
                  style="
                    width:100%;
                    height:100%;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    font-size:25px;
                  "
                >
                  ${product.icon || "📱"}
                </div>
              `
          }

        </div>


        <div class="admin-product-info">

          <h4>
            ${escapeHTML(product.name)}
          </h4>

          <p>
            ${formatRupiah(product.price)}
          </p>

        </div>


        <div class="admin-product-actions">

          <button
            class="edit-btn"
            onclick="
              editProduct(${product.id})
            "
          >
            ✏️ Edit
          </button>


          <button
            class="delete-btn"
            onclick="
              deleteProduct(${product.id})
            "
          >
            🗑️ Hapus
          </button>

        </div>

      `;


      list.appendChild(item);

    }
  );

}


/* =========================
   ESC KEY
========================= */

document.addEventListener(
  "keydown",
  function(event) {

    if (
      event.key ===
      "Escape"
    ) {

      closeLogin();

      closeAdmin();

    }

  }
);


/* =========================
   START
========================= */

document.addEventListener(
  "DOMContentLoaded",
  function() {

    renderProducts();

  }
);