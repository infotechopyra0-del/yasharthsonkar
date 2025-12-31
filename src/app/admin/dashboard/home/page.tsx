'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Plus, Edit, Trash2, Save, X, RefreshCw, Sparkles,
  BarChart3, Zap, Home, Award, Users, Building2, Upload
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


type SectionType = 'digitalsolutions' | 'brands';


interface DigitalSolutionsData {
  _id?: string;
  title: string;
  description: string;
  features: string[];
  icon: string;
}

interface BrandData {
  _id?: string;
  name: string;
  category: string;
  description: string;
  logoUrl: string;
  logoPublicId: string;
  tags: string[];
}

export default function HomeAdminPage() {
  const [activeSection, setActiveSection] = useState<SectionType>('digitalsolutions');
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<any>({});
  const [arrayInput, setArrayInput] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const sections = [
    { id: 'digitalsolutions', label: 'Digital Solutions', icon: Sparkles, endpoint: 'digitalsolutions' },
    { id: 'brands', label: 'Brands', icon: Building2, endpoint: 'brands' },
  ];

  useEffect(() => {
    fetchItems();
  }, [activeSection]);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const section = sections.find(s => s.id === activeSection);
      const res = await fetch(`/api/admin/home/${section?.endpoint}`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      let itemsData: any[] = [];
      if (Array.isArray(data)) {
        itemsData = data;
      } else if (data && typeof data === 'object') {
        if (data.success && data.data) {
          itemsData = Array.isArray(data.data) ? data.data : [data.data];
        } else {
          itemsData = Object.keys(data).length ? [data] : [];
        }
      }
      setItems(itemsData);
    } catch (error) {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string = 'image'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const loadingToast = toast.loading("Uploading image to Cloudinary...");

    try {
      const { url, publicId } = await uploadToCloudinary(file);

      if (fieldName === 'projectImage') {
        setCurrentItem({
          ...currentItem,
          projectImage: url,
          projectImagePublicId: publicId,
        });
      }

      if (fieldName === 'logo') {
        setCurrentItem({
          ...currentItem,
          logoUrl: url,
          logoPublicId: publicId
        });
      }

      toast.success("Image uploaded successfully!", { id: loadingToast });
    } catch (err) {
      toast.error("Image upload failed!", { id: loadingToast });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleDeleteImage = async (publicId: string, imageUrl: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this image?");
    if (!confirmDelete) return;

    const loadingToast = toast.loading("Deleting image...");

    try {
      await deleteFromCloudinary(publicId);
      if (activeSection === 'brands') {
        setCurrentItem({
          ...currentItem,
          logoUrl: '',
          logoPublicId: ''
        });
      }

      toast.success("Image deleted!", { id: loadingToast });
    } catch (err) {
      toast.error("Failed to delete image!", { id: loadingToast });
    }
  };

  const handleSave = async () => {
    try {
      // Client-side validation for required brand fields
      if (activeSection === 'brands') {
        const name = String(currentItem.name || '').trim();
        const category = String(currentItem.category || '').trim();
        const description = String(currentItem.description || '').trim();
        if (!name || !category || !description) {
          toast.error('Please provide name, category and description before saving');
          return;
        }
        // ensure trimmed values
        currentItem.name = name;
        currentItem.category = category;
        currentItem.description = description;
      }
      const section = sections.find(s => s.id === activeSection);
      const isEdit = !!currentItem._id;
      const url = isEdit
        ? `/api/admin/home/${section?.endpoint}/${currentItem._id}`
        : `/api/admin/home/${section?.endpoint}`;
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
      setCurrentItem({});
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

    const loadingToast = toast.loading("Deleting...");

    try {
      const section = sections.find(s => s.id === activeSection);
      const itemToDelete = items.find(item => item._id === deleteId);
      if (activeSection === 'brands' && itemToDelete?.logoPublicId) {
        await deleteFromCloudinary(itemToDelete.logoPublicId);
      }

      const res = await fetch(`/api/admin/home/${section?.endpoint}/${deleteId}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete');

      toast.success('Deleted! 🗑️', { id: loadingToast });
      fetchItems();
    } catch (error) {
      toast.error('Failed to delete', { id: loadingToast });
    } finally {
      setDeleteId(null);
      setIsDeleteDialogOpen(false);
    }
  };

  const addArrayItem = (field: string) => {
    if (!arrayInput.trim()) return;
    setCurrentItem({
      ...currentItem,
      [field]: [...(currentItem[field] || []), arrayInput.trim()],
    });
    setArrayInput('');
  };

  const removeArrayItem = (field: string, item: string) => {
    setCurrentItem({
      ...currentItem,
      [field]: (currentItem[field] || []).filter((i: string) => i !== item),
    });
  };

  const updateImageAlt = (index: number, alt: string) => {
    const updatedImages = [...(currentItem.images || [])];
    updatedImages[index].alt = alt;
    setCurrentItem({
      ...currentItem,
      images: updatedImages
    });
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const openForEdit = (item: any) => {
    if (!item) return;
    console.debug('openForEdit item:', item);
    if (activeSection === 'brands') {
      setCurrentItem({
        ...item,
        category: item?.category ?? (Array.isArray(item?.category) ? item.category[0] : item?.data?.category) ?? '',
        tags: item.tags || [],
        logoUrl: item.logoUrl || item.logo || '',
        logoPublicId: item.logoPublicId || '',
      });
    } else if (activeSection === 'digitalsolutions') {
      setCurrentItem({
        ...item,
        title: item.title || '',
        description: item.description || '',
        features: item.features || [],
        icon: item.icon || '',
      });
    } else {
      setCurrentItem(item);
    }
    setEditDialogOpen(true);
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
              className="w-full sm:w-auto"
            >
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#FFFFFF] flex items-center gap-2 sm:gap-3">
                Home Page
                <Sparkles className="text-[#B7AEA3]" size={24} />
              </h1>
              <p className="text-[#FFFFFF]/70 font-semibold mt-1 text-sm sm:text-base">
                Manage your home page content
              </p>
            </motion.div>
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
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
        {/* Section Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 sm:mb-6 grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-3"
        >
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id as SectionType)}
                className={`flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 font-bold transition-all duration-300 rounded-xl sm:rounded-2xl text-xs sm:text-sm lg:text-base ${activeSection === section.id
                    ? 'bg-[#000000] text-[#FFFFFF] border-2 sm:border-4 border-[#B7AEA3] shadow-lg scale-105'
                    : 'bg-[#FFFFFF] text-[#000000] border-2 sm:border-4 border-[#000000] hover:border-[#B7AEA3]'
                  }`}
              >
                <Icon size={16} className="hidden sm:block" />
                <span className="truncate">{section.label}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Content Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#FFFFFF] shadow-2xl p-4 sm:p-6 lg:p-8 border-2 sm:border-4 border-[#000000] rounded-xl sm:rounded-2xl"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#000000] flex items-center justify-center shrink-0">
                <BarChart3 className="text-[#FFFFFF]" size={20} />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#000000] truncate">
                  {sections.find(s => s.id === activeSection)?.label}
                </h2>
                <p className="text-[#000000]/60 font-semibold text-xs sm:text-sm">
                  Manage content
                </p>
              </div>
            </div>
            <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
              <div className="inline-flex items-center gap-1 sm:gap-2 bg-[#D9D2C9] px-3 sm:px-4 py-2 rounded-xl sm:rounded-2xl flex-1 sm:flex-initial justify-center">
                <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-[#000000]" />
                <span className="text-[#000000] font-bold text-xs sm:text-sm">
                  {items.length} Items
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (activeSection === 'brands') {
                    setCurrentItem({ name: '', category: '', description: '', tags: [], logoUrl: '', logoPublicId: '' });
                  } else if (activeSection === 'digitalsolutions') {
                    setCurrentItem({ title: '', description: '', features: [], icon: '' });
                  } else {
                    setCurrentItem({});
                  }
                  setEditDialogOpen(true);
                }}
                className="flex items-center justify-center gap-1 sm:gap-2 bg-[#000000] hover:bg-[#1A1A1A] text-[#FFFFFF] px-4 sm:px-6 py-2 sm:py-3 font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 rounded-xl sm:rounded-2xl text-xs sm:text-sm flex-1 sm:flex-initial"
              >
                <Plus size={16} />
                <span className="hidden sm:inline">Add New</span>
                <span className="sm:hidden">Add</span>
              </button>
            </div>
          </div>

          {/* Items List */}
          {loading ? (
            <div className="text-center py-8 sm:py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-4 border-[#000000] border-t-transparent"></div>
              <p className="mt-4 text-[#000000] font-bold text-sm sm:text-base">Loading...</p>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <p className="text-lg sm:text-xl font-black text-[#000000]">No items found</p>
              <p className="text-[#000000]/60 text-sm sm:text-base">Click "Add New" to create one</p>
            </div>
          ) : (
            <div className="grid gap-3 sm:gap-4">
              {items.map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  className="p-4 sm:p-6 bg-[#D9D2C9] hover:bg-[#B7AEA3] transition-colors duration-200 border-2 border-[#000000]/10 rounded-xl sm:rounded-2xl"
                >
                  <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-4">
                    <div className="flex-1 min-w-0 w-full">
                      <h3 className="text-lg sm:text-xl font-black text-[#000000] mb-2">
                        {item.mainTitle || item.title || item.name || item.label || item.metric}
                      </h3>
                      <p className="text-[#000000]/70 mb-2 text-sm sm:text-base line-clamp-3">
                        {item.description?.substring(0, 150)}...
                      </p>
                      {item.tags && item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 sm:gap-2 mt-2 sm:mt-3">
                          {item.tags.map((tag: string, i: number) => (
                            <span key={i} className="px-2 sm:px-3 py-1 bg-[#000000] text-[#FFFFFF] text-xs font-bold">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex sm:flex-col gap-2 w-full sm:w-auto">
                      <button
                        onClick={() => openForEdit(item)}
                        className="flex-1 sm:flex-initial p-3 bg-[#000000] hover:bg-[#1A1A1A] text-[#FFFFFF] transition-all flex items-center justify-center rounded-lg"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
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
            className="bg-[#FFFFFF] border-2 sm:border-4 border-[#000000] w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl sm:rounded-2xl my-4  hide-scrollbar"
          >
            <div className="p-4 sm:p-6 border-b-2 sm:border-b-4 border-[#000000] flex items-center justify-between bg-[#1A1A1A] sticky top-0 z-10">
              <h2 className="text-xl sm:text-2xl font-black text-[#FFFFFF]">
                {currentItem._id ? 'Edit Item' : 'Add New Item'}
              </h2>
              <button
                onClick={() => {
                  setEditDialogOpen(false);
                  setCurrentItem({});
                }}
                className="p-2 hover:bg-[#FFFFFF]/10 transition-colors rounded-lg"
              >
                <X size={20} className="text-[#FFFFFF]" />
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-4">
              {/* Digital Solutions Section Fields */}
              {activeSection === 'digitalsolutions' && (
                <>
                  <input
                    type="text"
                    placeholder="Digital Solutions Title"
                    value={currentItem.title || ''}
                    onChange={(e) => setCurrentItem({ ...currentItem, title: e.target.value })}
                    className="w-full px-4 py-3 text-sm sm:text-base border-2 border-[#000000]/20 focus:border-[#000000] outline-none rounded-md"
                  />
                  <textarea
                    placeholder="Description"
                    value={currentItem.description || ''}
                    onChange={(e) => setCurrentItem({ ...currentItem, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 text-sm sm:text-base border-2 border-[#000000]/20 focus:border-[#000000] outline-none rounded-md"
                  />
                  <div>
                    <label className="block text-sm font-bold mb-2 text-[#000000]">Features</label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        placeholder="Add feature"
                        value={arrayInput}
                        onChange={(e) => setArrayInput(e.target.value)}
                        className="flex-1 px-4 py-2 text-sm sm:text-base border-2 border-[#000000]/20 focus:border-[#000000] outline-none rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => addArrayItem('features')}
                        className="px-4 py-2 bg-[#000000] hover:bg-[#1A1A1A] text-[#FFFFFF] font-bold rounded-md"
                      >
                        Add
                      </button>
                    </div>
                    {currentItem.features && currentItem.features.length > 0 && (
                      <ul className="list-disc list-inside space-y-1">
                        {currentItem.features.map((feature: string, idx: number) => (
                          <li key={idx} className="flex items-center justify-between">
                            <span>{feature}</span>
                            <button
                              type="button"
                              onClick={() => removeArrayItem('features', feature)}
                              className="text-red-500 hover:text-red-700"
                            >
                              ×
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <input
                    type="text"
                    placeholder="Icon (e.g., lucide icon name)"
                    value={currentItem.icon || ''}
                    onChange={(e) => setCurrentItem({ ...currentItem, icon: e.target.value })}
                    className="w-full px-4 py-3 text-sm sm:text-base border-2 border-[#000000]/20 focus:border-[#000000] outline-none rounded-md"
                  />
                </>
              )}

              {/* Brands Section Fields */}
              {activeSection === 'brands' && (
                <>
                  <div>
                    <label className="block text-sm font-bold mb-2 text-[#000000]">Brand Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      placeholder="Brand Name"
                      value={currentItem.name || ''}
                      onChange={(e) => setCurrentItem({ ...currentItem, name: e.target.value })}
                      className="w-full px-4 py-3 text-sm sm:text-base border-2 border-[#000000]/20 focus:border-[#000000] outline-none rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2 text-[#000000]">Category <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      placeholder="e.g., Technology, Finance"
                      value={currentItem.category || ''}
                      onChange={(e) => setCurrentItem({ ...currentItem, category: e.target.value })}
                      className="w-full px-4 py-3 text-sm sm:text-base border-2 border-[#000000]/20 focus:border-[#000000] outline-none rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2 text-[#000000]">Description <span className="text-red-500">*</span></label>
                    <textarea
                      placeholder="Description"
                      value={currentItem.description || ''}
                      onChange={(e) => setCurrentItem({ ...currentItem, description: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 text-sm sm:text-base border-2 border-[#000000]/20 focus:border-[#000000] outline-none rounded-md"
                      required
                    />
                  </div>
                  <div className="mt-3">
                    <label className="block text-sm font-bold mb-2 text-[#000000]">Tags</label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        placeholder="Add tag"
                        value={arrayInput}
                        onChange={(e) => setArrayInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addArrayItem('tags'))}
                        className="flex-1 px-4 py-2 text-sm sm:text-base border-2 border-[#000000]/20 focus:border-[#000000] outline-none rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => addArrayItem('tags')}
                        className="px-4 py-2 bg-[#000000] hover:bg-[#1A1A1A] text-[#FFFFFF] font-bold rounded-md"
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {(currentItem.tags || []).map((tag: string, i: number) => (
                        <span key={i} className="px-3 py-1 bg-[#D9D2C9] text-[#000000] text-sm flex items-center gap-2 rounded-md">
                          {tag}
                          <button onClick={() => removeArrayItem('tags', tag)} className="text-red-500">×</button>
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2 text-[#000000]">Brand Logo</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'logo')}
                      disabled={uploadingImage}
                      className="w-full px-4 py-3 text-sm sm:text-base border-2 border-[#000000]/20 focus:border-[#000000] outline-none rounded-md bg-white cursor-pointer disabled:opacity-50"
                    />
                    {currentItem.logoUrl && (
                      <div className="mt-4 relative w-32 h-32">
                        <img
                          src={currentItem.logoUrl}
                          alt={currentItem.name || 'Brand logo'}
                          className="w-full h-full object-contain rounded-md border-2 border-[#000000]"
                        />
                        <button
                          type="button"
                          onClick={() => handleDeleteImage(currentItem.logoPublicId, currentItem.logoUrl)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                        >
                          ×
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 py-2 px-6 border-t-2 border-[#000000]">
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
                {currentItem._id ? 'Update Item' : 'Create Item'}
              </button>
            </div>
          </motion.div>
        </div>
      )}


      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="bg-[#FFFFFF] border-4 border-[#000000] w-[90vw] max-w-md rounded-2xl hide-scrollbar">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[#000000] font-black text-xl">Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription className="text-[#000000]/70">
              Are you sure you want to delete this item? This action cannot be undone.
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
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}