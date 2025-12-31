'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Calendar, Plus, Edit, Trash2, Save, X, RefreshCw, Sparkles,
    BarChart3, Zap, Image as ImageIcon, Tag, Eye, EyeOff,
    FileText, Clock, Star, Layers
} from 'lucide-react';
import { toast } from 'sonner';
import { uploadToCloudinary, deleteFromCloudinary } from '@/lib/cloudinary';
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";

interface Blog {
    _id?: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    featuredImage: string;
    featuredImagePublicId?: string;
    category: string;
    tags: string[];
    author: {
        name: string;
        avatar?: string;
    };
    readTime: number;
    publishDate: string;
    isPublished: boolean;
    isFeatured: boolean;
    metaTitle?: string;
    metaDescription?: string;
}

const CATEGORIES = [
    'Technology',
    'Development',
    'Resources',
    'Marketing',
    'AI & Machine Learning',
    'Other'
];

export default function BlogAdminDashboard() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [currentBlog, setCurrentBlog] = useState<Partial<Blog>>({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        featuredImage: '',
        category: 'Development',
        tags: [],
        author: { name: 'Admin' },
        readTime: 5,
        publishDate: new Date().toISOString().split('T')[0],
        isPublished: false,
        isFeatured: false,
    });
    const [tagInput, setTagInput] = useState('');
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [filterPublished, setFilterPublished] = useState<'all' | 'published' | 'draft'>('all');

    useEffect(() => {
        fetchBlogs();
    }, [filterPublished]);

    const fetchBlogs = async () => {
        setLoading(true);
        try {
            const queryParam = filterPublished === 'all' ? '' : `?published=${filterPublished === 'published'}`;
            const res = await fetch(`/api/admin/blogs${queryParam}`);
            const data = await res.json();
            if (data.success) {
                setBlogs(data.data);
            }
        } catch (error) {
            toast.error('Failed to load blogs');
        } finally {
            setLoading(false);
        }
    };

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            if (currentBlog.featuredImagePublicId) {
                await deleteFromCloudinary(currentBlog.featuredImagePublicId);
            }

            const { url, publicId } = await uploadToCloudinary(file);

            setCurrentBlog({
                ...currentBlog,
                featuredImage: url,
                featuredImagePublicId: publicId,
            });
            toast.success('Image uploaded! 📸');
        } catch (error) {
            console.error('Upload error:', error);
            toast.error('Image upload failed');
        } finally {
            setUploading(false);
        }
    };

    const handleSave = async () => {
        if (!currentBlog.title || !currentBlog.excerpt || !currentBlog.content || !currentBlog.featuredImage) {
            toast.error('Please fill all required fields');
            return;
        }

        try {
            const isEdit = !!currentBlog._id;
            const url = isEdit ? `/api/admin/blogs/${currentBlog._id}` : '/api/admin/blogs';
            const method = isEdit ? 'PUT' : 'POST';

            // Auto-generate slug if not provided
            if (!currentBlog.slug && currentBlog.title) {
                currentBlog.slug = generateSlug(currentBlog.title);
            }

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(currentBlog),
            });

            const data = await res.json();

            if (data.success) {
                toast.success(isEdit ? 'Blog updated! ✅' : 'Blog created! 🎉');
                setEditDialogOpen(false);
                fetchBlogs();
            } else {
                toast.error(data.error || 'Failed to save');
            }
        } catch (error) {
            toast.error('Failed to save blog');
        }
    };

    const handleDelete = async (id: string) => {
        setDeleteId(id);
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = async () => {
        if (!deleteId) return;

        try {
            const res = await fetch(`/api/admin/blogs/${deleteId}`, {
                method: 'DELETE',
            });

            const data = await res.json();

            if (data.success) {
                toast.success('Blog deleted! 🗑️');
                fetchBlogs();
            }
        } catch (error) {
            toast.error('Failed to delete blog');
        } finally {
            setDeleteId(null);
            setIsDeleteDialogOpen(false);
        }
    };

    const addTag = () => {
        if (!tagInput.trim()) return;
        setCurrentBlog({
            ...currentBlog,
            tags: [...(currentBlog.tags || []), tagInput.trim()],
        });
        setTagInput('');
    };

    const removeTag = (tag: string) => {
        setCurrentBlog({
            ...currentBlog,
            tags: (currentBlog.tags || []).filter((t) => t !== tag),
        });
    };

    

    const filteredBlogs = blogs;

    return (
        <div className="min-h-screen bg-[#B7AEA3]">
            {/* Header */}
            <header className="bg-[#1A1A1A] shadow-2xl border-b-2 sm:border-b-4 border-[#000000] sticky top-0 z-10">
                <div className="px-4 sm:px-6 py-4 sm:py-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="w-full sm:w-auto"
                        >
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#FFFFFF] flex items-center gap-2 sm:gap-3">
                                Blog Management
                                <Sparkles className="text-[#B7AEA3]" size={24} />
                            </h1>
                            <p className="text-[#FFFFFF]/70 font-semibold mt-1 text-sm sm:text-base">
                                Create and manage your blog posts
                            </p>
                        </motion.div>
                        <motion.button
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            onClick={fetchBlogs}
                            disabled={loading}
                            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#FFFFFF] hover:bg-[#D9D2C9] text-[#000000] px-4 sm:px-6 py-2 sm:py-3 font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 rounded-xl sm:rounded-2xl text-sm sm:text-base"
                        >
                            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
                            Refresh
                        </motion.button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="p-3 sm:p-4 lg:p-6">
                {/* Filter Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-4 sm:mb-6 flex gap-2 sm:gap-3"
                >
                    {['all', 'published', 'draft'].map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setFilterPublished(filter as any)}
                            className={`px-4 sm:px-6 py-2 sm:py-3 font-bold transition-all duration-300 rounded-xl sm:rounded-2xl text-xs sm:text-sm capitalize ${filterPublished === filter
                                ? 'bg-[#000000] text-[#FFFFFF] scale-105'
                                : 'bg-[#FFFFFF] text-[#000000] hover:bg-[#D9D2C9]'
                                }`}
                        >
                            {filter}
                        </button>
                    ))}
                </motion.div>

                {/* Content Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-[#FFFFFF] shadow-2xl p-4 sm:p-6 lg:p-8 border-2 sm:border-4 border-[#000000] rounded-xl sm:rounded-2xl"
                >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
                        <div className="flex items-center gap-2 sm:gap-3">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#000000] flex items-center justify-center">
                                <BarChart3 className="text-[#FFFFFF]" size={20} />
                            </div>
                            <div>
                                <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#000000]">
                                    Blog Posts
                                </h2>
                                <p className="text-[#000000]/60 font-semibold text-xs sm:text-sm">
                                    Manage your content
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
                            <div className="inline-flex items-center gap-1 sm:gap-2 bg-[#D9D2C9] px-3 sm:px-4 py-2 rounded-xl sm:rounded-2xl">
                                <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-[#000000]" />
                                <span className="text-[#000000] font-bold text-xs sm:text-sm">
                                    {blogs.length} Posts
                                </span>
                            </div>
                            <button
                                onClick={() => {
                                    setCurrentBlog({
                                        title: '',
                                        slug: '',
                                        excerpt: '',
                                        content: '',
                                        featuredImage: '',
                                        category: 'Development',
                                        tags: [],
                                        author: { name: 'Admin' },
                                        readTime: 5,
                                        publishDate: new Date().toISOString().split('T')[0],
                                        isPublished: false,
                                        isFeatured: false,
                                    });
                                    setEditDialogOpen(true);
                                }}
                                className="flex items-center gap-1 sm:gap-2 bg-[#000000] hover:bg-[#1A1A1A] text-[#FFFFFF] px-4 sm:px-6 py-2 sm:py-3 font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 rounded-xl sm:rounded-2xl text-xs sm:text-sm"
                            >
                                <Plus size={16} />
                                Add Blog
                            </button>
                        </div>
                    </div>

                    {/* Blogs List */}
                    {loading ? (
                        <div className="text-center py-8 sm:py-12">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-4 border-[#000000] border-t-transparent"></div>
                            <p className="mt-4 text-[#000000] font-bold text-sm sm:text-base">Loading...</p>
                        </div>
                    ) : filteredBlogs.length === 0 ? (
                        <div className="text-center py-8 sm:py-12">
                            <FileText className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 text-[#000000]/30" />
                            <p className="text-lg sm:text-xl font-black text-[#000000]">No blogs found</p>
                            <p className="text-[#000000]/60 text-sm sm:text-base">Click "Add Blog" to create one</p>
                        </div>
                    ) : (
                        <div className="grid gap-4 sm:gap-6">
                            {filteredBlogs.map((blog, index) => (
                                <motion.div
                                    key={blog._id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: 0.1 * index }}
                                    className="bg-[#D9D2C9] hover:bg-[#B7AEA3] transition-colors duration-200 border-2 border-[#000000]/10 rounded-xl sm:rounded-2xl overflow-hidden"
                                >
                                    <div className="grid sm:grid-cols-[200px_1fr_auto] gap-4 p-4 sm:p-6">
                                        {/* Featured Image */}
                                        <div className="aspect-video sm:aspect-square w-full sm:w-50 rounded-lg overflow-hidden">
                                            <img
                                                src={blog.featuredImage}
                                                alt={blog.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-wrap items-center gap-2 mb-2">
                                                <span className="px-2 py-1 bg-[#000000] text-[#FFFFFF] text-xs font-bold rounded">
                                                    {blog.category}
                                                </span>
                                                {blog.isFeatured && (
                                                    <span className="px-2 py-1 bg-yellow-500 text-[#000000] text-xs font-bold rounded flex items-center gap-1">
                                                        <Star size={12} />
                                                        Featured
                                                    </span>
                                                )}
                                                <span className={`px-2 py-1 text-xs font-bold rounded flex items-center gap-1 ${blog.isPublished
                                                    ? 'bg-green-500 text-white'
                                                    : 'bg-gray-400 text-white'
                                                    }`}>
                                                    {blog.isPublished ? <Eye size={12} /> : <EyeOff size={12} />}
                                                    {blog.isPublished ? 'Published' : 'Draft'}
                                                </span>
                                            </div>

                                            <h3 className="text-lg sm:text-xl font-black text-[#000000] mb-2 line-clamp-2">
                                                {blog.title}
                                            </h3>

                                            <p className="text-[#000000]/70 text-sm mb-3 line-clamp-2">
                                                {blog.excerpt}
                                            </p>

                                            <div className="flex flex-wrap gap-2 mb-3">
                                                {blog.tags.slice(0, 3).map((tag, i) => (
                                                    <span key={i} className="px-2 py-1 bg-[#FFFFFF] text-[#000000] text-xs rounded flex items-center gap-1">
                                                        <Tag size={10} />
                                                        {tag}
                                                    </span>
                                                ))}
                                                {blog.tags.length > 3 && (
                                                    <span className="px-2 py-1 bg-[#FFFFFF] text-[#000000] text-xs rounded">
                                                        +{blog.tags.length - 3} more
                                                    </span>
                                                )}
                                            </div>

                                            <div className="flex items-center gap-4 text-xs text-[#000000]/60">
                                                <span className="flex items-center gap-1">
                                                    <Calendar size={12} />
                                                    {new Date(blog.publishDate).toLocaleDateString()}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Clock size={12} />
                                                    {blog.readTime} min read
                                                </span>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex sm:flex-col gap-2">
                                            <button
                                                onClick={() => {
                                                    setCurrentBlog(blog);
                                                    setEditDialogOpen(true);
                                                }}
                                                className="flex-1 sm:flex-initial p-3 bg-[#000000] hover:bg-[#1A1A1A] text-[#FFFFFF] transition-all flex items-center justify-center rounded-lg"
                                            >
                                                <Edit size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(blog._id!)}
                                                className="flex-1 sm:flex-initial p-3 bg-[#000000] hover:bg-red-600 text-[#FFFFFF] transition-all flex items-center justify-center rounded-lg"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </motion.div>
            </main>

            {/* Edit Dialog */}
            {editDialogOpen && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-[#FFFFFF] border-2 sm:border-4 border-[#000000] w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl sm:rounded-2xl my-4"
                    >
                        <div className="p-4 sm:p-6 border-b-2 sm:border-b-4 border-[#000000] flex items-center justify-between bg-[#1A1A1A] sticky top-0 z-10">
                            <h2 className="text-xl sm:text-2xl font-black text-[#FFFFFF]">
                                {currentBlog._id ? 'Edit Blog' : 'Create New Blog'}
                            </h2>
                            <button
                                onClick={() => setEditDialogOpen(false)}
                                className="p-2 hover:bg-[#FFFFFF]/10 transition-colors rounded-lg"
                            >
                                <X size={20} className="text-[#FFFFFF]" />
                            </button>
                        </div>

                        <div className="p-4 sm:p-6 space-y-4">
                            {/* Title */}
                            <div>
                                <label className="block text-sm font-bold mb-2 text-[#000000]">
                                    Title <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={currentBlog.title}
                                    onChange={(e) => {
                                        const title = e.target.value;
                                        setCurrentBlog({
                                            ...currentBlog,
                                            title,
                                            slug: generateSlug(title)
                                        });
                                    }}
                                    required
                                    className="w-full px-4 py-3 text-sm sm:text-base border-2 border-[#000000]/20 focus:border-[#000000] outline-none rounded-md"
                                    placeholder="Enter blog title"
                                />
                            </div>

                            {/* Slug */}
                            <div>
                                <label className="block text-sm font-bold mb-2 text-[#000000]">
                                    Slug <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={currentBlog.slug}
                                    onChange={(e) => setCurrentBlog({ ...currentBlog, slug: e.target.value })}
                                    className="w-full px-4 py-3 text-sm sm:text-base border-2 border-[#000000]/20 focus:border-[#000000] outline-none rounded-md"
                                    placeholder="blog-url-slug"
                                    required
                                />
                            </div>

                            {/* Featured Image */}
                            <div>
                                <label className="block text-sm font-bold mb-2 text-[#000000]">
                                    Featured Image <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    disabled={uploading}
                                    className="w-full px-4 py-3 text-sm sm:text-base border-2 border-[#000000]/20 bg-white outline-none cursor-pointer rounded-md disabled:opacity-50"
                                />
                                {uploading && (
                                    <p className="text-sm text-[#000000]/60 mt-2">Uploading...</p>
                                )}
                                {currentBlog.featuredImage && (
                                    <div className="mt-3 relative inline-block">
                                        <img
                                            src={currentBlog.featuredImage}
                                            alt="Featured"
                                            className="w-full max-w-md h-48 object-cover rounded-lg border-2 border-[#000000]"
                                        />
                                        <button
                                            type="button"
                                            onClick={async () => {
                                                if (currentBlog.featuredImagePublicId) {
                                                    await deleteFromCloudinary(currentBlog.featuredImagePublicId);
                                                }
                                                setCurrentBlog({ ...currentBlog, featuredImage: '', featuredImagePublicId: '' });
                                            }}
                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600"
                                        >
                                            ×
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Category & Read Time */}
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold mb-2 text-[#000000]">
                                        Category <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={currentBlog.category}
                                        onChange={(e) => setCurrentBlog({ ...currentBlog, category: e.target.value })}
                                        className="w-full px-4 py-3 text-sm sm:text-base border-2 border-[#000000]/20 focus:border-[#000000] outline-none rounded-md"
                                    >
                                        {CATEGORIES.map((cat) => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-2 text-[#000000]">
                                        Read Time (minutes) <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={currentBlog.readTime}
                                        onChange={(e) => setCurrentBlog({ ...currentBlog, readTime: parseInt(e.target.value) || 5 })}
                                        className="w-full px-4 py-3 text-sm sm:text-base border-2 border-[#000000]/20 focus:border-[#000000] outline-none rounded-md"
                                    />
                                </div>
                            </div>

                            {/* Excerpt */}
                            <div>
                                <label className="block text-sm font-bold mb-2 text-[#000000]">
                                    Excerpt <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    value={currentBlog.excerpt}
                                    onChange={(e) => setCurrentBlog({ ...currentBlog, excerpt: e.target.value })}
                                    rows={3}
                                    maxLength={500}
                                    className="w-full px-4 py-3 text-sm sm:text-base border-2 border-[#000000]/20 focus:border-[#000000] outline-none rounded-md"
                                    placeholder="Brief description (max 500 characters)"
                                />
                                <p className="text-xs text-[#000000]/60 mt-1">
                                    {currentBlog.excerpt?.length || 0}/500
                                </p>
                            </div>

                            {/* Content */}
                            <div>
                                <label className="block text-sm font-bold mb-2 text-[#000000]">
                                    Content <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    value={currentBlog.content}
                                    onChange={(e) => setCurrentBlog({ ...currentBlog, content: e.target.value })}
                                    rows={10}
                                    className="w-full px-4 py-3 text-sm sm:text-base border-2 border-[#000000]/20 focus:border-[#000000] outline-none rounded-md font-mono"
                                    placeholder="Write your blog content here (supports markdown)"
                                />
                            </div>

                            {/* Tags */}
                            <div>
                                <label className="block text-sm font-bold mb-2 text-[#000000]">Tags</label>
                                <div className="flex gap-2 mb-2">
                                    <input
                                        type="text"
                                        value={tagInput}
                                        onChange={(e) => setTagInput(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                                        className="flex-1 px-4 py-2 text-sm border-2 border-[#000000]/20 focus:border-[#000000] outline-none rounded-md"
                                        placeholder="Add tag and press Enter"
                                    />
                                    <button
                                        type="button"
                                        onClick={addTag}
                                        className="px-4 py-2 bg-[#000000] text-[#FFFFFF] font-bold hover:bg-[#1A1A1A] rounded-md"
                                    >
                                        <Plus size={18} />
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {(currentBlog.tags || []).map((tag, i) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1 bg-[#D9D2C9] text-[#000000] text-sm flex items-center gap-2 rounded-md"
                                        >
                                            {tag}
                                            <X
                                                size={14}
                                                className="cursor-pointer hover:text-red-600"
                                                onClick={() => removeTag(tag)}
                                            />
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Publish Date & Author */}
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold mb-2 text-[#000000]">
                                        Publish Date
                                    </label>
                                    <input
                                        type="date"
                                        value={currentBlog.publishDate?.split('T')[0]}
                                        onChange={(e) => setCurrentBlog({ ...currentBlog, publishDate: e.target.value })}
                                        className="w-full px-4 py-3 text-sm sm:text-base border-2 border-[#000000]/20 focus:border-[#000000] outline-none rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-2 text-[#000000]">
                                        Author Name
                                    </label>
                                    <input
                                        type="text"
                                        value={currentBlog.author?.name || ''}
                                        onChange={(e) => setCurrentBlog({ ...currentBlog, author: { ...currentBlog.author, name: e.target.value } })}
                                        className="w-full px-4 py-3 text-sm sm:text-base border-2 border-[#000000]/20 focus:border-[#000000] outline-none rounded-md"
                                        placeholder="Author name"
                                    />
                                </div>
                            </div>
                            {/* SEO Meta */}
                            <div className="border-t-2 border-[#000000]/10 pt-4">
                                <h3 className="text-lg font-black text-[#000000] mb-4">SEO Meta Tags</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-bold mb-2 text-[#000000]">
                                            Meta Title
                                        </label>
                                        <input
                                            type="text"
                                            value={currentBlog.metaTitle || ''}
                                            onChange={(e) => setCurrentBlog({ ...currentBlog, metaTitle: e.target.value })}
                                            maxLength={60}
                                            className="w-full px-4 py-3 text-sm sm:text-base border-2 border-[#000000]/20 focus:border-[#000000] outline-none rounded-md"
                                            placeholder="SEO title (max 60 characters)"
                                        />
                                        <p className="text-xs text-[#000000]/60 mt-1">
                                            {currentBlog.metaTitle?.length || 0}/60
                                        </p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold mb-2 text-[#000000]">
                                            Meta Description
                                        </label>
                                        <textarea
                                            value={currentBlog.metaDescription || ''}
                                            onChange={(e) => setCurrentBlog({ ...currentBlog, metaDescription: e.target.value })}
                                            maxLength={160}
                                            rows={3}
                                            className="w-full px-4 py-3 text-sm sm:text-base border-2 border-[#000000]/20 focus:border-[#000000] outline-none rounded-md"
                                            placeholder="SEO description (max 160 characters)"
                                        />
                                        <p className="text-xs text-[#000000]/60 mt-1">
                                            {currentBlog.metaDescription?.length || 0}/160
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Status Toggles */}
                            <div className="border-t-2 border-[#000000]/10 pt-4 space-y-3">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={currentBlog.isPublished || false}
                                        onChange={(e) => setCurrentBlog({ ...currentBlog, isPublished: e.target.checked })}
                                        className="w-5 h-5"
                                    />
                                    <span className="text-[#000000] font-bold flex items-center gap-2">
                                        {currentBlog.isPublished ? <Eye size={18} /> : <EyeOff size={18} />}
                                        Publish Blog
                                    </span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={currentBlog.isFeatured || false}
                                        onChange={(e) => setCurrentBlog({ ...currentBlog, isFeatured: e.target.checked })}
                                        className="w-5 h-5"
                                    />
                                    <span className="text-[#000000] font-bold flex items-center gap-2">
                                        <Star size={18} />
                                        Mark as Featured
                                    </span>
                                </label>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t-2 border-[#000000]">
                                <button
                                    onClick={() => setEditDialogOpen(false)}
                                    className="w-full sm:flex-1 px-6 py-3 bg-[#D9D2C9] hover:bg-[#B7AEA3] text-[#000000] font-bold transition-all rounded-xl"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="w-full sm:flex-1 px-6 py-3 bg-[#000000] hover:bg-[#1A1A1A] text-[#FFFFFF] font-bold transition-all flex items-center justify-center gap-2 rounded-xl"
                                >
                                    <Save size={18} />
                                    {currentBlog._id ? 'Update Blog' : 'Create Blog'}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent className="bg-[#FFFFFF] border-4 border-[#000000] w-[90vw] max-w-md rounded-2xl">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-[#000000] font-black text-xl">
                            Confirm Deletion
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-[#000000]/70">
                            Are you sure you want to delete this blog? This action cannot be undone and will also delete the featured image from Cloudinary.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="flex-col sm:flex-row gap-2">
                        <AlertDialogCancel className="w-full sm:w-auto bg-[#D9D2C9] text-[#000000] hover:bg-[#B7AEA3] px-4 py-2 rounded-md m-0 mr-2">
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            className="w-full sm:w-auto bg-red-600 text-[#FFFFFF] hover:bg-red-700 px-4 py-2 rounded-md m-0"
                            onClick={confirmDelete}
                        >
                            Delete Blog
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
};