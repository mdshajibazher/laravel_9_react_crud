import {useEffect, useState} from "react";
import axios from "axios";
import CategoriesService from "../../Services/CategoriesService";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

function PostCreate(){
    const [categories,setCategories] =  useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category_id, setCategory_id] = useState('');
    const [errors,setErrors] = useState({});
    const navigate = useNavigate();


    useEffect(() => {
        fetchCategories();
    },[])

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/posts',{title,content,category_id})
            .then(response => {
                setTitle('')
                setContent('')
                setCategory_id('')
                toast('Post created');
               // alert(JSON.stringify(response.data))
                navigate("/");
                console.log(response.data)
            })
            .catch(e => {
                setErrors( e.response.data.errors)
            })
    }
    const handleCategoryChange = (e) => {
        setCategory_id(e.target.value);
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }

    const handleContentChange = (e) => {
        setContent(e.target.value);
    }

    const fetchCategories = () => {
            CategoriesService.getAll()
            .then(response => {
                setCategories(response?.data?.data);
            })
            .catch(e => {
                console.log('error',e);
            })
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title" className={`${errors?.['title'] ? 'text-pink-600' : ''} block font-medium text-sm text-gray-700`}>
                        Title
                    </label>
                    <input value={title} onChange={handleTitleChange} id="title" type="text" className={`${errors?.['title'] ? 'border-pink-600' : ''}  block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`} />

                    <div className="mt-2 text-pink-600 text-sm">
                        {errors?.['title']?.map((message, index) => {
                            return (<div key={index}>{message}</div>);
                        })}
                    </div>
                </div>
                <div className="mt-4">
                    <label htmlFor="content" className={`${errors?.['title'] ? 'text-pink-600' : ''} block font-medium text-sm text-gray-700`}>
                        Content
                    </label>
                    <textarea value={content} onChange={handleContentChange} id="content" type="text" className={`${errors?.['title'] ? 'border-pink-600' : ''} block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`} />

                    <div className="text-red-600 mt-1">
                        {errors?.['content']?.map((message, index) => {
                            return (<div key={index}>{message}</div>);
                        })}
                    </div>
                </div>
                <div className="mt-4">
                    <label htmlFor="category" className={`${errors?.['category_id'] ? 'text-pink-600' : ''} block font-medium text-sm text-gray-700`}>
                        Category
                    </label>
                    <select value={category_id} onChange={handleCategoryChange} id="category" className={`${errors?.['category_id'] ? 'text-pink-600' : ''} block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}>
                        <option value="">-- Select category --</option>
                        {categories.map(category => {
                            return (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            );
                        })}
                    </select>

                    <div className="text-red-600 mt-1">
                        {errors?.['category_id']?.map((message, index) => {
                            return (<div key={index}>{message}</div>);
                        })}
                    </div>
                </div>
                <div className="mt-4">
                    <button type="submit" className="px-3 py-2 bg-blue-600 text-white rounded">
                        Save
                    </button>
                </div>
            </form>
        </>
    );
}
export default PostCreate;
