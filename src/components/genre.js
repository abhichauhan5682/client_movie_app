import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import {API_KEY,API_URL} from '../config/default';
import { setAlert } from "../action/alert";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Row,Col} from 'antd';
import {Link} from 'react-router-dom';

const Genre = ({
    setAlert
}) => {
    const [Genre,setGenre]=useState([]);
    useEffect(async ()=>{
        console.log()
        const res=await axios.get(`${API_URL}genre/movie/list?api_key=${API_KEY}`);
        console.log(res);
        if(res.status===200) setGenre(res.data.genres);
        else setAlert("Failed to load the list of Genres",'danger');
    },[])
    return (
        <div className="container">
            <Row guter={[16,16]}>
               {
                   Genre && Genre.map((g,i)=>
                    <Fragment key={i}>
                         <Col  lg={6} md={8} sm={12} xs={24}>
                            <div style={{ position: 'relative' }}>
                                <Link to={`/genre/${g.id}`} >
                                   {g.name} 
                                </Link>
                            </div>
                        </Col>
                    </Fragment>
                   )
               }
            </Row>
        </div>
    )
}


Genre.propTypes={
    setAlert:PropTypes.func.isRequired,
}

export default connect(null,{setAlert})(Genre);
