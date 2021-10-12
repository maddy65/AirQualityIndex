import React, { Component } from 'react';
import AQIDisplay from './AQIDispaly';
import AIQResults from './AIQResults'



class CentralPanel extends Component{
    constructor(props){
        super(props)

        
    }


    render() {
        return (

            <div class="container">
              
                <div class="row">
                    <div class="col">
                        <AIQResults />
                    </div>
                    <div class="col">
                        <AQIDisplay />
                       
                    </div>
                </div>
            </div>

          
        );
    }
}

export default CentralPanel