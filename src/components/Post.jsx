import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { DeleteSVG, EditSVG } from "./Icon";
import { EditPost } from "./PostForm";


export function PostList({ posts, onDelete, onUpdate }) {

    const { user, users } = useLoaderData();

    return <ul>
        {posts.map(post =>
            <Post
                user={user}
                users={users}
                key={post.id}
                post={post}
                onDelete={onDelete}
                onUpdate={onUpdate}
            />)}
    </ul>
}

function Post({ user, users, post, onDelete, onUpdate }) {

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



    return <div className="post">
        <div className="post__menu" >
            <h4> {users[post.UserId]} </h4>
            {
                ((post.UserId === user.userId) || (user.adminAcess === true)) &&
                <>
                    <button className="btn" onClick={() => setEdit(true)} disabled={loading} ><EditSVG /></button>
                    <button className="btn" onClick={handleDelete} disabled={loading} ><DeleteSVG /></button>
                </>
            }</div>
        {(edit === false) ?
            <DisplayPost
                user={user}
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

function DisplayPost({ post }) {
    return <>
        {(post.imgUrl !== null) && <img src={post.imgUrl} alt={post.imgUrl} />}
        {(post.text) && <div>{post.text}</div>}
    </>
}
