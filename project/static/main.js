function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + "=")) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


function addProduct(url, payload) {
    fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            "X-CSRFToken": getCookie("csrftoken"),
        },
        body: JSON.stringify({ payload: payload })
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        });
}


function getAllProducts(url) {
    fetch(url, {
        headers: {
            "X-Requested-With": "XMLHttpRequest",
        }
    })
    .then(response => response.json())
    .then(data => {
        const productList = document.getElementById("productList")
        productList.innerHTML = "";

        (data.context).forEach(product => {
            const productHTMLElement = `
                <div class="card rounded-3 shadow-5 mb-4">
                    <div class="card-body p-4">
                        <div class="row d-flex justify-content-between align-items-center">
                            <div class="col-md-2 col-lg-2 col-xl-2">
                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp"
                                    class="img-fluid rounded-3" alt="Cotton T-shirt">
                            </div>
                            <div class="col-md-3 col-lg-3 col-xl-3">
                                <p class="lead fw-normal mb-2">${product.product_name}</p>
                                <p><span class="text-muted">Size: </span>M <span class="text-muted">Color: </span>Grey</p>
                            </div>
                            <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                                <button class="btn btn-link px-2" onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
                                    <i class="fas fa-minus"></i>
                                </button>
                
                                <input id="form1" min="0" name="quantity" value="${product.quantity}" type="number"
                                    class="form-control form-control-sm" />
                
                                <button class="btn btn-link px-2" onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
                                    <i class="fas fa-plus"></i>
                                </button>
                            </div>
                            <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                <h5 class="mb-0">$499.00</h5>
                            </div>
                            <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                            <!-- <button id="x-button-delete" product-id="${product.id}" class="btn btn-primary">asdasd</button> -->
                                <a id="x-button-delete" product-id="${product.id}" role="button" class="text-danger"><i class="fas fa-xmark fa-lg"></i></i></a>
                            </div>
                        </div>
                    </div>
                </div>`
            productList.innerHTML += productHTMLElement;
        });
    });
}


function updateProduct(url, payload) {
    fetch(url, {
        method: "PUT",
        credentials: "same-origin",
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            "X-CSRFToken": getCookie("csrftoken"),
        },
        body: JSON.stringify({payload: payload})
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    });
}


function deleteProduct(url) {
    fetch(url, {
        method: "DELETE",
        credentials: "same-origin",
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            "X-CSRFToken": getCookie("csrftoken"),
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    });
}