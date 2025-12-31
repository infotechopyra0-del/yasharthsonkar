'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { uploadToCloudinary, deleteFromCloudinary } from '@/lib/cloudinary';
import {
    Plus, Edit, Trash2, Save, X, RefreshCw, Sparkles,
    BarChart3, Zap, Image as ImageIcon, Star, Eye, EyeOff,
    ExternalLink, Github, Globe, Calendar, Layers
} from 'lucide-react';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";

interface Project {
    _id?: string;
    title: string;
    slug: string;
    description: string;
    projectImage: string;
    projectImagePublicId?: string;
    techStack: string;
    featured?: boolean;
    published?: boolean;
}

const CATEGORIES = [
    'Web Development',
    'Mobile App',
    'E-commerce',
    'SaaS',
    'Portfolio',
    'Dashboard',
    'AI/ML',
    'Blockchain',
    'Other'
];

export default function ProjectAdminDashboard() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [currentProject, setCurrentProject] = useState<Partial<Project>>({
        title: '',
        slug: '',
        description: '',
        projectImage: '',
        techStack: '',
        featured: false,
        published: false,
    });
    const [highlightInput, setHighlightInput] = useState('');
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [filterPublished, setFilterPublished] = useState<'all' | 'published' | 'draft'>('all');

    useEffect(() => {
        fetchProjects();
    }, [filterPublished]);

    const fetchProjects = async () => {
        setLoading(true);
        try {
            const queryParam = filterPublished === 'all' ? '' : `?published=${filterPublished === 'published'}`;
            const res = await fetch(`/api/admin/projects${queryParam}`);
            const data = await res.json();
            if (data.success) {
                setProjects(data.data);
            }
        } catch (error) {
            toast.error('Failed to load projects');
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
            if (currentProject.projectImagePublicId) {
                await deleteFromCloudinary(currentProject.projectImagePublicId as string);
            }

            const { url, publicId } = await uploadToCloudinary(file);

            setCurrentProject({
                ...currentProject,
                projectImage: url,
                projectImagePublicId: publicId,
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
        if (!currentProject.title || !currentProject.description || !currentProject.projectImage || !currentProject.techStack) {
            toast.error('Please fill all required fields');
            return;
        }

        try {
            const isEdit = !!currentProject._id;
            const url = isEdit ? `/api/admin/projects/${currentProject._id}` : '/api/admin/projects';
            const method = isEdit ? 'PUT' : 'POST';

            // Auto-generate slug if not provided
            if (!currentProject.slug && currentProject.title) {
                currentProject.slug = generateSlug(currentProject.title);
            }

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(currentProject),
            });

            const data = await res.json();

            if (data.success) {
                toast.success(isEdit ? 'Project updated! ✅' : 'Project created! 🎉');
                setEditDialogOpen(false);
                fetchProjects();
            } else {
                toast.error(data.error || 'Failed to save');
            }
        } catch (error) {
            toast.error('Failed to save project');
        }
    };

    const handleDelete = async (id: string) => {
        setDeleteId(id);
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = async () => {
        if (!deleteId) return;

        try {
            const res = await fetch(`/api/admin/projects/${deleteId}`, {
                method: 'DELETE',
            });

            const data = await res.json();

            if (data.success) {
                toast.success('Project deleted! 🗑️');
                fetchProjects();
            }
        } catch (error) {
            toast.error('Failed to delete project');
        } finally {
            setDeleteId(null);
            setIsDeleteDialogOpen(false);
        }
    }

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
                                Projects Page
                                <Sparkles className="text-[#B7AEA3]" size={24} />
                            </h1>
                            <p className="text-[#FFFFFF]/70 font-semibold mt-1 text-sm sm:text-base">
                                Manage your portfolio projects
                            </p>
                        </motion.div>
                        <motion.button
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            onClick={fetchProjects}
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
                                <Layers className="text-[#FFFFFF]" size={20} />
                            </div>
                            <div>
                                <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#000000]">
                                    Projects
                                </h2>
                                <p className="text-[#000000]/60 font-semibold text-xs sm:text-sm">
                                    Manage your portfolio
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
                            <div className="inline-flex items-center gap-1 sm:gap-2 bg-[#D9D2C9] px-3 sm:px-4 py-2 rounded-xl sm:rounded-2xl">
                                <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-[#000000]" />
                                <span className="text-[#000000] font-bold text-xs sm:text-sm">
                                    {projects.length} Projects
                                </span>
                            </div>
                            <button
                                onClick={() => {
                                    setCurrentProject({
                                        title: '',
                                        slug: '',
                                        description: '',
                                        projectImage: '',
                                        techStack: '',
                                        featured: false,
                                        published: false,
                                    });
                                    setEditDialogOpen(true);
                                }}
                                className="flex items-center gap-1 sm:gap-2 bg-[#000000] hover:bg-[#1A1A1A] text-[#FFFFFF] px-4 sm:px-6 py-2 sm:py-3 font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 rounded-xl sm:rounded-2xl text-xs sm:text-sm"
                            >
                                <Plus size={16} />
                                Add Project
                            </button>
                        </div>
                    </div>

                    {/* Projects List */}
                    {loading ? (
                        <div className="text-center py-8 sm:py-12">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-4 border-[#000000] border-t-transparent"></div>
                            <p className="mt-4 text-[#000000] font-bold text-sm sm:text-base">Loading...</p>
                        </div>
                    ) : projects.length === 0 ? (
                        <div className="text-center py-8 sm:py-12">
                            <Layers className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 text-[#000000]/30" />
                            <p className="text-lg sm:text-xl font-black text-[#000000]">No projects found</p>
                            <p className="text-[#000000]/60 text-sm sm:text-base">Click "Add Project" to create one</p>
                        </div>
                    ) : (
                        <div className="grid gap-4 sm:gap-6">
                            {projects.map((project, index) => (
                                <motion.div
                                    key={project._id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: 0.1 * index }}
                                    className="bg-[#D9D2C9] hover:bg-[#B7AEA3] transition-colors duration-200 border-2 border-[#000000]/10 rounded-xl sm:rounded-2xl overflow-hidden"
                                >
                                    <div className="grid sm:grid-cols-[200px_1fr_auto] gap-4 p-4 sm:p-6">
                                        {/* Project Image */}
                                        <div className="aspect-video sm:aspect-square w-full sm:w-50 rounded-lg overflow-hidden">
                                            <img
                                                src={project.projectImage}
                                                alt={project.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-lg sm:text-xl font-black text-[#000000] mb-2 line-clamp-2">
                                                {project.title}
                                            </h3>

                                            <p className="text-[#000000]/70 text-sm mb-3 line-clamp-2">
                                                {project.description}
                                            </p>

                                            <div className="flex flex-wrap gap-1 mb-2">
                                                {project.techStack.split(',').slice(0, 3).map((tech, i) => (
                                                    <span key={i} className="px-2 py-1 bg-[#FFFFFF] text-[#000000] text-xs rounded">
                                                        {tech.trim()}
                                                    </span>
                                                ))}
                                                {project.techStack.split(',').length > 3 && (
                                                    <span className="px-2 py-1 bg-[#FFFFFF] text-[#000000] text-xs rounded">
                                                        +{project.techStack.split(',').length - 3} more
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex sm:flex-col gap-2">
                                            <button
                                                onClick={() => {
                                                    setCurrentProject(project);
                                                    setEditDialogOpen(true);
                                                }}
                                                className="flex-1 sm:flex-initial p-3 bg-[#000000] hover:bg-[#1A1A1A] text-[#FFFFFF] transition-all flex items-center justify-center rounded-lg"
                                            >
                                                <Edit size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(project._id!)}
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
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto hide-scrollbar">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-[#FFFFFF] border-2 sm:border-4 border-[#000000] w-full max-w-4xl max-h-[90vh] overflow-y-auto hide-scrollbar rounded-xl sm:rounded-2xl my-4"
                    >
                        <div className="p-4 sm:p-6 border-b-2 sm:border-b-4 border-[#000000] flex items-center justify-between bg-[#1A1A1A] sticky top-0 z-10">
                            <h2 className="text-xl sm:text-2xl font-black text-[#FFFFFF]">
                                {currentProject._id ? 'Edit Project' : 'Create New Project'}
                            </h2>
                            <button
                                onClick={() => setEditDialogOpen(false)}
                                className="p-2 hover:bg-[#FFFFFF]/10 transition-colors rounded-lg"
                            >
                                <X size={20} className="text-[#FFFFFF]" />
                            </button>
                        </div>

                        <div className="p-4 sm:p-6 space-y-4">
                            {/* Basic Info */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-black text-[#000000] pb-2 border-b-2 border-[#000000]/10">
                                    Basic Information
                                </h3>

                                <div>
                                    <label className="block text-sm font-bold mb-2 text-[#000000]">
                                        Title <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={currentProject.title}
                                        onChange={(e) => {
                                            const title = e.target.value;
                                            setCurrentProject({
                                                ...currentProject,
                                                title,
                                                slug: generateSlug(title)
                                            });
                                        }}
                                        className="w-full px-4 py-3 text-sm sm:text-base border-2 border-[#000000]/20 focus:border-[#000000] outline-none rounded-md"
                                        placeholder="Enter project title"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold mb-2 text-[#000000]">
                                        Slug <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={currentProject.slug}
                                        onChange={(e) => setCurrentProject({ ...currentProject, slug: e.target.value })}
                                        className="w-full px-4 py-3 text-sm sm:text-base border-2 border-[#000000]/20 focus:border-[#000000] outline-none rounded-md"
                                        placeholder="project-url-slug"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold mb-2 text-[#000000]">
                                        Description <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        value={currentProject.description}
                                        onChange={(e) => setCurrentProject({ ...currentProject, description: e.target.value })}
                                        rows={4}
                                        maxLength={2000}
                                        className="w-full px-4 py-3 text-sm sm:text-base border-2 border-[#000000]/20 focus:border-[#000000] outline-none rounded-md"
                                        placeholder="Project description"
                                    />
                                    <p className="text-xs text-[#000000]/60 mt-1">
                                        {currentProject.description?.length || 0}/2000
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold mb-2 text-[#000000]">
                                        Project Image <span className="text-red-500">*</span>
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
                                    {currentProject.projectImage && (
                                        <div className="mt-3 relative inline-block">
                                            <img
                                                src={currentProject.projectImage}
                                                alt="Project"
                                                className="w-full max-w-md h-48 object-cover rounded-lg border-2 border-[#000000]"
                                            />
                                            <button
                                                type="button"
                                                onClick={async () => {
                                                    if (currentProject.projectImagePublicId) {
                                                        await deleteFromCloudinary(currentProject.projectImagePublicId as string);
                                                    }
                                                    setCurrentProject({ ...currentProject, projectImage: '', projectImagePublicId: '' });
                                                }}
                                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-2 text-[#000000]">
                                        Tech Stack <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={currentProject.techStack}
                                        onChange={(e) => setCurrentProject({ ...currentProject, techStack: e.target.value })}
                                        className="w-full px-4 py-3 text-sm sm:text-base border-2 border-[#000000]/20 focus:border-[#000000] outline-none rounded-md"
                                        placeholder="React, Node.js, MongoDB (comma-separated)"
                                    />
                                </div>
                            </div>
                            {/* Status Toggles */}
                            <div className="space-y-3 pt-4 border-t-2 border-[#000000]/10">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={currentProject.published || false}
                                        onChange={(e) => setCurrentProject({ ...currentProject, published: e.target.checked })}
                                        className="w-5 h-5"
                                    />
                                    <span className="text-[#000000] font-bold flex items-center gap-2">
                                        {currentProject.published ? <Eye size={18} /> : <EyeOff size={18} />}
                                        Publish Project
                                    </span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={currentProject.featured || false}
                                        onChange={(e) => setCurrentProject({ ...currentProject, featured: e.target.checked })}
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
                                    {currentProject._id ? 'Update Project' : 'Create Project'}
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
                            Are you sure you want to delete this project? This action cannot be undone and will also delete the project image from Cloudinary.
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
                            Delete Project
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}