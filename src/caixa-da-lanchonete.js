const cardapio = // code , price , dependency index
[ 
    ["cafe", 3.00, ""],
    ["chantily", 1.50, "cafe"],
    ["suco", 6.20, ""],
    ["sanduiche", 6.50, ""],
    ["queijo", 2.00, "sanduiche"],
    ["salgado", 7.25, ""],
    ["combo1", 9.50, ""],
    ["combo2", 7.50, ""],
];

class CaixaDaLanchonete
{

    calcularValorDaCompra(metodoDePagamento, itens)
    {
        if(itens.length == 0) // there are itens to be purchesed
        {
            return "Não há itens no carrinho de compra!";
        }

        var valor = 0.0; // to calculate final price
        var itensData = [];
        for(var w = 0; w < itens.length; w++) // breaks itens strings into data
        {
            itensData[w] = itens[w].split(',');
        }

        for(var x = 0; x < itensData.length; x++) // for each item in the basket
        {
            if(itensData[x][1] < 1) // validate quantity
            {
                return "Quantidade inválida!";
            }

            var itemInval = true; // for item validation

            for(var y = 0; y < cardapio.length; y++) // finds current item on the menu
            {
                if(itensData[x][0] == cardapio[y][0])
                {
                    if(cardapio[y][2] != "") // if the item has a depenency
                    {
                        var acompanhamentoInval = true;

                        for(var z = 0; z < itensData.length; z++) // searches for dependency in the basket
                        {
                            if(itensData[z][0] == cardapio[y][2]) // found dependency
                            {
                                acompanhamentoInval = false;
                                break;
                            }
                        }

                        if(acompanhamentoInval) // dependency not found
                        {
                            return "Item extra não pode ser pedido sem o principal";
                        }
                    }

                    valor += cardapio[y][1] * itensData[x][1];
                    itemInval = false;
                    break;
                }
            }

            if(itemInval) // item was not found in the menu
            {
                return "Item inválido!";
            }
        }

        if(metodoDePagamento == "dinheiro")
        {
            valor *= 0.95;
        }
        else if(metodoDePagamento == "credito")
        {
            valor *= 1.03;
        }
        else if(metodoDePagamento != "debito")
        {
            return "Forma de pagamento inválida!"
        }

        return "R$ " + valor.toFixed(2).toLocaleString();
    }

}

export { CaixaDaLanchonete };
