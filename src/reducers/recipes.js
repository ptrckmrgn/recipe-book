import {
    FETCH_CATEGORIES,
    FETCH_RECIPE_METADATA
} from '../actions/recipes';

// initialState = {
//     categories: null,
//     recipeMetadata: null,
//     loading: {
//         categories: true,
//         recipeMetadata: true
//     }
// };

const initialState = {
    categories: null,
    recipeMetadata: null,
    isLoading: {
        categories: true,
        recipeMetadata: true
    }
}

export default function(state = initialState, action) {
    switch (action.type) {
        case FETCH_CATEGORIES:
            return {
                ...state,
                categories: action.categories,
                isLoading: {
                    ...state.isLoading,
                    categories: false
                }
            }
            // return Object.assign({}, state, {
            //     categories: action.categories,
            //     // loading["categories"]: false
            // });
        case FETCH_RECIPE_METADATA:
            return {
                ...state,
                recipeMetadata: action.recipeMetadata,
                isLoading: {
                    ...state.isLoading,
                    recipeMetadata: false
                }
            }
            // return Object.assign({}, state, {
            //     recipeMetadata: action.recipeMetadata
            // });
        default:
            return state;
    }
}