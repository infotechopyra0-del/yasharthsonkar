'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ImagePlus, Plus, Edit, Trash2, Save, X,
  RefreshCw, Sparkles, BarChart3, Zap, Eye, Heart,
  Upload, Loader2
} from 'lucide-react';
import { toast } from 'sonner';
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
import { uploadToCloudinary, deleteFromCloudinary } from '@/lib/cloudinary';

interface GalleryItem {
  _id?: string;
  title: string;
  category: string;
  image: string;
  imagePublicId?: string;
  description: string;
  createdAt?: string;
}

export default function GalleryAdminPage() {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<GalleryItem>({
    title: '',
    category: 'projects',
    image: '',
    description: '',
  });
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Images' },
    { id: 'projects', label: 'Projects' },
    { id: 'events', label: 'Events' },
    { id: 'team', label: 'Team' },
    { id: 'workspace', label: 'Workspace' },
  ];

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/gallery');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setItems(data);
    } catch (error) {
      toast.error('Failed to load gallery');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    setUploadingImage(true);
    const loadingToast = toast.loading('Uploading image to Cloudinary...');

    try {
      // Delete old image if exists
      if (currentItem.image && currentItem.imagePublicId) {
        await deleteFromCloudinary(currentItem.imagePublicId);
      }

      // Upload new image
      const { url, publicId } = await uploadToCloudinary(file);

      setCurrentItem({
        ...currentItem,
        image: url,
        imagePublicId: publicId
      });

      toast.success('Image uploaded successfully!', { id: loadingToast });
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Image upload failed!', { id: loadingToast });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async () => {
    // Validation
    if (!currentItem.title.trim()) {
      toast.error('Title is required');
      return;
    }
    if (!currentItem.image) {
      toast.error('Image is required');
      return;
    }
    if (!currentItem.description.trim()) {
      toast.error('Description is required');
      return;
    }

    try {
      const isEdit = !!currentItem._id;
      const url = isEdit
        ? `/api/admin/gallery/${currentItem._id}`
        : '/api/admin/gallery';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentItem),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.error);

      toast.success(isEdit ? 'Updated! ✅' : 'Created! 🎉');
      setEditDialogOpen(false);
      setCurrentItem({
        title: '',
        category: 'projects',
        image: '',
        description: ''
      });
      fetchItems();
    } catch (error: any) {
      toast.error(error.message || 'Failed to save');
    }
  };

  const handleDelete = async (itemId: string) => {
    setDeleteId(itemId);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;

    const loadingToast = toast.loading('Deleting...');

    try {
      const itemToDelete = items.find(item => item._id === deleteId);

      // Delete from Cloudinary
      if (itemToDelete?.imagePublicId) {
        await deleteFromCloudinary(itemToDelete.imagePublicId);
        toast.success('Image deleted from Cloudinary!', { id: loadingToast });
      }

      // Delete from database
      const res = await fetch(`/api/admin/gallery/${deleteId}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete');

      toast.success('Deleted! 🗑️', { id: loadingToast });
      fetchItems();
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete', { id: loadingToast });
    } finally {
      setDeleteId(null);
      setIsDeleteDialogOpen(false);
    }
  };

  const filteredItems = selectedCategory === 'all'
    ? items
    : items.filter(item => item.category === selectedCategory);

  const getCategoryCount = (categoryId: string) => {
    if (categoryId === 'all') return items.length;
    return items.filter(item => item.category === categoryId).length;
  };

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
                Gallery Page
                <Sparkles className="text-[#B7AEA3]" size={24} />
              </h1>
              <p className="text-[#FFFFFF]/70 font-semibold mt-1 text-sm sm:text-base">
                Manage your gallery images and categories
              </p>
            </motion.div>
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              onClick={fetchItems}
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
        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 sm:mb-6 flex flex-wrap gap-2 sm:gap-3"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 sm:px-6 py-2 sm:py-3 font-bold transition-all duration-300 rounded-xl sm:rounded-2xl text-xs sm:text-sm lg:text-base ${
                selectedCategory === category.id
                  ? 'bg-[#000000] text-[#FFFFFF] border-2 sm:border-4 border-[#B7AEA3] shadow-lg scale-105'
                  : 'bg-[#FFFFFF] text-[#000000] border-2 sm:border-4 border-[#000000] hover:border-[#B7AEA3]'
              }`}
            >
              {category.label} ({getCategoryCount(category.id)})
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
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#000000] flex items-center justify-center shrink-0">
                <BarChart3 className="text-[#FFFFFF]" size={20} />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#000000]">
                  Gallery Images
                </h2>
                <p className="text-[#000000]/60 font-semibold text-xs sm:text-sm">
                  Manage your gallery content
                </p>
              </div>
            </div>
            <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
              <div className="inline-flex items-center gap-1 sm:gap-2 bg-[#D9D2C9] px-3 sm:px-4 py-2 rounded-xl sm:rounded-2xl flex-1 sm:flex-initial justify-center">
                <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-[#000000]" />
                <span className="text-[#000000] font-bold text-xs sm:text-sm">
                  {filteredItems.length} Images
                </span>
              </div>
              <button
                onClick={() => {
                  setCurrentItem({
                    title: '',
                    category: 'projects',
                    image: '',
                    description: '',
                  });
                  setEditDialogOpen(true);
                }}
                className="flex items-center justify-center gap-1 sm:gap-2 bg-[#000000] hover:bg-[#1A1A1A] text-[#FFFFFF] px-4 sm:px-6 py-2 sm:py-3 font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 rounded-xl sm:rounded-2xl text-xs sm:text-sm flex-1 sm:flex-initial"
              >
                <Plus size={16} />
                <span className="hidden sm:inline">Add Image</span>
                <span className="sm:hidden">Add</span>
              </button>
            </div>
          </div>

          {/* Gallery Grid */}
          {loading ? (
            <div className="text-center py-8 sm:py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-4 border-[#000000] border-t-transparent"></div>
              <p className="mt-4 text-[#000000] font-bold text-sm sm:text-base">Loading...</p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <p className="text-lg sm:text-xl font-black text-[#000000]">No images found</p>
              <p className="text-[#000000]/60 text-sm sm:text-base">Click "Add Image" to upload one</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  className="group relative bg-[#D9D2C9] rounded-xl sm:rounded-2xl overflow-hidden border-2 border-[#000000]/10 hover:border-[#000000]/30 transition-all"
                >
                  {/* Image */}
                  <div className="aspect-square overflow-hidden bg-[#1A1A1A]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Info Overlay */}
                  <div className="p-3 sm:p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-black text-sm sm:text-base text-[#000000] line-clamp-1 flex-1">
                        {item.title}
                      </h3>
                      <span className="px-2 py-1 bg-[#000000] text-[#FFFFFF] text-xs rounded shrink-0">
                        {categories.find(c => c.id === item.category)?.label}
                      </span>
                    </div>
                    
                    <p className="text-xs sm:text-sm text-[#000000]/70 line-clamp-2 mb-3">
                      {item.description}
                    </p>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setCurrentItem(item);
                          setEditDialogOpen(true);
                        }}
                        className="flex-1 p-2 bg-[#000000] hover:bg-[#1A1A1A] text-[#FFFFFF] transition-all flex items-center justify-center gap-1 text-xs rounded"
                      >
                        <Edit size={14} />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item._id!)}
                        className="flex-1 p-2 bg-red-600 hover:bg-red-700 text-[#FFFFFF] transition-all flex items-center justify-center gap-1 text-xs rounded"
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </main>

      {/* Edit/Add Dialog */}
      {editDialogOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#FFFFFF] border-2 sm:border-4 border-[#000000] w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl sm:rounded-2xl my-4"
          >
            <div className="p-4 sm:p-6 border-b-2 sm:border-b-4 border-[#000000] flex items-center justify-between bg-[#1A1A1A] sticky top-0 z-10">
              <h2 className="text-xl sm:text-2xl font-black text-[#FFFFFF]">
                {currentItem._id ? 'Edit Image' : 'Add New Image'}
              </h2>
              <button
                onClick={() => {
                  setEditDialogOpen(false);
                  setCurrentItem({
                    title: '',
                    category: 'projects',
                    image: '',
                    description: ''
                  });
                }}
                className="p-2 hover:bg-[#FFFFFF]/10 transition-colors rounded"
              >
                <X size={20} className="text-[#FFFFFF]" />
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-bold mb-2 text-[#000000]">Title *</label>
                <input
                  type="text"
                  placeholder="Enter image title"
                  value={currentItem.title}
                  onChange={(e) => setCurrentItem({ ...currentItem, title: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-[#000000]/20 focus:border-[#000000] outline-none rounded-md"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-bold mb-2 text-[#000000]">Category *</label>
                <select
                  value={currentItem.category}
                  onChange={(e) => setCurrentItem({ ...currentItem, category: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-[#000000]/20 focus:border-[#000000] outline-none rounded-md"
                >
                  {categories.filter(c => c.id !== 'all').map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.label}</option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-bold mb-2 text-[#000000]">Description *</label>
                <textarea
                  placeholder="Enter image description"
                  value={currentItem.description}
                  onChange={(e) => setCurrentItem({ ...currentItem, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-[#000000]/20 focus:border-[#000000] outline-none rounded-md"
                />
              </div>
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-bold mb-2 text-[#000000]">
                  Image * {uploadingImage && <span className="text-xs text-[#000000]/60">(Uploading...)</span>}
                </label>
                <div className="border-2 border-dashed border-[#000000]/20 rounded-lg p-4 text-center">
                  {currentItem.image ? (
                    <div className="relative">
                      <img
                        src={currentItem.image}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg mb-3"
                      />
                      <button
                        type="button"
                        onClick={async () => {
                          if (confirm('Remove this image?')) {
                            try {
                              if (currentItem.imagePublicId) {
                                await deleteFromCloudinary(currentItem.imagePublicId);
                              }
                              setCurrentItem({ ...currentItem, image: '', imagePublicId: '' });
                              toast.success('Image removed!');
                            } catch (err) {
                              toast.error('Failed to remove image!');
                            }
                          }
                        }}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <div className="py-8">
                      <Upload className="w-12 h-12 mx-auto text-[#000000]/40 mb-3" />
                      <p className="text-sm text-[#000000]/60 mb-2">Click to upload image</p>
                      <p className="text-xs text-[#000000]/40">PNG, JPG up to 5MB</p>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploadingImage}
                    className="w-full px-4 py-2 border-2 border-[#000000]/20 rounded-md cursor-pointer text-sm disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t-2 border-[#000000]">
                <button
                  onClick={() => {
                    setEditDialogOpen(false);
                    setCurrentItem({
                      title: '',
                      category: 'projects',
                      image: '',
                      description: '',
                    });
                  }}
                  className="flex-1 px-6 py-3 bg-[#D9D2C9] hover:bg-[#B7AEA3] text-[#000000] font-bold transition-all rounded-xl"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={uploadingImage}
                  className="flex-1 px-6 py-3 bg-[#000000] hover:bg-[#1A1A1A] text-[#FFFFFF] font-bold transition-all flex items-center justify-center gap-2 rounded-xl disabled:opacity-50"
                >
                  {uploadingImage ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Save size={18} />
                      Save
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Delete Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="bg-[#FFFFFF] border-2 sm:border-4 border-[#000000] w-[90vw] max-w-md rounded-xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[#000000] font-black text-lg sm:text-xl">
              Confirm Deletion
            </AlertDialogTitle>
            <AlertDialogDescription className="text-[#000000]/70 text-sm sm:text-base">
              Are you sure you want to delete this image? This will also remove it from Cloudinary. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row gap-2">
            <AlertDialogCancel className="w-full sm:w-auto bg-[#D9D2C9] text-[#000000] hover:bg-[#B7AEA3] px-4 py-2 rounded-md m-0">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="w-full sm:w-auto bg-red-600 text-[#FFFFFF] hover:bg-red-700 px-4 py-2 rounded-md m-0"
              onClick={confirmDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}