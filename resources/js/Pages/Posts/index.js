import {useEffect, useState} from "react";

function PostsIndex(){

    const [Posts,setPosts] = useState([]);
    const [PostsMeta,setPostsMeta] = useState({});
    const [query,setQuery] = useState( {
            page: 1,
    })
    useEffect(() => {
        fetchPosts();
    },[]);

    const fetchPosts = (page=1) => {
        query.page = page;
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
        console.log('currentPage',currentPage);
        setQuery({
                page: currentPage
        })
        fetchPosts(currentPage);
    }


    const  renderPaginatorLinks = () =>  {
        return PostsMeta?.meta?.links.map((link, index) =>
            <button key={index} onClick={() => pageChanged(link.url)}
                    dangerouslySetInnerHTML={{__html: link.label}}
                    className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-700 bg-white border border-gray-300 leading-5 hover:text-gray-500 focus:z-10 focus:outline-none focus:ring ring-gray-300 focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 first:rounded-l-md last:rounded-r-md"/>
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
                <th>Created At</th>
            </tr>
            </thead>
            <tbody>
            {Posts.map(post => {
               return ( <tr key={post?.id}>
                    <td>{post?.id}</td>
                    <td className={'font-bold'}>{post?.title}</td>
                    <td>{post?.content}</td>
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
