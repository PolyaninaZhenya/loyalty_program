import React from 'react';
import ReactLoading from 'react-loading';

const SectionLoading = () => {
    return (
        <div className={'loading'}>
            <ReactLoading height={'50px'} color={'#000585'} width={'100px'}/>
        </div>
    );
};

export default SectionLoading;