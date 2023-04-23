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
        productList.innerHTML = `<thead>
                <tr>
                    <th scope="col">id</th>
                    <th scope="col">product_name</th>
                    <th scope="col">quantity</th>
                </tr>
            </thead>`;

        (data.context).forEach(product => {
            const productHTMLElement = `
                <tbody>
                    <tr>
                        <th scope="row">${product.id}</th>
                        <td>${product.product_name}</td>
                        <td>${product.quantity}</td>
                    </tr>
                </tbody>`;
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