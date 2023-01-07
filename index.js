const data = [
    {
        id: 1,
        img: "../img/jaqueta.svg",
        nameItem: "Lightweight Jacket",
        description:
            "Adicione um pouco de energia ao seu guarda-roupa de inverno com esta jaqueta vibrante...",
        value: 100,
        addCart: "Adicionar ao carrinho",
        tag: ["Camisetas"],
    },
    {
        id: 2,
        img: "../img/gorro.svg",
        nameItem: "Black Hat",
        description:
            "O gorro Next.js chegou! Esta beldade bordada tem um ajuste confortável que garante que...",
        value: 100,
        addCart: "Adicionar ao carrinho",
        tag: ["Acessórios"],
    },
    {
        id: 3,
        img: "../img/mascara.svg",
        nameItem: "Mask",
        description:
            "Esta máscara facial durável é feita de duas camadas de tecido tratado e possui presilhas...",
        value: 40,
        addCart: "Adicionar ao carrinho",
        tag: ["Acessórios"],
    },
    {
        id: 4,
        img: "../img/camiseta_preta.svg",
        nameItem: "T-Shirt",
        description:
            "Esta t-shirt é imprescindível no seu guarda-roupa, combinando o caimento intemporal de...",
        value: 100,
        addCart: "Adicionar ao carrinho",
        tag: ["Camisetas"],
    },
    {
        id: 5,
        img: "../img/camiseta_branca.svg",
        nameItem: "Short-Sleeve T-Shirt",
        description:
            "Agora você encontrou a camiseta básica do seu guarda-roupa. É feito de um mais grosso...",
        value: 100,
        addCart: "Adicionar ao carrinho",
        tag: ["Camisetas"],
    },
    {
        id: 6,
        img: "../img/moletom.svg",
        nameItem: "Champion Packable Jacket",
        description:
            "Proteja-se dos elementos com esta jaqueta embalável Champion. Esta jaqueta de poliést...",
        value: 100,
        addCart: "Adicionar ao carrinho",
        tag: ["Camisetas"],
    },
];
let secaoVitrine = document.getElementsByClassName("vitrine")[0];
let secaoCarrinho = document.querySelector(".box ul");
let secaoHeader = document.querySelector(".menu-header a");

function mostrarProduto(listaProdutos, secaoProduto) {
    secaoProduto.innerHTML = " ";
    for (let i = 0; i < listaProdutos.length; i++) {
        let produto = listaProdutos[i];
        let cardProduto = criarCard(produto);
        secaoProduto.appendChild(cardProduto);
    }
}
mostrarProduto(data, secaoVitrine);

function criarCard(produto) {

    let id = produto.id;
    let ProductCard = document.createElement("li");
    let ProductTag = document.createElement("span");
    let main = document.createElement("main");
    let ProductCategory = document.createElement("h3");
    let ProductImg = document.createElement("img");
    let ProductTitle = document.createElement("h2");
    let ProductPrice = document.createElement("p");
    let ProductButton = document.createElement("button");
    let buttonRemove = document.createElement("h6");

    buttonRemove.id = id;
    ProductButton.id = id;
    ProductTag.innerText = produto.tag;
    ProductImg.src = produto.img;
    ProductTitle.innerText = produto.nameItem;
    ProductCategory.innerText = produto.description;
    ProductPrice.innerText = "R$" + produto.value;
    ProductButton.innerText = produto.addCart;
    buttonRemove.innerText = "Remover produto";

    secaoVitrine.classList.add("cards");
    ProductCard.classList.add("card");
    main.classList.add("cards");

    ProductCard.append(ProductImg, main);
    main.append(
        ProductTag,
        ProductTitle,
        ProductCategory,
        ProductPrice,
        ProductButton,
        buttonRemove
    );
    return ProductCard;
}

secaoVitrine.addEventListener("click", capturarProduto);

let carrinho = [];

function capturarProduto(event) {
    let ProductButton = event.target;
    if (ProductButton.tagName == "BUTTON") {

        let produto = data.find(function (produto) {
            if (produto.id == ProductButton.id) {
                return produto;
            }
        });
        addCarrinho(produto);
    }
}

function addCarrinho(produto) {
    if (produto !== undefined) {
        carrinho.push(produto);
    }
    mostrarProduto(carrinho, secaoCarrinho);
    calcularTotal(carrinho);
    calcularTotalQuantidade(produto);
}

secaoCarrinho.addEventListener("click", capturarProdutoCarrinho);

function capturarProdutoCarrinho(event) {
    let buttonRemove = event.target;
    if (buttonRemove.tagName == "H6") {

        let produto = carrinho.find(function (produto) {
            if (produto.id == buttonRemove.id) {
                return produto;
            }
        });
        removerProdutoCarrinho(produto);
        calcularTotal();
        calcularTotalQuantidade(produto);
    }
}

function removerProdutoCarrinho(produto) {
    let pos = carrinho.indexOf(produto);

    carrinho.splice(pos, 1);

    mostrarProduto(carrinho, secaoCarrinho);
}

function calcularTotal() {
    let total = 0;
    for (let i = 0; i < carrinho.length; i++) {
        total += carrinho[i].value;
    }
    document.querySelector(".price").innerText = "R$" + total;
}

function calcularTotalQuantidade() {
    let quantidade = 0;

    quantidade += carrinho.length;

    document.querySelector(".valor").innerText = quantidade;
}

function buscar(valorPesquisa) {
    let resultado = [];

    for (let i = 0; i < data.length; i++) {
        let pesquisa = valorPesquisa.toLowerCase();
        let nomeProduto = data[i].nameItem.toLowerCase();

        if (nomeProduto.includes(pesquisa)) {
            resultado.push(data[i]);
        }
    }

    return resultado;
}

let inputBusca = document.querySelector(".pesquisa input");
let buttonBusca = document.querySelector(".pesquisa button");

buttonBusca.addEventListener("click", function () {

    let pesquisa = inputBusca.value

    let resultado = buscar(pesquisa);

    mostrarProduto(resultado, secaoVitrine);
    inputBusca.value = ""
});

inputBusca.addEventListener("keyup", function () {
    let pesquisaUsuario = inputBusca.value;

    let resultado = buscar(pesquisaUsuario);

    mostrarProduto(resultado, secaoVitrine);
});


