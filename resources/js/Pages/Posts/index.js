import {useEffect, useState} from "react";

function PostsIndex(){

    const [Posts,setPosts] = useState([]);
    const [Categories,setCategories] = useState([]);
    const [PostsMeta,setPostsMeta] = useState({});
    const [query,setQuery] = useState( {
            page: 1,
            category_id: '',
            order_by: 'id',
            order_by_dir: 'asc'
    })

    useEffect(() => {
        fetchPosts();
    },[query])

    useEffect(() => {
        fetchPosts();
        fetchCategories();
    },[]);

    const updateOrder = (columnName) => {
        setQuery((prevQuery) => {
            return{
                ...prevQuery,
                page: 1,
                order_by: columnName,
                order_by_dir: prevQuery.order_by_dir === 'asc' ? 'desc' : 'asc'
            }
        })
    }
    const fetchPosts = (page=1) => {
        axios.get('/api/posts',{params: query})
            .then(res => {
                setPosts(res.data.data);
                setPostsMeta({links: res?.data?.links, meta: res?.data?.meta});
            })
            .catch(e => {
                console.log(e)
            })
    }

    const fetchCategories = (page=1) => {
        axios.get('/api/categories',{params: query})
            .then(res => {
                setCategories(res.data.data);
            })
            .catch(e => {
                console.log(e)
            })
    }
    const handleCategoryChanged = (event) => {
        setQuery((prevQuery) => {
            return{
                ...prevQuery,
                page: 1,
                category_id: event.target.value,
            }
        })
        console.log( event.target.value)
    }

    const pageChanged =  (url) => {
        const fullUrl = new URL(url);
        const currentPage = fullUrl.searchParams.get('page');
        setQuery({
                page: currentPage
        })
        console.log('query',query);
    }

    const orderColumnIcon = (columnName) => {
        let icon = 'fa-sort';
        if(query?.order_by == columnName){
            if(query?.order_by_dir == 'asc'){
                icon = 'fa-sort-up'
            }else{
                icon = 'fa-sort-down'
            }
        }
        return ( <i className={`fa-solid  ${icon}`}></i>);
    }

    const  renderPaginatorLinks = () =>  {
        return PostsMeta?.meta?.links.map((link, index) =>
             <button key={index} onClick={() => pageChanged(link.url)}
                    dangerouslySetInnerHTML={{__html: link.label}}
                    className={`${(link.active) && ' border-indigo-500 bg-indigo-50 text-indigo-500'} relative z-10 inline-flex items-center border px-4 py-2 text-sm font-medium text-black-600 focus:z-20`}/>
        );
    }

    const renderPaginator = () => {
        return (
            <nav role="navigation" aria-label="Pagination Navigation" className="flex items-center justify-between">
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-gray-700 leading-5">
                            Showing
                            <span>
                                <span className="font-medium"> {PostsMeta?.meta?.from} </span>
                                to
                                <span className="font-medium"> {PostsMeta?.meta?.to} </span>
                            </span>
                            of
                            <span className="font-medium"> {PostsMeta?.meta?.total} </span>
                            results
                        </p>
                    </div>

                    <div>
                        <span className="relative z-0 inline-flex shadow-sm rounded-md">
                            {renderPaginatorLinks()}
                        </span>
                    </div>
                </div>
            </nav>
        );
    }

    return (
        <>
            <div className="grid grid-cols-4 gap-4">
            <div className="mb-4">
                <label htmlFor="categories" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select
                    an category</label>
                <select onChange={handleCategoryChanged} name="category_id" id="categories"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="">-- all categories --</option>
                    {Categories.map(category => {
                        return (
                            <option key={category?.id} value={category?.id}>{category.name}</option>
                        )
                    })}
                </select>
            </div>
            </div>
        <table className="table-auto">
            <thead className={'table-header'}>
            <tr>
                <th className={'table-cell'}>ID <button onClick={() => updateOrder('id')} type="button" className="column-sort ml-2 ">
                    {orderColumnIcon('id')}
                    </button>
                </th>
                <th className={'table-cell'}>Title <button onClick={() => updateOrder('title')} type="button" className="column-sort ml-2">
                    {orderColumnIcon('title')}
                </button></th>
                <th className={'table-cell'}>Content <button onClick={() =>  updateOrder('content')} type="button" className="column-sort ml-2">
                    {orderColumnIcon('content')}
                </button></th>
                <th className={'table-cell'}>Category <button onClick={() =>  updateOrder('category_id')} type="button" className="column-sort ml-2">
                    {orderColumnIcon('category_id')}

                </button></th>
                <th className={'table-cell'}>Created At <button onClick={() =>  updateOrder('created_at')} type="button" className="column-sort ml-2">
                    {orderColumnIcon('created_at')}
                </button></th>
            </tr>
            </thead>
            <tbody>
            {Posts.map(post => {
               return ( <tr key={post?.id}>
                    <td>{post?.id}</td>
                    <td className={'font-bold'}>{post?.title}</td>
                    <td>{post?.content}</td>
                    <td><span  className="inline-block py-1 px-2 leading-none text-center whitespace-nowrap align-baseline  bg-blue-600 text-white rounded">{post?.category?.name}</span></td>
                    <td>{post?.created_at}</td>
                </tr>)
            })}

            </tbody>
        </table>
            {renderPaginator()}
            </>
    );
}
export default PostsIndex;
