import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import _ from 'lodash';

import Drawer from '../components/Drawer';
import ListItem from '../components/ListItem';
import {fetchCategories, fetchRecipeMetadata} from '../actions/recipes';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            categories: null,
            recipesMetadata: null,

            activeCategory: 'pFKHwMjbe7z0gDO9Rlm3',
            selectedCategory: '111',
            activeRecipe: 'aaa'
        }

        this.setCategory = this.setCategory.bind(this);
        this.setRecipe = this.setRecipe.bind(this);
    }

    componentWillMount() {
        this.props.fetchCategories();
        this.props.fetchRecipeMetadata();
    }

    componentDidMount() {
    }

    componentWillUpdate(nextProps) {
        const isLoading = _.map(nextProps.isLoading, value => {
            return value;
        }).includes(true);
        if (isLoading !== this.state.isLoading) {
            this.setState({isLoading});
        }
    }

    setCategory(id) {
        this.setState({activeCategory: id});
    }

    displayCategories() {
        return _.map(this.props.categories, (category, id) => {
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
        const recipes = this.props.categories[this.state.activeCategory].recipes;
        return _.map(recipes, (value ,id) => {
            const recipe = this.props.recipeMetadata[id];
            return (
                <ListItem
                    key={id}
                    onClick={this.setRecipe}
                    id={id}
                    title={recipe.name}
                />
            );
        });
    }

    displayRecipe() {
        return this.state.recipes[this.state.activeRecipe].ingredients;
    }

    render() {
        if (this.state.isLoading) {
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
                        {this.displayRecipes()}
                    </Drawer>
                    {/* {this.displayRecipe()} */}
                </div>
            );
        }
    }
}

const mapStateToProps = state => {
    return {
        categories: state.recipes.categories,
        recipeMetadata: state.recipes.recipeMetadata,
        isLoading: state.recipes.isLoading
    };
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({fetchCategories, fetchRecipeMetadata}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
