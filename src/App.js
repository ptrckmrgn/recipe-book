import React, {Component} from 'react';
import Firebase from 'firebase';
import 'firebase/firestore';
// import axios from 'axios';
import _ from 'lodash';

import './App.css';

import Drawer from './Components/Drawer';
import ListItem from './Components/ListItem';

const config = {
    apiKey: "AIzaSyCeAo6_H2Okfly3CyjMGKEPCk9yImoBDAM",
    authDomain: "recipe-book-ptrckmrgn.firebaseapp.com",
    databaseURL: "https://recipe-book-ptrckmrgn.firebaseio.com",
    projectId: "recipe-book-ptrckmrgn",
    storageBucket: "gs://recipe-book-ptrckmrgn.appspot.com",
};
Firebase.initializeApp(config);

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: -1,
            categories: null,
            recipesMetadata: null,

            activeCategory: '111',
            selectedCategory: '111',
            activeRecipe: 'aaa'
        }

        this.setCategory = this.setCategory.bind(this);
        this.setRecipe = this.setRecipe.bind(this);
    }

    componentDidMount() {
        const db = Firebase.firestore();
        const settings = {timestampsInSnapshots: true};
        db.settings(settings)
        db.collection('categories').onSnapshot(response => {
            const categories = {};
            response.forEach(category => {
                categories[category.id] = category.data();
            });
            this.setState({
                isLoading: this.state.isLoading + 1,
                categories
            });
        });
        db.collection('recipes_metadata').onSnapshot(response => {
            const recipesMetadata = {};
            response.forEach(recipe => {
                recipesMetadata[recipe.id] = recipe.data();
            });
            this.setState({
                isLoading: this.state.isLoading + 1,
                recipesMetadata
            });
        });

        // this.setState({
        //     isLoading: false,
        // })

        // Promise.all([
        //     axios.get('./data/categories.json'),
        //     axios.get('./data/recipe_metadata.json'),
        //     axios.get('./data/recipe.json')
        // ]).then(response => {
        //     this.setState({
        //         activeRecipe: response[2].data
        //     });
        //     axios.get('./data/recipes.json').then(response => {
        //         this.setState({
        //             recipes: response.data
        //         });
        //     });
        // });
    }

    setCategory(id) {
        this.setState({activeCategory: id});
    }

    displayCategories() {
        return _.map(this.state.categories, (category, id) => {
            return (
                <ListItem
                    selected={id === this.state.activeCategory}
                    key={id}
                    onClick={this.setCategory}
                    id={id}
                    title={category.name}
                    subtitle={`${category.recipe_count} recipes`}
                />
            );
        });
    }

    setRecipe(id) {
        this.setState({activeRecipe: id});
    }

    displayRecipes() {
        const recipes = this.state.categories[this.state.activeCategory].recipes;
        return _.map(recipes, (value ,id) => {
            const recipe = this.state.recipesMetadata[id];
            return (
                <ListItem
                    key={id}
                    onClick={this.setRecipe}
                    id={id}
                    title={recipe.title}
                />
            );
        });
    }

    displayRecipe() {
        return this.state.recipes[this.state.activeRecipe].ingredients;
    }

    render() {
        if (this.state.isLoading < 1) {
            return (
                <div>Loading...</div>
            );
        }
        else {
            return (
                <div id="app">
                    <Drawer style={{zIndex: '1'}}>
                        {this.displayCategories()}
                    </Drawer>

                    <Drawer style={{zIndex: '0'}}>
                        {/* {this.displayRecipes()} */}
                    </Drawer>
                    {/* {this.displayRecipe()} */}
                </div>
            );
        }
    }
}

export default App;
