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

                <div class="min-h-screen ml-36 mr-36 -mb-36 flex items-center">
                <div class="container mx-auto p-9 bg-white max-w-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-300">
                <img 
                    style={{
                        resizeMode: "cover",
                        height: 300,
                        width: 300,
                        margin: 10,
                        padding: 10,
                        borderRadius: 20,
                        }}
                    src={vap} alt="vap" class="vap"/>     
                    <div class="flex justify-between items-center">
                    <div>
                        <h3 class="mt-2 text-2xl font-semibold">Avis,</h3>
                        <p class="mt-2">man of birds. Bird man. Perpetual loser in Pokemon showdown.</p>
                    </div>
                    </div>
                </div>
                </div>


                <div class="min-h-screen ml-36 mr-36 -mb-36 flex items-center">
                <div class="container mx-auto p-9 bg-white max-w-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-300">
                <img
                    style={{
                        resizeMode: "cover",
                        height: 300,
                        width: 300,
                        margin: 10,
                        padding: 10,
                        borderRadius: 20,
                        }}
                    src={Bo} alt="Bo" class="bo"/>    
                                    
                    <div class="flex justify-between items-center">
                    <div>
                        <h3 class="mt-2 text-2xl font-semibold">Bo,</h3>
                        <p class="mt-2">styling and fonts. Doesn't want to join the official SEI Pokemon league.</p>
                    </div>
                    </div>
                </div>
                </div>
                              
                <div class="min-h-screen ml-36 mr-36 flex items-center">
                <div class="container mx-auto p-9 bg-white max-w-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-300">
                <img
                    style={{
                        resizeMode: "cover",
                        height: 300,
                        width: 300,
                        margin: 5,
                        padding: 10,
                        borderRadius: 20,
                        }}
                        src={cheech} alt="cheech" class="cheech"/>
                    <div class="flex justify-between items-center">
                    <div>
                    <h3 class="mt-2 text-2xl font-semibold"> Chitra,  </h3>
                        <p class="mt-2">plays Yu-gi-oh and pretty good at random 6-vs-6 on Pokemon showdown.</p>
                    </div>
                    </div>
                </div>
                </div>
                                   
    </div>
        );
    }
}

export default About;