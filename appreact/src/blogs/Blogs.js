import React, { useState, useEffect } from 'react';
import NewBlogModal from './components/CrearBlogModal';
import EditBlogModal from './components/ActualizarBlogModal';
function Blogs() {
    const [blogs, setBlogs] = useState([]);
    const [isOpenNewBlog, setIsOpenNewBlog] = useState(false);
    const [isOpenEditBlog, setIsOpenEditBlog] = useState(false);
    const [blogToEdit, setBlogToEdit] = useState(null);

    useEffect(() => {
       getBlogs();
    }, []);

    function toggleNewBlog() {
        setIsOpenNewBlog(!isOpenNewBlog);
    }

    function toggleEditBlog() {
        setIsOpenEditBlog(!isOpenEditBlog);
    }

    async function getBlogs() {
       const response = await fetch('http://localhost:8000/blogs');
       if (!response.ok) {
           console.error(`HTTP error! status: ${response.status}`);
           return;
       }
       const data = await response.json();
       setBlogs(data);
    }

    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hour = String(date.getHours()).padStart(2, '0');
        const minute = String(date.getMinutes()).padStart(2, '0');
        const second = String(date.getSeconds()).padStart(2, '0');
      
        return `${year}-${month}-${day}` //${hour}:${minute}:${second}`;
    }

    function EditBlog(blog) {
        setBlogToEdit(blog);
        setIsOpenEditBlog(true);
    }

    function deleteBlog(id) {
        fetch(`http://localhost:8000/blogs/${id}`, {
            method: 'DELETE',
        })
        .then(() => {
            getBlogs();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
       
    }

    

    return (
        <>
            <NewBlogModal toggleModal={toggleNewBlog} isOpen={isOpenNewBlog} getBlogs={getBlogs} />
            {
                blogToEdit && isOpenEditBlog && <EditBlogModal blog={blogToEdit} toggleModal={toggleEditBlog} isOpen={isOpenEditBlog} getBlogs={getBlogs} />
            } 
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4" data-v0-t="card">
                <div className="flex flex-col space-y-1.5 p-6">
                    <h3 className="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">Blogs</h3>
                    <p className="text-sm text-muted-foreground">Administrar blogs</p>
                    <div className="flex gap-2 mt-4">
                    <button onClick={() => getBlogs()} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90">
                        Actualizar
                    </button>
                    <div className="ml-auto grid gap-1.5 sm:grid-flow-col">
                        <button onClick={() => setIsOpenNewBlog(true)} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground w-8 h-8">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4"
                            >
                                <path d="M5 12h14"></path>
                                <path d="M12 5v14"></path>
                            </svg>
                            <span className="sr-only">Add</span>
                        </button>
                    </div>
                    </div>
                </div>
                <div className="p-0">
                    <div className="border-t">
                    <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm">
                        <thead className="[&amp;_tr]:border-b">
                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 w-[100px]">
                                ID
                            </th>
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                                Titulo
                            </th>
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                                contenido
                            </th>
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                                Creado
                            </th>
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                                Actualizado
                            </th>
                            <th className="h-12 px-4 align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 text-right">
                                Actions
                            </th>
                            </tr>
                        </thead>
                        <tbody className="[&amp;_tr:last-child]:border-0">
                            {
                                blogs.map((blog) => 
                                        <tr key={blog.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                            <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 font-medium">{blog.id}</td>
                                            <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">{blog.title}</td>
                                            <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">{blog.content.substring(0,15)}...</td>
                                            <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">{formatDate(new Date(blog.createdAt))}</td>
                                            <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">{formatDate(new Date(blog.updatedAt))}</td>
                                            <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-right">
                                                <button onClick={() => EditBlog(blog)} className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10 rounded-full">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="24"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className="w-4 h-4"
                                                    >
                                                        <path d="M4 13.5V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2h-5.5"></path>
                                                        <polyline points="14 2 14 8 20 8"></polyline>
                                                        <path d="M10.42 12.61a2.1 2.1 0 1 1 2.97 2.97L7.95 21 4 22l.99-3.95 5.43-5.44Z"></path>
                                                    </svg>
                                                    <span className="sr-only">Edit</span>
                                                </button>
                                                <button onClick={() => deleteBlog(blog.id)}  className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10 rounded-full ml-2">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="24"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className="w-4 h-4"
                                                    >
                                                        <path d="M3 6h18"></path>
                                                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                                    </svg>
                                                    <span className="sr-only">Delete</span>
                                                </button>
                                            </td>
                                        </tr>
                                )
                            }
                        </tbody>
                        </table>
                    </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Blogs;
