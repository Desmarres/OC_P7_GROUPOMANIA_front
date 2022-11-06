import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EditPost } from "./PostForm";


export function PostList({ posts, onDelete, onUpdate }) {
    return <ul>
        {posts.map(post =>
            <Post
                key={post.id}
                post={post}
                onDelete={onDelete}
                onUpdate={onUpdate}
            />)}
    </ul>
}

function Post({ post, onDelete, onUpdate }) {
    const navigate = useNavigate();
    const [edit, setEdit] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleDelete = async function (e) {
        e.preventDefault();
        setLoading(true);
        await onDelete(post);
    }
    const handleUpdate = async function (e) {
        const form = e.target;
        e.preventDefault();
        setLoading(true);
        const data = new FormData(form);
        await onUpdate(post, data);
        setLoading(false);
        setEdit(false);
        navigate("/site/");
    }



    return <div>
        <h4> Users {post.UserId} </h4>
        {(edit === false) ?
            <DisplayPost
                post={post}
                handleDelete={handleDelete}
                loading={loading}
                setEdit={setEdit}
            /> :
            <EditPost
                post={post}
                handleUpdate={handleUpdate}
                loading={loading}
            />}
    </div>
}

function DisplayPost({ post, handleDelete, setEdit, loading }) {
    return <>
        {(post.text) && <div>{post.text}</div>}
        {(post.imgUrl !== null) && <img src={post.imgUrl} alt={post.imgUrl} />}
        <button onClick={() => setEdit(true)} disabled={loading} >Editer</button>
        <button onClick={handleDelete} disabled={loading} >Supprimer</button>
    </>
}
