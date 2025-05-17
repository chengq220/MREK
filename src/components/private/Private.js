import Feed from './Feed';
import PlayList from './PlayList';
import { Route } from 'react-router-dom';
import React from 'react';

function Private(){
    return(
        <React.Fragment>
            <Route path="/feed" element={<Feed />} />
            <Route path="/playlist" element={<PlayList />} />
        </React.Fragment>
    );
}

export default Private