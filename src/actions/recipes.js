import Firebase from 'firebase';
import 'firebase/firestore';

const config = {
    apiKey: "AIzaSyCeAo6_H2Okfly3CyjMGKEPCk9yImoBDAM",
    authDomain: "recipe-book-ptrckmrgn.firebaseapp.com",
    databaseURL: "https://recipe-book-ptrckmrgn.firebaseio.com",
    projectId: "recipe-book-ptrckmrgn",
    storageBucket: "gs://recipe-book-ptrckmrgn.appspot.com",
};
Firebase.initializeApp(config);
const db = Firebase.firestore();
const settings = {timestampsInSnapshots: true};
db.settings(settings);

export const FETCH_CATEGORIES = 'fetch_categories';
export const FETCH_RECIPE_METADATA = 'fetch_recipe_metadata';

export function fetchCategories() {
    return dispatch => {
        db.collection('categories').orderBy('name').onSnapshot(response => {
            const categories = {};
            response.forEach(category => {
                categories[category.id] = category.data();
            });
            dispatch({
                type: FETCH_CATEGORIES,
                categories
            });
        });
    }
}

export function fetchRecipeMetadata() {
    return dispatch => {
        db.collection('recipes_metadata').orderBy('name').onSnapshot(response => {
            const recipeMetadata = {};
            response.forEach(recipe => {
                recipeMetadata[recipe.id] = recipe.data();
            });
            dispatch({
                type: FETCH_RECIPE_METADATA,
                recipeMetadata
            });
        });
    }
}