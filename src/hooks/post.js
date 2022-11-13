import { useReducer } from "react";
import { apiFetch } from "../utils/api";

function reducer(state, action) {
    console.log('POSTS REDUCE', action.type, action)
    switch (action.type) {
        case 'FETCHING_POSTS':
            return { ...state, loading: true };
        case 'SET_POSTS':
            return { ...state, posts: action.payload, loading: false };
        case 'DELETE_POSTS':
            return { ...state, posts: state.posts.filter(p => p !== action.payload) };
        case 'ADD_POSTS':
            return { ...state, posts: [action.payload, ...state.posts] };
        case 'UPDATE_POSTS':
            return { ...state, posts: state.posts.map(p => p.id === action.payload.id ? action.payload : p) };
        default:
            throw new Error('Action inconnue ' + action.type);
    }
}

export function usePost() {
    const [state, dispatch] = useReducer(reducer, {
        posts: null,
        loading: false,
    })

    return {
        posts: state.posts,
        fetchPosts: async function () {
            if (state.loading || state.posts) {
                return;
            }
            dispatch({ type: 'FETCHING_POSTS' });
            const posts = await apiFetch('/post/order/');
            dispatch({ type: 'SET_POSTS', payload: posts });
        },
        deletePost: async function (post) {
            await apiFetch('/post/' + post.id, {
                method: "DELETE"
            });
            dispatch({ type: 'DELETE_POSTS', payload: post })
        },
        createPost: async function (dataForm) {
            let data = true;
            if (dataForm.get("image").name === "") {
                dataForm = JSON.stringify({ text: dataForm.get("text") });
                data = false;
            } else {
                dataForm.append("post", JSON.stringify({ text: dataForm.get('text') }))
                dataForm.delete("text");
            }

            const res = await apiFetch("/post/", {
                method: "POST",
                body: dataForm
            }, data)
            dispatch({ type: "ADD_POSTS", payload: res.post })
        },
        updatePost: async function (post, dataForm) {
            console.log(dataForm.get("image").name);
            console.log(dataForm.get('text'));
            let data = true;
            if (dataForm.get("image").name === "") {
                dataForm = JSON.stringify({ text: dataForm.get("text") });
                data = false;
            } else {
                dataForm.append("post", JSON.stringify({ text: dataForm.get('text') }))
                dataForm.delete("text");
            }

            const res = await apiFetch('/post/' + post.id, {
                method: "PUT",
                body: dataForm
            }, data)

            dispatch({ type: "UPDATE_POSTS", payload: res.post })
        }
    }
}