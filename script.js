class Zeme {
    constructor(id_nation, nation, id_year, year, population, slug_nation) {
        this.id_nation = id_nation;
        this.nation = nation;
        this.id_year = id_year;
        this.year = year;
        this.population = population;
        this.slug_nation = slug_nation;
    }

}


class Evidence {
    constructor(zeme) {
        this.zeme = zeme;
    }


    addZem(z) {
        this.zeme.push(z);
    }
}



let text = document.getElementById("text");
function reqListener() {
    console.log(this.responseText);
    text.textContent = this.responseText;
}


const req = new XMLHttpRequest();
req.addEventListener("load", reqListener);

req.open("GET", "https://datausa.io/api/data?drilldowns=Nation&measures=Population");
req.send();





let btn = document.getElementById("btn");


function addToLocalStorage() {

    localStorage.setItem("data", text.textContent);
}

btn.addEventListener("click", addToLocalStorage);






