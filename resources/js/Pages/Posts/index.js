import {useEffect, useState} from "react";

function PostsIndex(){

    const [Posts,setPosts] = useState([]);
    const [PostsMeta,setPostsMeta] = useState({});
    const [query,setQuery] = useState( {
            page: 1,
    })

    useEffect(() => {
        fetchPosts();
    },[query])

    useEffect(() => {
        fetchPosts();
    },[]);

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

    const pageChanged =  (url) => {
        const fullUrl = new URL(url);
        const currentPage = fullUrl.searchParams.get('page');
        setQuery({
                page: currentPage
        })
        console.log('query',query);
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
        <table className="table-auto">
            <thead className={'table-header'}>
            <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Content</th>
                <th>Category</th>
                <th>Created At</th>
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
