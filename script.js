class Produkt {
    constructor(id, title, description, price, discountPercentage, rating, stock, brand, category, thumbnail, images) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.discountPercentage = discountPercentage;
        this.rating = rating;
        this.stock = stock;
        this.brand = brand;
        this.category = category;
        this.thumbnail = thumbnail;
        this.images = images;
    }

    getCard() {
        return ` 
        <div class="card">
            <img src="${this.images[1]}" alt="Avatar" style="width:100%" height="200px">
                <div class="card_body">
                    <h4><b>${this.title}</b></h4>
                    <p>${this.description}</p>
                    <hr>
                    <br><p>Price: ${this.price}</p><br>
                    <p>Stock: ${this.stock}</p><br>
                    <p>Rating: ${this.rating}</p><br>
                    <button>Select</button>
                </div>
        </div>
        `;
    }

    getTable() {
        return `
        <tr>
            <td>${this.title}</td>
            <td>${this.description}</td>
            <td>${this.price}</td>
            <td>${this.discountPercentage}</td>
            <td>${this.rating}</td>
            <td>${this.stock}</td>
            <td>${this.brand}</td>
            <td>${this.category}</td>
        </tr>
        `;
    }


}
let data;
let procenta;
class Evidence {
    constructor() {
        this.produkty = [];
        this.nactiProdukty();
    }

    addProdukt(produkt) {
        this.produkty.push(produkt);
    }


    nactiProdukty() {
        if (localStorage.getItem("produkty") == null) {
            this.nactiProduktyZWebu();
            console.log("Data byly nacteny z webu");

        } else if (localStorage.getItem("produkty") != null) {
            this.nactiProduktyZLocalStorage();
            console.log("Data byly nacteny z local storage");

        } else {
            this.vymazLocalStorage();
            console.error("Data byly vymazany");
        }
    }

    
    nactiProduktyZWebu() {
        const req = new XMLHttpRequest();
        req.open("GET", "https://dummyjson.com/products");
        req.send();

        req.onprogress = (event) => {
            if (event.loaded) {
                procenta = 100;
            }
            
        }

        req.onload = (e) => {
            data = JSON.parse(req.responseText);

            if (data == null || data == undefined) {
                console.error("Error because parsing");
                return;
            }

            data["products"].forEach(produkt => {
                this.addProdukt(new Produkt(
                    produkt.id,
                    produkt.title,
                    produkt.description,
                    produkt.price,
                    produkt.discountPercentage,
                    produkt.rating,
                    produkt.stock,
                    produkt.brand,
                    produkt.category,
                    produkt.thumbnail,
                    produkt.images
                ));
            });

            this.ulozToLocalStorage();
            this.printProducts();
            console.log(procenta);
            if (procenta == 100) {
                document.getElementById("progressbar").style.backgroundColor = "green";
                document.getElementById("load").innerText = "LOADED";
            }
        }
    }


    nactiProduktyZLocalStorage() {
        let produkty = JSON.parse(localStorage.getItem("produkty"));

        produkty.forEach(produkt => {
            this.addProdukt(new Produkt(
                produkt.id,
                produkt.title,
                produkt.description,
                produkt.price,
                produkt.discountPercentage,
                produkt.rating,
                produkt.stock,
                produkt.brand,
                produkt.category,
                produkt.thumbnail,
                produkt.images
            ));
        });

        this.printProducts();
    }
    

  

    ulozToLocalStorage() {
        localStorage.setItem("produkty", JSON.stringify(this.produkty));
    }

    vymazLocalStorage() {
        localStorage.removeItem("produkty");
    }


    printProducts() {
        let html = "";
        let contentView = document.getElementById("content");
        const MODE = contentView.getAttribute("data-mode");

        if (MODE == null || MODE == undefined) {
            console.error("Error");
            return;
        }

        switch (MODE) {
            case "cards":
                this.produkty.forEach(produkt => {
                    html += produkt.getCard();
                });
                break;

            case "table":
                html += ` <tr><th>Title</th><th>Description</th><th>Price</th><th>Discount</th><th>Rating</th><th>Stock</th><th>Brand</th><th>Category</th></tr>`;
                this.produkty.forEach(produkt => {
                    html += produkt.getTable();
                });
                break;

            default:
                console.error("Error printing products on page");
        }
        document.getElementById("content").innerHTML = html;
        
    }
}


onload = () => {
    let evidence = new Evidence();
}


