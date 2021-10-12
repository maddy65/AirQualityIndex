import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';  
 
class AIQChart extends Component {  


    constructor(props){
        super(props)

        this.state = {
             chartData: {},
             data : [] 
            };
    }

    webs = new WebSocket("wss://city-ws.herokuapp.com")

    componentDidMount(){
        this.webs.onopen = () => {
            console.log('connected')
        }
    
        this.webs.onmessage = evt => {
            var res = JSON.parse(evt.data);
            this.updateValue(res);
        }
    
        this.webs.onclose = () => {
            console.log('disconnected')
        }
    }

    updateValue(res){
        if(this.state.data.length == 0){
            this.setState({data:res})
        }else{
            var stateArray = this.state.data;
            for(var j=0; j<res.length; j++){
                const i = stateArray.findIndex(_item => _item.city === res[j].city);
                if (i > -1) stateArray[i] = res[j]; 
                else stateArray.push(res[j]);
            }
            this.setState({data:stateArray})
        }

        var result = this.state.data;

        let cityName = [];
        let aiq = [];
        result.forEach(element => {
            cityName.push(element.city);
            aiq.push(element.aqi);
        });
        this.setState({  
            chartData :{
                labels: cityName,  
                datasets : [{
                    data: aiq, 
                    label: 'Aiq Data',  
                    backgroundColor : [

                        "#3cb371",  
                        "#0000FF",  
                        "#9966FF",  
                        "#4C4CFF",  
                        "#00FFFF",  
                        "#f990a7",  
                        "#aad2ed",  
                        "#FF00FF",  
                        "Blue",  
                        "Red" 

                    ]
                }]
            }
        });
    }
 
	render() {	
		
		return (
		<div>
             <Bar data={this.state.chartData}  
                options={{ maintainAspectRatio: false }} ></Bar>  
		</div>
		);
	}
	
	
}
 
export default AIQChart;