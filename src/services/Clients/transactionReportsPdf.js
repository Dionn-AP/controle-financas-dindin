import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { convertValues, convertDate } from '../../utils/storageAndFunctions';
import "intl";
import "intl/locale-data/jsonp/pt-BR";

function transactionPdf(transactions, balance) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    const reportTitle = [
        {
            text: 'Detalhes das Transações',
            fontSize: 15,
            bold: true,
            margin: [15, 20, 40, 45]
        }
    ];

    const data = transactions.map((transaction) => {
        return [
            { text: transaction.categoria_nome, fontSize: 9, margin: [0, 2, 0, 2] },
            { text: transaction.descricao, fontSize: 9, margin: [0, 2, 0, 2] },
            { text: convertDate(new Date(transaction.data)), fontSize: 9, margin: [0, 2, 0, 2] },
            { text: convertValues(transaction.valor), fontSize: 9, margin: [0, 2, 0, 2] }
        ]
    });

    const resume = [
        { text: convertValues(balance.entrada), fontSize: 9, margin: [0, 2, 0, 2] },
        { text: convertValues(balance.saida), fontSize: 9, margin: [0, 2, 0, 2] },
        { text: convertValues(balance.saldo), fontSize: 9, margin: [0, 2, 0, 2] }
    ];

    const details = [
        {
            table: {
                headerRows: 1,
                widths: ['*', '*', '*', '*'],
                body: [
                    [
                        { text: 'Categoria', style: 'tableHeader', fontSize: 10 },
                        { text: 'Descrição', style: 'tableHeader', fontSize: 10 },
                        { text: 'Data', style: 'tableHeader', fontSize: 10 },
                        { text: 'Valor', style: 'tableHeader', fontSize: 10 }
                    ],
                    ...data
                ]
            },
            layout: 'lightHorizontalLines'
        },

        { text: 'Resumo Total', style: 'subheader', margin: [0, 50, 0, 10] },
        {
            style: 'tableExample',
            table: {
                body: [
                    [
                        { text: 'Entradas', style: 'tableBody', fontSize: 9 },
                        { text: 'Saídas', style: 'tableBody', fontSize: 9 },
                        { text: 'Saldo', style: 'tableBody', fontSize: 9 }
                    ],
                    [...resume]
                ]
            },
        }
    ];

    function Baseboard(currentPage, pageCount) {
        return [
            {
                text: currentPage + '-' + pageCount,
                alignment: 'right',
                fontSize: 9,
                margin: [0, 10, 20, 0]
            }
        ]
    }

    const docCompleted = {
        pageSize: 'A4',
        pageMargins: [15, 50, 15, 40],
        header: [reportTitle],
        content: [details],
        footer: Baseboard
    }

    pdfMake.createPdf(docCompleted).download();
}

export default transactionPdf;