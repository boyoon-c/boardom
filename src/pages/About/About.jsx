import React, { Component } from 'react';
import vap from '../../images/vap.jpg';
import Bo from '../../images/Bo.png';
import cheech from '../../images/cheech.png';

class About extends Component {
    render() {
        
        return (
            <div>
                <h1
                style={{
                    fontSize: 50,
                    textAlign: 'center',
                }}
                >About ABC</h1>
                <img 
                style={{
                    resizeMode: "cover",
                    height: 300,
                    width: 300,
                    margin: 10,
                    padding: 10
                  }}
                src={vap} alt="vap" class="vap"/> 
                Avis, man of birds. Bird man. Perpetual loser in Pokemon showdown.
                 <br></br>
                    <img
                    style={{
                        resizeMode: "cover",
                        height: 300,
                        width: 300,
                        margin: 10,
                        padding: 10
                      }}
                    src={Bo} alt="Bo" class="bo"/> 
                    Bo, styling and fonts. Doesn't want to join the official SEI Pokemon league.  
                    <br></br>
                <img
                style={{
                    resizeMode: "cover",
                    height: 300,
                    width: 300,
                    margin: 5,
                    padding: 10
                  }}
                 src={cheech} alt="cheech" class="cheech"/>
                Chitra, plays Yu-gi-oh and pretty good at random 6-vs-6 on Pokemon showdown.
            </div>



        );
    }
}

export default About;