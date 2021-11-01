import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { FiCheck } from "react-icons/fi";

class TabsOne extends Component{
    render(){
        let 
        tab1 = "Our history", 
        tab2 = "Our mission",
        tab3 = "Friendly Support";
        const { tabStyle } = this.props;
        var namesItemOne = [
            'The Philosophy Of business analytics',
            'Fast-Track Your business',
            'Lies And Damn Lies About business',
            'The Ultimate Deal On business',
        ];
       
        return(
            <div>
                {/* Start Tabs Area */}
                <div className="tabs-area">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <Tabs>
                                    <TabList  className={`${tabStyle}`}>
                                        <Tab>{tab1}</Tab>
                                        <Tab>{tab2}</Tab>
                                        <Tab>{tab3}</Tab>
                                    </TabList>

                                    <TabPanel>
                                       <div className="single-tab-content">
                                           <p>Since 2002, we’ve been helping leading European and North American technology companies create their software products by assembling and managing world-class engineering teams in Eastern Europe. We’ve established a comprehensive system of tools and practices to ensure quick ramp-up, the right cultural fit, high productivity, and great quality of our software development services.</p>

                                           <div className="mt--30">
                                               <h4>Our Process.</h4>
                                               <ul className="list-style--1">
                                                   {namesItemOne.map((name, index) => {
                                                       return <li key={ index }><FiCheck /> {name}</li>;
                                                   })}
                                               </ul>
                                           </div>
                                       </div>
                                    </TabPanel>

                                    <TabPanel>
                                       <div className="single-tab-content">
                                           <p>VirtualsDesign is a trusted supplier of software development services operating in Ukraine, Poland, Germany, UAE and Saudi Arabia. With over 2000 experienced specialists, we deliver solutions as a software development company to Fortune 500 vendors and help leading technology innovators build successful software products in a variety of domains. Intellias has been featured in the 2019 Global Outsourcing 100 list by IAOP, recognized by Inc. 5000, and acknowledged in the GSA UK Awards.</p>
                                           <p>The company opened yet another office and recruited more skilled employees. And as far as app development is concerned, the company successfully completed 1800+ app building with the 100% ratio of succes</p>
                                       </div>
                                    </TabPanel>

                                    <TabPanel>
                                       <div className="single-tab-content">
                                           <h4>Big enough to scale. Small enough to care</h4>
                                           <p>As a midsize software development company, we combine the best of both worlds. We have the focus and speed of the small IT outsourcing companies along with the scalability and expertise of the big ones.</p>
                                           <p>The dealing with each and every client is being valued by the company, which completely go through the demands of the customers and deliver it accordingly. With the opening of newer horizons, the company is still able to maintain its reputed position in the market. Hyperlink maintains an excellent team with highly skilled and dynamic expert professionals in order to preserve the service excellence.</p>
                                       </div>
                                    </TabPanel>
                                    
                                </Tabs>
                            </div>
                        </div>
                    </div>
                </div>
                {/* End Tabs Area */}
            </div>
        )
    }
}



export default TabsOne;