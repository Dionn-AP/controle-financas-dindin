import './styles.css';
import { useState, useEffect } from 'react';
import { getItem, getHeaders } from '../../utils/storageAndFunctions';
import IconCloseWhite from '../../assets/icon-close-rotate-wihte.svg';
import IconPlusBlack from '../../assets/icon-plus-black.svg';
import api from '../../services/api';

function BoxFilters({ setTransactions, lodaTransactions }) {
    const token = getItem('token');

    const [btnActive, setBtnActive] = useState([]);
    let wordsFilter = 'filtro[]=';
    let arrayCategories = [...btnActive];
  
    async function listCategories() {
        try {
            const response = await api.get('/categoria', getHeaders(token));
            const resultResponse = [...response.data];
            // eslint-disable-next-line
            resultResponse.map((item) => {
                arrayCategories.push({
                    id: item.id,
                    name: item.nome,
                    status: false
                });
            });
            setBtnActive(arrayCategories);
        } catch (error) {
            console.log(error.response)
        }
    }

    function handleActiveFilter(categories, index) {
        let categorieFind = arrayCategories.find((item) => {
            return item.id === categories.id
        });

        if (categories.status) {
            arrayCategories[index] = {
                ...categorieFind, status: false
            }
            setBtnActive(arrayCategories);
        }
        if (!categories.status) {
            arrayCategories[index] = {
                ...categorieFind, status: true
            }
            setBtnActive(arrayCategories);
        }
    }

    async function aplicationFilters() {
        let existFilter = arrayCategories.find((item) => {
            return item.status === true
        });
        if (!existFilter) { return }

        for (let cat of arrayCategories) {
            if (cat.status) {
                wordsFilter += `${cat.name}&filtro[]=`
            }
        }

        try {
            const response = await api.get(`/transacao?${wordsFilter}`, getHeaders(token));
            setTransactions([...response.data]);

        } catch (error) {
            console.log(error)
        }
    }

    function clearFilter() {
        for (let cat of arrayCategories) {
            if (cat.status) {
                cat.status = false;
            }
        }
        wordsFilter = 'filtro[]=';
        setBtnActive(arrayCategories);
        lodaTransactions();
    }

    useEffect(() => {
        listCategories();
        // eslint-disable-next-line
    }, []);

    return (
        <div className='container-filter'>
            <h4>Categorias</h4>
            <div className='container-categories'>
                {btnActive.map((categories, index) => (
                    <button
                        key={categories.id}
                        className='btn-filter'
                        style={{
                            color: !categories.status ? '#000' : '#fff',
                            backgroundColor: !categories.status ? '#FAFAFA' : '#7978D9'
                        }}
                    >
                        {categories.name}
                        <img
                            src={!categories.status ? IconPlusBlack : IconCloseWhite}
                            alt='icon-close'
                            onClick={() => handleActiveFilter(categories, index)}
                        />
                    </button>
                ))}
            </div>
            <div className='buttons-filters'>
                <button
                    onClick={clearFilter}
                >Limpar Filtros
                </button>
                <button
                    onClick={aplicationFilters}
                >Aplicar Filtros</button>
            </div>
        </div>
    )
}

export default BoxFilters;