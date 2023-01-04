import './style.css';
import IconPolygon from '../../assets/polygon.svg';


function PopPup({ deleteTransaction, setShowIcons, transaction }) {

    return (
        <div className='pop-pup'>
            <img className='arrow-up' src={IconPolygon} alt='icon-arrow-up' />
            Apagar item?
            <div className='btn-yes-no'>
                <button className='yes'
                    onClick={() => deleteTransaction(transaction.id)}
                >Sim</button>
                <button className='no'
                    onClick={() => setShowIcons(false)}
                >Não</button>
            </div>
        </div>
    )
};

export default PopPup;