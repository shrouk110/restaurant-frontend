     const btnCart = document.querySelector('.btn-cart');
        const cart = document.querySelector('.cart');
        const btnClose = document.querySelector('#cart-close');

        if (btnCart && cart && btnClose) {
            btnCart.addEventListener('click', () => {
                cart.classList.add('cart-active');
            });

            btnClose.addEventListener('click', () => {
                cart.classList.remove('cart-active');
            });

            document.addEventListener('DOMContentLoaded', loadFood);

            function loadFood() {
                loadContent();
            }

            function loadContent() {
                // remove item
                let btnRemove = document.querySelectorAll('.cart-remove');
                btnRemove.forEach((btn) => {
                    btn.addEventListener('click', removeItem);
                });

                // change qty
                let qtyElements = document.querySelectorAll('.cart-quantity');
                qtyElements.forEach((input) => {
                    input.addEventListener('change', changeQty);
                });

                // add to cart
                let cartBtns = document.querySelectorAll('.add-cart');
                cartBtns.forEach((btn) => {
                    btn.addEventListener('click', addCart);
                });

                updateTotal();
            }

            function removeItem() {
                if (confirm('Are you sure to remove')) {
                    let title = this.parentElement.querySelector('.cart-food-title').innerHTML;
                    itemList = itemList.filter(el => el.title != title);
                    this.parentElement.remove();
                    loadContent();
                }
            }

            function changeQty() {
                if (isNaN(this.value) || this.value < 1) {
                    this.value = 1;
                }
                loadContent();
            }

            let itemList = [];

            function addCart() {
                let food = this.parentElement;
                let title = food.querySelector('.food-title').innerHTML;
                let price = food.querySelector('.food-price').innerHTML;
                let imgSrc = this.parentElement.querySelector('.food-img').src;

                let newProduct = { title, price, imgSrc };

                if (itemList.find((el) => el.title == newProduct.title)) {
                    alert("Product Already added in cart");
                    return;
                } else {
                    itemList.push(newProduct);
                }

                let newProductElement = createCartProduct(title, price, imgSrc);
                let element = document.createElement('div');
                element.innerHTML = newProductElement;
                let cartBasket = document.querySelector('.cart-content');
                cartBasket.append(element);
                loadContent();
            }

            function createCartProduct(title, price, imgSrc) {
                return `
                    <div class="cart-box">
                        <img src="${imgSrc}" class="cart-img">
                        <div class="detail-box">
                            <div class="cart-food-title">${title}</div>
                            <div class="price-box">
                                <div class="cart-price">${price}</div>
                                <div class="cart-amt">${price}</div>
                            </div>
                            <input type="number" value="1" class="cart-quantity">
                        </div>
                        <i class="fa fa-trash cart-remove"></i>
                    </div>
                `;
            }

            function updateTotal() {
                const cartItems = document.querySelectorAll('.cart-box');
                const totalValue = document.querySelector('.total-price');

                let total = 0;
                cartItems.forEach(product => {
                    let priceElement = product.querySelector('.cart-price');
                    let price = parseFloat(priceElement.innerHTML.replace("Rs.", ""));
                    let qty = product.querySelector('.cart-quantity').value;
                    total += (price * qty);
                    product.querySelector('.cart-amt').innerText = "Rs." + (price * qty);
                });

                if (totalValue) totalValue.innerHTML = 'Rs.' + total;

                const cartCount = document.querySelector('.cart-count');
                if (cartCount) {
                    let count = itemList.length;
                    cartCount.innerHTML = count;

                    if (count == 0) {
                        cartCount.style.display = 'none';
                    } else {
                        cartCount.style.display = 'block';
                    }
                }
            }
        }

  
        document.addEventListener("DOMContentLoaded", () => {
            const btnSend = document.querySelector(".btn-send");

            if (btnSend) {
                btnSend.addEventListener("click", () => {
                    let name = document.getElementById("txtName").value.trim();
                    let phone = document.getElementById("numphone").value.trim();
                    let people = document.getElementById("txtPeople").value.trim();

                    if (name === "" || phone === "" || people === "") {
                        alert("⚠️ Please fill all fields!");
                        return;
                    }

                  
                    let reservation = { name, phone, people };
                    localStorage.setItem("reservation", JSON.stringify(reservation));

                   
                    alert(`✅ Reservation confirmed!\nName: ${name}\nPhone: ${phone}\nPeople: ${people}`);

                   
                    document.getElementById("txtName").value = "";
                    document.getElementById("numphone").value = "";
                    document.getElementById("txtPeople").value = "";
                });
            }
        });  


     document.addEventListener("DOMContentLoaded", () => {
                const btnSend = document.querySelector(".btn-send");

                btnSend.addEventListener("click", () => {
                    let name = document.getElementById("txtName").value.trim();
                    let phone = document.getElementById("numphone").value.trim();
                    let mail = document.getElementById("txtMail").value.trim();
                    let msg = document.getElementById("txtMsg").value.trim();

                   
                    if (name === "" || phone === "" || mail === "" || msg === "") {
                        alert("⚠️ Please fill all fields!");
                        return;
                    }

                  
                    let phoneRegex = /^[0-9]{10,15}$/;
                    if (!phoneRegex.test(phone)) {
                        alert("⚠️ Please enter a valid phone number!");
                        return;
                    }

                
                    let mailRegex = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
                    if (!mailRegex.test(mail)) {
                        alert("⚠️ Please enter a valid email!");
                        return;
                    }

                 
                    let contactData = { name, phone, mail, msg };
                    localStorage.setItem("contactMessage", JSON.stringify(contactData));

                  
                    alert(`✅ Message sent!\nName: ${name}\nPhone: ${phone}\nEmail: ${mail}\nMessage: ${msg}`);

                   
                    document.getElementById("txtName").value = "";
                    document.getElementById("numphone").value = "";
                    document.getElementById("txtMail").value = "";
                    document.getElementById("txtMsg").value = "";
                });
            });