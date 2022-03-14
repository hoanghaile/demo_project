import React from 'react';
import { connect } from 'react-redux';
import LoadGif from '../../assets/images/loading.gif'

const state = {}

const PageLoad = () => {
    
    const { loading } = this.props;
    if (!loading) return null;
    return (
        <>
            <div className='loader-container'>  
                <div className='loader'>
                    <img src={LoadGif} alt='load'/>
                </div>
            </div>
        </>
    )
}
const mapStateToProps = state => ( { loading: state.pageLoad.loading } )
export default connect(mapStateToProps) (PageLoad);