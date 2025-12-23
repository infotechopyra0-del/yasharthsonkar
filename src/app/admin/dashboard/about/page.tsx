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

  // YEH UPDATED handleDelete FUNCTION HAI
  const handleDelete = async (itemId: string) => {
    // Delete dialog ko open karo aur ID save karo
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

      // Normalize payload: use `institutionName` as canonical, keep legacy keys for compatibility
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

  // YEH UPDATED confirmDelete FUNCTION HAI
  const confirmDelete = async () => {
    if (!deleteId) return;
    
    const loadingToast = toast.loading("Deleting...");
    
    try {
      const section = sections.find(s => s.id === activeSection);
      
      // Pehle item find karo jo delete karna hai
      const itemToDelete = items.find(item => item._id === deleteId);
      
      // Agar expertise section hai aur image hai to Cloudinary se delete karo
      if (activeSection === 'expertise' && itemToDelete?.imagePublicId) {
        await deleteFromCloudinary(itemToDelete.imagePublicId);
        toast.success("Image deleted from Cloudinary!", { id: loadingToast });
      }
      
      // Database se delete karo
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
  

  return (
    <div className="min-h-screen bg-[#B7AEA3]">
      {/* Header */}
      <header className="bg-[#1A1A1A] shadow-2xl border-b-4 border-[#000000] sticky top-0 z-10">
        <div className="px-6 py-6">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl font-black text-[#FFFFFF] flex items-center gap-3">
                About Page
                <Sparkles className="text-[#B7AEA3]" size={32} />
              </h1>
              <p className="text-[#FFFFFF]/70 font-semibold mt-1">
                Manage your about page content
              </p>
            </motion.div>
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              onClick={fetchItems}
              disabled={loading}
              className="flex items-center gap-2 bg-[#FFFFFF] hover:bg-[#D9D2C9] text-[#000000] px-6 py-3 font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50"
            >
              <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
              Refresh
            </motion.button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {/* Section Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 flex flex-wrap gap-3"
        >
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id as SectionType)}
                className={`flex items-center gap-2 px-6 py-3 font-bold transition-all duration-300 ${activeSection === section.id
                  ? 'bg-[#000000] text-[#FFFFFF] border-4 border-[#B7AEA3] shadow-lg scale-105'
                  : 'bg-[#FFFFFF] text-[#000000] border-4 border-[#000000] hover:border-[#B7AEA3]'
                  }`}
              >
                <Icon size={18} />
                <span>{section.label}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Content Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-[#FFFFFF] shadow-2xl p-8 border-4 border-[#000000]"
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#000000] flex items-center justify-center">
                <BarChart3 className="text-[#FFFFFF]" size={24} />
              </div>
              <div>
                <h2 className="text-3xl font-black text-[#000000]">
                  {sections.find(s => s.id === activeSection)?.label}
                </h2>
                <p className="text-[#000000]/60 font-semibold text-sm">
                  Manage your content
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="inline-flex items-center gap-2 bg-[#D9D2C9] px-4 py-2">
                <Zap className="w-4 h-4 text-[#000000]" />
                <span className="text-[#000000] font-bold text-sm">
                  {items.length} Items
                </span>
              </div>
              <button
              type="button"
                onClick={() => {
                  setCurrentItem({});
                  setEditDialogOpen(true);
                }}
                className="flex items-center gap-2 bg-[#000000] hover:bg-[#1A1A1A] text-[#FFFFFF] px-6 py-3 font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Plus size={20} />
                Add New
              </button>
            </div>
          </div>

          {/* Items List */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-[#000000] border-t-transparent"></div>
              <p className="mt-4 text-[#000000] font-bold">Loading...</p>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl font-black text-[#000000]">No items found</p>
              <p className="text-[#000000]/60">Click "Add New" to create one</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {items.map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  className="p-6 bg-[#D9D2C9] hover:bg-[#B7AEA3] transition-colors duration-200 border-2 border-[#000000]/10"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-black text-[#000000] mb-2">
                        {item.title || item.skillName || item.period}
                      </h3>
                      <p className="text-[#000000]/70 mb-2">
                        {item.description?.substring(0, 150)}...
                      </p>
                      {item.tags && item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {item.tags.map((tag: string, i: number) => (
                            <span key={i} className="px-3 py-1 bg-[#000000] text-[#FFFFFF] text-xs font-bold">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2 ml-4">
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
                        className="p-2 bg-[#000000] hover:bg-[#1A1A1A] text-[#FFFFFF] transition-all"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="p-2 bg-[#000000] hover:bg-red-600 text-[#FFFFFF] transition-all"
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

      {/* Edit Dialog */}
      {editDialogOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#FFFFFF] border-4 border-[#000000] max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b-4 border-[#000000] flex items-center justify-between bg-[#1A1A1A]">
              <h2 className="text-2xl font-black text-[#FFFFFF]">
                {currentItem._id ? 'Edit Item' : 'Add New Item'}
              </h2>
              <button
                onClick={() => setEditDialogOpen(false)}
                className="p-2 hover:bg-[#FFFFFF]/10 transition-colors"
              >
                <X size={24} className="text-[#FFFFFF]" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Form fields based on section type */}
              {activeSection === 'journey' && (
                <>
                  {/* Title */}
                  <input
                    type="text"
                    placeholder="Title"
                    value={currentItem.title || ''}
                    onChange={(e) => setCurrentItem({ ...currentItem, title: e.target.value })}
                    className="w-full px-4 py-3 mb-3 border-2 border-[#000000]/20 focus:border-[#000000] outline-none rounded-md"
                  />
                  {/* Description */}
                  <textarea
                    placeholder="Description"
                    value={currentItem.description || ''}
                    onChange={(e) =>
                      setCurrentItem({ ...currentItem, description: e.target.value })
                    }
                    rows={4}
                    className="w-full px-4 py-3 mb-3 border-2 border-[#000000]/20 focus:border-[#000000] outline-none rounded-md"
                  />
                  {/* Period */}
                  <input
                    type="text"
                    placeholder="Period (e.g., 2020-2023)"
                    value={currentItem.period || ''}
                    onChange={(e) => setCurrentItem({ ...currentItem, period: e.target.value })}
                    className="w-full sm:w-2/3 px-4 py-3 mb-3 border-2 border-[#000000]/20 focus:border-[#000000] outline-none rounded-md"
                  />
                  {/* Tags */}
                  <div className="mb-3">
                    <label className="block text-sm font-bold mb-2 text-[#000000]">Tags</label>
                    <div className="flex flex-col sm:flex-row gap-2 mb-2">
                      <input
                        type="text"
                        value={arrayInput}
                        onChange={(e) => setArrayInput(e.target.value)}
                        onKeyPress={(e) =>
                          e.key === 'Enter' && (e.preventDefault(), addArrayItem('tags'))
                        }
                        className="flex-1 px-4 py-2 border-2 border-[#000000]/20 focus:border-[#000000] outline-none rounded-md"
                        placeholder="Add tag and press Enter"
                      />
                      <button
                        type="button"
                        onClick={() => addArrayItem('tags')}
                        className="px-4 py-2 bg-[#000000] text-[#FFFFFF] font-bold hover:bg-[#1A1A1A] rounded-md flex items-center justify-center"
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {(currentItem.tags || []).map((tag: string, i: number) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-[#D9D2C9] text-[#000000] text-sm flex items-center gap-2 rounded-md"
                        >
                          {tag}
                          <X
                            size={14}
                            className="cursor-pointer hover:text-red-600"
                            onClick={() => removeArrayItem('tags', tag)}
                          />
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              )}


              {activeSection === 'expertise' && (
                <>
                  {/* Title */}
                  <input
                    type="text"
                    placeholder="Title"
                    value={currentItem.title || ''}
                    onChange={(e) => setCurrentItem({ ...currentItem, title: e.target.value })}
                    className="w-full px-4 py-3 mb-3 border-2 border-[#000000]/20 focus:border-[#000000] outline-none rounded-md"
                  />

                  {/* Description */}
                  <textarea
                    placeholder="Description"
                    value={currentItem.description || ''}
                    onChange={(e) =>
                      setCurrentItem({ ...currentItem, description: e.target.value })
                    }
                    rows={4}
                    className="w-full px-4 py-3 mb-3 border-2 border-[#000000]/20 focus:border-[#000000] outline-none rounded-md"
                  />

                  {/* Image Upload */}
                  <div className="mb-3">
                    <label className="block text-sm font-bold mb-2 text-[#000000]">Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        if (!e.target.files || !e.target.files[0]) return;

                        const file = e.target.files[0];
                        const loadingToast = toast.loading("Uploading image...");

                        try {
                          // Agar purani image hai to delete karo (edit case)
                          if (currentItem.image && currentItem.imagePublicId) {
                            await deleteFromCloudinary(currentItem.imagePublicId);
                          }

                          // Nayi image upload karo
                          const { url, publicId } = await uploadToCloudinary(file);

                          setCurrentItem({
                            ...currentItem,
                            image: url,
                            imagePublicId: publicId
                          });

                          toast.success("Image uploaded successfully!", { id: loadingToast });
                        } catch (err) {
                          console.error(err);
                          toast.error("Image upload failed!", { id: loadingToast });
                        }
                      }}
                      className="w-full px-4 py-2 border-2 border-[#000000]/20 focus:border-[#000000] outline-none rounded-md"
                    />

                          {(currentItem.image || currentItem.imageUrl || currentItem.image_url || currentItem.img) && (
                      <div className="mt-2 relative inline-block">
                        <img
                          src={
                            currentItem.image ||
                            currentItem.imageUrl ||
                            currentItem.image_url ||
                            currentItem.img ||
                            ''
                          }
                          alt="Uploaded"
                          className="w-32 h-32 object-cover rounded-md border"
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
                              setCurrentItem({
                                ...currentItem,
                                image: '',
                                imagePublicId: ''
                              });
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
              {activeSection === 'academic' && (
                <>
                  <input
                    type="text"
                    placeholder="Degree/Qualification Title"
                    value={currentItem.title || ''}
                    onChange={(e) => setCurrentItem({ ...currentItem, title: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-[#000000]/20 focus:border-[#000000] outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Institution Name"
                    value={currentItem.institutionName
                    }
                    onChange={(e) => setCurrentItem({ ...currentItem, institutionName: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-[#000000]/20 focus:border-[#000000] outline-none"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold mb-2 text-[#000000]">Start Date</label>
                      <input
                        type="date"
                        value={currentItem.startDate ? new Date(currentItem.startDate).toISOString().split('T')[0] : ''}
                        onChange={(e) => setCurrentItem({ ...currentItem, startDate: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-[#000000]/20 focus:border-[#000000] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-2 text-[#000000]">End Date</label>
                      <input
                        type="date"
                        value={currentItem.endDate ? new Date(currentItem.endDate).toISOString().split('T')[0] : ''}
                        onChange={(e) => setCurrentItem({ ...currentItem, endDate: e.target.value })}
                        disabled={currentItem.isCurrent}
                        className="w-full px-4 py-3 border-2 border-[#000000]/20 focus:border-[#000000] outline-none disabled:bg-gray-100"
                      />
                    </div>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={currentItem.isCurrent || false}
                      onChange={(e) => setCurrentItem({ ...currentItem, isCurrent: e.target.checked, endDate: e.target.checked ? null : currentItem.endDate })}
                      className="w-5 h-5"
                    />
                    <span className="text-[#000000] font-bold">Currently Pursuing</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Location"
                    value={currentItem.location || ''}
                    onChange={(e) => setCurrentItem({ ...currentItem, location: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-[#000000]/20 focus:border-[#000000] outline-none"
                  />
                  <textarea
                    placeholder="Description (Optional)"
                    value={currentItem.description || ''}
                    onChange={(e) => setCurrentItem({ ...currentItem, description: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-[#000000]/20 focus:border-[#000000] outline-none"
                  />
                </>
              )}

              {activeSection === 'professional' && (
                <>
                  <input
                    type="text"
                    placeholder="Job Title/Position"
                    value={currentItem.title || ''}
                    onChange={(e) => setCurrentItem({ ...currentItem, title: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-[#000000]/20 focus:border-[#000000] outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Institution / Organization Name"
                    value={currentItem.institutionName ?? ''}
                    onChange={(e) => setCurrentItem({ ...currentItem, institutionName: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-[#000000]/20 focus:border-[#000000] outline-none"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold mb-2 text-[#000000]">Start Date</label>
                      <input
                        type="date"
                        value={currentItem.startDate ? new Date(currentItem.startDate).toISOString().split('T')[0] : ''}
                        onChange={(e) => setCurrentItem({ ...currentItem, startDate: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-[#000000]/20 focus:border-[#000000] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-2 text-[#000000]">End Date</label>
                      <input
                        type="date"
                        value={currentItem.endDate ? new Date(currentItem.endDate).toISOString().split('T')[0] : ''}
                        onChange={(e) => setCurrentItem({ ...currentItem, endDate: e.target.value })}
                        disabled={currentItem.isCurrent}
                        className="w-full px-4 py-3 border-2 border-[#000000]/20 focus:border-[#000000] outline-none disabled:bg-gray-100"
                      />
                    </div>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={currentItem.isCurrent || false}
                      onChange={(e) => setCurrentItem({ ...currentItem, isCurrent: e.target.checked, endDate: e.target.checked ? null : currentItem.endDate })}
                      className="w-5 h-5"
                    />
                    <span className="text-[#000000] font-bold">Currently Working Here</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Location"
                    value={currentItem.location || ''}
                    onChange={(e) => setCurrentItem({ ...currentItem, location: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-[#000000]/20 focus:border-[#000000] outline-none"
                  />
                  <textarea
                    placeholder="Description (Optional)"
                    value={currentItem.description || ''}
                    onChange={(e) => setCurrentItem({ ...currentItem, description: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-[#000000]/20 focus:border-[#000000] outline-none"
                  />
                  <input
                    type="number"
                    placeholder="Order"
                    value={currentItem.order || 0}
                    onChange={(e) => setCurrentItem({ ...currentItem, order: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 border-2 border-[#000000]/20 focus:border-[#000000] outline-none"
                  />
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={currentItem.isActive || false}
                      onChange={(e) => setCurrentItem({ ...currentItem, isActive: e.target.checked })}
                      className="w-5 h-5"
                    />
                    <span className="text-[#000000] font-bold">Active</span>
                  </label>
                </>
              )}

              {activeSection === 'competency' && (
                <>
                  <input
                    type="text"
                    placeholder="Skill Name"
                    value={currentItem.skillName || ''}
                    onChange={(e) => setCurrentItem({ ...currentItem, skillName: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-[#000000]/20 focus:border-[#000000] outline-none"
                  />
                  <input
                    type="url"
                    placeholder="Skill Image URL (Optional)"
                    value={currentItem.skillImage || ''}
                    onChange={(e) => setCurrentItem({ ...currentItem, skillImage: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-[#000000]/20 focus:border-[#000000] outline-none"
                  />
                  {currentItem.skillImage && (
                    <div className="w-16 h-16 overflow-hidden rounded-full border-2 border-[#000000]">
                      <img
                        src={currentItem.skillImage}
                        alt="Skill preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <textarea
                    placeholder="Description (Optional)"
                    value={currentItem.description || ''}
                    onChange={(e) => setCurrentItem({ ...currentItem, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-[#000000]/20 focus:border-[#000000] outline-none"
                  />
                  <div>
                    <label className="block text-sm font-bold mb-2 text-[#000000]">
                      Proficiency Level: {currentItem.proficiencyLevel || 0}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={currentItem.proficiencyLevel || 0}
                      onChange={(e) => setCurrentItem({ ...currentItem, proficiencyLevel: parseInt(e.target.value) })}
                      className="w-full h-2 bg-[#D9D2C9] rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-[#000000]/60 mt-1">
                      <span>Beginner</span>
                      <span>Intermediate</span>
                      <span>Expert</span>
                    </div>
                  </div>
                  <input
                    type="number"
                    placeholder="Order"
                    value={currentItem.order || 0}
                    onChange={(e) => setCurrentItem({ ...currentItem, order: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 border-2 border-[#000000]/20 focus:border-[#000000] outline-none"
                  />
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={currentItem.isActive || false}
                      onChange={(e) => setCurrentItem({ ...currentItem, isActive: e.target.checked })}
                      className="w-5 h-5"
                    />
                    <span className="text-[#000000] font-bold">Active</span>
                  </label>
                </>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-6 border-t-4 border-[#000000]">
                <button
                  onClick={() => setEditDialogOpen(false)}
                  className="flex-1 px-6 py-3 bg-[#D9D2C9] hover:bg-[#B7AEA3] text-[#000000] font-bold transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 px-6 py-3 bg-[#000000] hover:bg-[#1A1A1A] text-[#FFFFFF] font-bold transition-all flex items-center justify-center gap-2"
                >
                  <Save size={18} />
                  Save
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="bg-[#FFFFFF] border-4 border-[#000000]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[#000000] font-black">
              Confirm Deletion
            </AlertDialogTitle>
            <AlertDialogDescription className="text-[#000000]/70">
              Are you sure you want to delete this item? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-[#D9D2C9] text-[#000000] hover:bg-[#B7AEA3] px-4 py-2 rounded-md">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-[#000000] text-[#FFFFFF] hover:bg-[#1A1A1A] px-4 py-2 rounded-md"
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