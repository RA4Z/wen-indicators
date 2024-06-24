export const formatoMoneyBR = new Intl.NumberFormat(
    'pt-BR',                         //Configura localização como português do Brasil.
    {
        style: 'currency',             //Configura o estilo de formatação como moeda.
        currency: 'BRL'                //Configura a moeda como Real Brasileiro.
    }
)