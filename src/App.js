import React, {Component} from 'react';
import './App.css';

import Drawer from './Components/Drawer';
import ListItem from './Components/ListItem';

class App extends Component {
    render() {
        return (
            <div id="app">
                <Drawer style={{zIndex: '1'}}>
                    <ListItem active title={'Indian'} count={'2 recipes'}/>
                    <ListItem title={'Japanese'} count={'4 recipes'}/>
                    <ListItem selected title={'Mexican'} count={'3 recipes'}/>
                </Drawer>
                <Drawer style={{zIndex: '0'}}>
                    <ListItem active title={'Garam Masala'}/>
                    <ListItem title={'Samosas'}/>
                </Drawer>
            </div>
        );
    }
}

export default App;
