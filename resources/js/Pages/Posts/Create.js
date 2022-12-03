import {useEffect, useState} from "react";
import axios from "axios";
import CategoriesService from "../../Services/CategoriesService";
import { useNavigate } from "react-router-dom";

function PostCreate(){
    const [categories,setCategories] =  useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category_id, setCategory_id] = useState('');
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
               // alert(JSON.stringify(response.data))
                navigate("/");
                console.log(response.data)
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
                    <label htmlFor="title" className="block font-medium text-sm text-gray-700">
                        Title
                    </label>
                    <input value={title} onChange={handleTitleChange} id="title" type="text" className="block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                </div>
                <div className="mt-4">
                    <label htmlFor="content" className="block font-medium text-sm text-gray-700">
                        Content
                    </label>
                    <textarea value={content} onChange={handleContentChange} id="content" type="text" className="block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                </div>
                <div className="mt-4">
                    <label htmlFor="category" className="block font-medium text-sm text-gray-700">
                        Category
                    </label>
                    <select value={category_id} onChange={handleCategoryChange} id="category" className="block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                        <option value="">-- Select category --</option>
                        {categories.map(category => {
                            return (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            );
                        })}
                    </select>
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
