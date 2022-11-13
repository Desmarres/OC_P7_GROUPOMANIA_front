import React, { useEffect, useState } from "react";
import { Loader } from "../components/Loader";
import { usePost } from "../hooks/post";
import { PostList } from "../components/Post";
import { CreatedPost } from "../components/PostForm";
import { useNavigate } from "react-router-dom";
import { ReplySVG } from "../components/Icon";

export function Site() {

    const {
        posts,
        fetchPosts,
        deletePost,
        updatePost,
        createPost,
    } = usePost();

    useEffect(function () {
        //window.setInterval(() => { fetchPosts() }, 10000)
        fetchPosts();
    }, [fetchPosts])

    const navigate = useNavigate();
    const [newPost, setNewPost] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleCreated = async function (e) {
        const form = e.target;
        e.preventDefault();
        setLoading(true);
        const data = new FormData(form);
        await createPost(data);
        setLoading(false);
        setNewPost(false);
        navigate("/site/");
    }
    return <>
        {newPost === false ? <button className="btn" onClick={() => setNewPost(true)} ><ReplySVG /> Nouveau message </button> : <CreatedPost handleCreated={handleCreated} loading={loading} />}
        {posts === null ?
            <Loader /> :
            <PostList
                posts={posts}
                onDelete={deletePost}
                onUpdate={updatePost}
            />}
    </>
}

