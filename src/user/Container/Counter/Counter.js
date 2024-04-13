
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Button } from 'reactstrap';
import { decreamentCount, increamentCount } from '../../../Redux/countslice';

function Counter(props) {

    const countVal = useSelector(state => state.counter);
    console.log(countVal);

    const dispatch = useDispatch();

    const handleInc = () => {
        dispatch(increamentCount())
    }

    const handleDec = () => {
        dispatch(decreamentCount())
    }

    return (

        <div className="input-group quantity mb-5" style={{ width: 100 }}>
            <div className="input-group-btn">
                <button className="btn btn-sm btn-minus rounded-circle bg-light border" outline onClick={handleDec}  disabled={countVal.count === 1}>
                    <i className="fa fa-minus" />
                </button>
            </div>
            <input type="text" className="form-control form-control-sm text-center border-0" defaultsetValue={1} value={ countVal.count } />
            <div className="input-group-btn">
                <button className="btn btn-sm btn-plus rounded-circle bg-light border" onClick={handleInc} >
                    <i className="fa fa-plus" />
                </button>
            </div>
        </div>


    );
}

export default Counter;