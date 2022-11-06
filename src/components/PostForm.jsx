import React from 'react'

export function CreatedPost({ handleCreated, loading }) {
    return <PostForm handleSubmit={handleCreated} loading={loading} action="Ajouter" />
}

export function EditPost({ post, handleUpdate, loading }) {
    return <PostForm post={post} handleSubmit={handleUpdate} loading={loading} action="Editer" />
}


function PostForm({ post = {}, handleSubmit, loading, action }) {
    return <form onSubmit={handleSubmit} >
        <div>
            <label htmlFor="text">Texte</label>
            <input type="text" name="text" id="text" defaultValue={post.text} />
        </div>
        <div>
            <label htmlFor="image">Image</label>
            {(post.imgUrl !== null) && <img src={post.imgUrl} alt={post.imgUrl} />}
            <input type="file" accept="image/*" name="image" id="image" />
        </div>
        <button disabled={loading} type="submit" > {action} </button>
    </form>
}