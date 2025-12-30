'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar, MapPin, Plus, Edit, Trash2, Save, X,
  RefreshCw, Sparkles, BarChart3, Zap, TrendingUp,
  BookOpen, Briefcase, Award, Target, Lightbulb
} from 'lucide-react';
import { toast } from 'sonner';
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
import { uploadToCloudinary, deleteFromCloudinary, getPublicIdFromUrl } from '@/lib/cloudinary';

type SectionType = 'journey' | 'expertise' | 'academic' | 'professional' | 'competency';

export default function AboutAdminPage() {
  const [activeSection, setActiveSection] = useState<SectionType>('journey');
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<any>({});
  const [arrayInput, setArrayInput] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDelete = async (itemId: string) => {
    setDeleteId(itemId);
    setIsDeleteDialogOpen(true);
  };

  const sections = [
    { id: 'journey', label: 'Journey Highlights', icon: Lightbulb, endpoint: 'journey-highlights' },
    { id: 'expertise', label: 'Core Expertise', icon: Target, endpoint: 'core-expertise' },
    { id: 'academic', label: 'Academic Journey', icon: BookOpen, endpoint: 'academic-journey' },
    { id: 'professional', label: 'Professional Journey', icon: Briefcase, endpoint: 'professional-journey' },
    { id: 'competency', label: 'Core Competencies', icon: Award, endpoint: 'core-competencies' },
  ];

  useEffect(() => {
    fetchItems();
  }, [activeSection]);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const section = sections.find(s => s.id === activeSection);
      const res = await fetch(`/api/admin/about/${section?.endpoint}`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setItems(data);
      toast.success('Data loaded! 📊');
    } catch (error) {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const section = sections.find(s => s.id === activeSection);
      const isEdit = !!currentItem._id;
      const url = isEdit
        ? `/api/admin/about/${section?.endpoint}/${currentItem._id}`
        : `/api/admin/about/${section?.endpoint}`;
      const method = isEdit ? 'PUT' : 'POST';

      const payload = {
        ...currentItem,
        institutionName: currentItem.institutionName ?? currentItem.institution ?? '',
        institution: currentItem.institution ?? currentItem.institutionName ?? '',
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.error);

      toast.success(isEdit ? 'Updated! ✅' : 'Created! 🎉');
      setEditDialogOpen(false);
      fetchItems();
    } catch (error: any) {
      toast.error(error.message || 'Failed to save');
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;

    const loadingToast = toast.loading("Deleting...");

    try {
      const section = sections.find(s => s.id === activeSection);
      const itemToDelete = items.find(item => item._id === deleteId);

      if (activeSection === 'expertise' && itemToDelete?.imagePublicId) {
        await deleteFromCloudinary(itemToDelete.imagePublicId);
        toast.success("Image deleted from Cloudinary!", { id: loadingToast });
      }

      const res = await fetch(`/api/admin/about/${section?.endpoint}/${deleteId}`, {
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

  const handleSkillImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const { url } = await uploadToCloudinary(file as any);
      setCurrentItem({
        ...currentItem,
        skillImage: url,
      });
    } catch (err) {
      console.error('Upload failed', err);
      alert('Image upload failed');
    }
  };

  return (
    <div className="min-h-screen bg-[#B7AEA3]">
      {/* Header - Fully Responsive */}
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
                About Page
                <Sparkles className="text-[#B7AEA3]" size={24} />
              </h1>
              <p className="text-[#FFFFFF]/70 font-semibold mt-1 text-sm sm:text-base">
                Manage your about page content
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
        {/* Section Tabs - Responsive Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 sm:mb-6 grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-3"
        >
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id as SectionType)}
                className={`flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 font-bold transition-all duration-300 rounded-xl sm:rounded-2xl text-xs sm:text-sm lg:text-base ${
                  activeSection === section.id
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

        {/* Content Section - Responsive */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
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
                  Manage your content
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
                  setCurrentItem({});
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

          {/* Items List - Responsive */}
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
                      <h3 className="text-lg sm:text-xl font-black text-[#000000] mb-2 wraps-break-words">
                        {item.title || item.skillName || item.period}
                      </h3>
                      <p className="text-[#000000]/70 mb-2 text-sm sm:text-base line-clamp-3">
                        {item.description?.substring(0, 150)}...
                      </p>
                      {item.tags && item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 sm:gap-2 mt-2 sm:mt-3">
                          {item.tags.map((tag: string, i: number) => (
                            <span key={i} className="px-2 sm:px-3 py-1 bg-[#000000] text-[#FFFFFF] text-xs font-bold break-all">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex sm:flex-col gap-2 w-full sm:w-auto">
                      <button
                        onClick={() => {
                          const normalized = {
                            ...item,
                            institutionName: item.institutionName ?? item.Institution ?? item.institution ?? '',
                            duration: item.duration ?? item.period ?? '',
                          };
                          setCurrentItem(normalized);
                          setEditDialogOpen(true);
                        }}
                        className="flex-1 sm:flex-initial p-2 bg-[#000000] hover:bg-[#1A1A1A] text-[#FFFFFF] transition-all flex items-center justify-center"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="flex-1 sm:flex-initial p-2 bg-[#000000] hover:bg-red-600 text-[#FFFFFF] transition-all flex items-center justify-center"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </main>

      {/* Edit Dialog - Fully Responsive */}
      {editDialogOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#FFFFFF] border-2 sm:border-4 border-[#000000] w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl sm:rounded-2xl my-4"
          >
            <div className="p-4 sm:p-6 border-b-2 sm:border-b-4 border-[#000000] flex items-center justify-between bg-[#1A1A1A] sticky top-0 z-10">
              <h2 className="text-xl sm:text-2xl font-black text-[#FFFFFF]">
                {currentItem._id ? 'Edit Item' : 'Add New Item'}
              </h2>
              <button
                onClick={() => setEditDialogOpen(false)}
                className="p-2 hover:bg-[#FFFFFF]/10 transition-colors"
              >
                <X size={20} className="text-[#FFFFFF]" />
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
              {/* Journey Section */}
              {activeSection === 'journey' && (
                <>
                  <input
                    type="text"
                    placeholder="Title"
                    value={currentItem.title || ''}
                    onChange={(e) => setCurrentItem({ ...currentItem, title: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-[#000000]/20 focus:border-[#000000] outline-none rounded-md"
                  />
                  <textarea
                    placeholder="Description"
                    value={currentItem.description || ''}
                    onChange={(e) => setCurrentItem({ ...currentItem, description: e.target.value })}
                    rows={4}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-[#000000]/20 focus:border-[#000000] outline-none rounded-md"
                  />
                  <input
                    type="text"
                    placeholder="Period (e.g., 2020-2023)"
                    value={currentItem.period || ''}
                    onChange={(e) => setCurrentItem({ ...currentItem, period: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-[#000000]/20 focus:border-[#000000] outline-none rounded-md"
                  />
                  <div>
                    <label className="block text-sm font-bold mb-2 text-[#000000]">Tags</label>
                    <div className="flex flex-col sm:flex-row gap-2 mb-2">
                      <input
                        type="text"
                        value={arrayInput}
                        onChange={(e) => setArrayInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addArrayItem('tags'))}
                        className="flex-1 px-3 sm:px-4 py-2 text-sm sm:text-base border-2 border-[#000000]/20 focus:border-[#000000] outline-none rounded-md"
                        placeholder="Add tag and press Enter"
                      />
                      <button
                        type="button"
                        onClick={() => addArrayItem('tags')}
                        className="w-full sm:w-auto px-4 py-2 bg-[#000000] text-[#FFFFFF] font-bold hover:bg-[#1A1A1A] rounded-md flex items-center justify-center"
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {(currentItem.tags || []).map((tag: string, i: number) => (
                        <span
                          key={i}
                          className="px-2 sm:px-3 py-1 bg-[#D9D2C9] text-[#000000] text-xs sm:text-sm flex items-center gap-2 rounded-md break-all"
                        >
                          {tag}
                          <X
                            size={14}
                            className="cursor-pointer hover:text-red-600 shrink-0"
                            onClick={() => removeArrayItem('tags', tag)}
                          />
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Expertise Section */}
              {activeSection === 'expertise' && (
                <>
                  <input
                    type="text"
                    placeholder="Title"
                    value={currentItem.title || ''}
                    onChange={(e) => setCurrentItem({ ...currentItem, title: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-[#000000]/20 focus:border-[#000000] outline-none rounded-md"
                  />
                  <textarea
                    placeholder="Description"
                    value={currentItem.description || ''}
                    onChange={(e) => setCurrentItem({ ...currentItem, description: e.target.value })}
                    rows={4}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-[#000000]/20 focus:border-[#000000] outline-none rounded-md"
                  />
                  <div>
                    <label className="block text-sm font-bold mb-2 text-[#000000]">Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        if (!e.target.files || !e.target.files[0]) return;
                        const file = e.target.files[0];
                        const loadingToast = toast.loading("Uploading image...");
                        try {
                          if (currentItem.image && currentItem.imagePublicId) {
                            await deleteFromCloudinary(currentItem.imagePublicId);
                          }
                          const { url, publicId } = await uploadToCloudinary(file);
                          setCurrentItem({ ...currentItem, image: url, imagePublicId: publicId });
                          toast.success("Image uploaded successfully!", { id: loadingToast });
                        } catch (err) {
                          console.error(err);
                          toast.error("Image upload failed!", { id: loadingToast });
                        }
                      }}
                      className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border-2 border-[#000000]/20 focus:border-[#000000] outline-none rounded-md"
                    />
                    {(currentItem.image || currentItem.imageUrl || currentItem.image_url || currentItem.img) && (
                      <div className="mt-2 relative inline-block">
                        <img
                          src={currentItem.image || currentItem.imageUrl || currentItem.image_url || currentItem.img || ''}
                          alt="Uploaded"
                          className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-md border"
                        />
                        <button
                          type="button"
                          onClick={async () => {
                            const confirmDelete = confirm("Are you sure you want to remove this image?");
                            if (!confirmDelete) return;
                            try {
                              if (currentItem.imagePublicId) {
                                await deleteFromCloudinary(currentItem.imagePublicId);
                              }
                              setCurrentItem({ ...currentItem, image: '', imagePublicId: '' });
                              toast.success("Image removed!");
                            } catch (err) {
                              toast.error("Failed to remove image!");
                            }
                          }}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                        >
                          ×
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* Academic Section */}
              {activeSection === 'academic' && (
                <>
                  <input
                    type="text"
                    placeholder="Degree/Qualification Title"
                    value={currentItem.title || ''}
                    onChange={(e) => setCurrentItem({ ...currentItem, title: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-[#000000]/20 focus:border-[#000000] outline-none rounded-md"
                  />
                  <input
                    type="text"
                    placeholder="Institution Name"
                    value={currentItem.institutionName}
                    onChange={(e) => setCurrentItem({ ...currentItem, institutionName: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-[#000000]/20 focus:border-[#000000] outline-none rounded-md"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-bold mb-2 text-[#000000]">Start Date</label>
                      <input
                        type="date"
                        value={currentItem.startDate ? new Date(currentItem.startDate).toISOString().split('T')[0] : ''}
                        onChange={(e) => setCurrentItem({ ...currentItem, startDate: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-[#000000]/20 focus:border-[#000000] outline-none rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-bold mb-2 text-[#000000]">End Date</label>
                      <input
                        type="date"
                        value={currentItem.endDate ? new Date(currentItem.endDate).toISOString().split('T')[0] : ''}
                        onChange={(e) => setCurrentItem({ ...currentItem, endDate: e.target.value })}
                        disabled={currentItem.isCurrent}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-[#000000]/20 focus:border-[#000000] outline-none disabled:bg-gray-100 rounded-md"
                      />
                    </div>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={currentItem.isCurrent || false}
                      onChange={(e) => setCurrentItem({ ...currentItem, isCurrent: e.target.checked, endDate: e.target.checked ? null : currentItem.endDate })}
                      className="w-4 h-4 sm:w-5 sm:h-5"
                    />
                    <span className="text-[#000000] font-bold text-sm sm:text-base">Currently Pursuing</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Location"
                    value={currentItem.location || ''}
                    onChange={(e) => setCurrentItem({ ...currentItem, location: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-[#000000]/20 focus:border-[#000000] outline-none rounded-md"
                  />
                  <textarea
                    placeholder="Description (Optional)"
                    value={currentItem.description || ''}
                    onChange={(e) => setCurrentItem({ ...currentItem, description: e.target.value })}
                    rows={4}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-[#000000]/20 focus:border-[#000000] outline-none rounded-md"
                  />
                </>
              )}

              {/* Professional Section */}
              {activeSection === 'professional' && (
                <>
                  <input
                    type="text"
                    placeholder="Company Name"
                    value={currentItem.companyName || ''}
                    onChange={(e) => setCurrentItem({ ...currentItem, companyName: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-[#000000]/20 focus:border-[#000000] outline-none rounded-md"
                  />
                  <input
                    type="text"
                    placeholder="Position"
                    value={currentItem.position ?? ''}
                    onChange={(e) => setCurrentItem({ ...currentItem, position: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-[#000000]/20 focus:border-[#000000] outline-none rounded-md"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-bold mb-2 text-[#000000]">Start Date</label>
                      <input
                        type="date"
                        value={currentItem.startDate ? new Date(currentItem.startDate).toISOString().split('T')[0] : ''}
                        onChange={(e) => setCurrentItem({ ...currentItem, startDate: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-[#000000]/20 focus:border-[#000000] outline-none rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-bold mb-2 text-[#000000]">End Date</label>
                      <input
                        type="date"
                        value={currentItem.endDate ? new Date(currentItem.endDate).toISOString().split('T')[0] : ''}
                        onChange={(e) => setCurrentItem({ ...currentItem, endDate: e.target.value })}
                        disabled={currentItem.isCurrent}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-[#000000]/20 focus:border-[#000000] outline-none disabled:bg-gray-100 rounded-md"
                      />
                    </div>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={currentItem.isCurrent || false}
                      onChange={(e) => setCurrentItem({ ...currentItem, isCurrent: e.target.checked, endDate: e.target.checked ? null : currentItem.endDate })}
                      className="w-4 h-4 sm:w-5 sm:h-5"
                    />
                    <span className="text-[#000000] font-bold text-sm sm:text-base">Currently Working Here</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Location"
                    value={currentItem.location || ''}
                    onChange={(e) => setCurrentItem({ ...currentItem, location: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-[#000000]/20 focus:border-[#000000] outline-none rounded-md"
                  />
                  <textarea
                    placeholder="Description (Optional)"
                    value={currentItem.description || ''}
                    onChange={(e) => setCurrentItem({ ...currentItem, description: e.target.value })}
                    rows={4}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-[#000000]/20 focus:border-[#000000] outline-none rounded-md"
                  />
                </>
              )}

              {/* Competency Section */}
              {activeSection === 'competency' && (
                <>
                  <input
                    type="text"
                    placeholder="Skill Name"
                    value={currentItem.skillName || ''}
                    onChange={(e) => setCurrentItem({ ...currentItem, skillName: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-[#000000]/20 focus:border-[#000000] outline-none rounded-md"
                  />
                  <textarea
                    placeholder="Description (Optional)"
                    value={currentItem.description || ''}
                    onChange={(e) => setCurrentItem({ ...currentItem, description: e.target.value })}
                    rows={3}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-[#000000]/20 focus:border-[#000000] outline-none rounded-md"
                  />
                  <div className="space-y-2">
                    <label className="block text-xs sm:text-sm font-bold text-[#000000]">Skill Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleSkillImageUpload}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-[#000000]/20 bg-white outline-none cursor-pointer rounded-md"
                    />
                    {currentItem.skillImage && (
                      <div className="w-16 h-16 sm:w-20 sm:h-20 overflow-hidden border-2 border-[#000000]">
                        <img
                          src={currentItem.skillImage}
                          alt="Skill preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* Action Buttons - Responsive */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-4 sm:pt-6 border-t-2 sm:border-t-4 border-[#000000]">
                <button
                  onClick={() => setEditDialogOpen(false)}
                  className="w-full sm:flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-[#D9D2C9] hover:bg-[#B7AEA3] text-[#000000] font-bold transition-all rounded-xl sm:rounded-2xl text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="w-full sm:flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-[#000000] hover:bg-[#1A1A1A] text-[#FFFFFF] font-bold transition-all flex items-center justify-center gap-2 rounded-xl sm:rounded-2xl text-sm sm:text-base"
                >
                  <Save size={18} />
                  Save
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Delete Alert Dialog - Responsive */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="bg-[#FFFFFF] border-2 sm:border-4 border-[#000000] w-[90vw] max-w-md rounded-xl sm:rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[#000000] font-black text-lg sm:text-xl">
              Confirm Deletion
            </AlertDialogTitle>
            <AlertDialogDescription className="text-[#000000]/70 text-sm sm:text-base">
              Are you sure you want to delete this item? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
            <AlertDialogCancel className="w-full sm:w-auto bg-[#D9D2C9] text-[#000000] hover:bg-[#B7AEA3] px-4 py-2 rounded-md text-sm sm:text-base m-0 mr-2">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="w-full sm:w-auto bg-[#000000] text-[#FFFFFF] hover:bg-[#1A1A1A] px-4 py-2 rounded-md text-sm sm:text-base m-0"
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