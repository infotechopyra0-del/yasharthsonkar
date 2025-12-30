'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Mail, Phone, MapPin, MessageCircle, Plus, Edit, Trash2, Save, X,
  RefreshCw, Sparkles, BarChart3, Zap, Link2,
  Github, Linkedin, Instagram, Globe, Check, Clock
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

type SectionType = 'contact-info' | 'social-links' | 'messages' | 'faq';

export default function ContactAdminPage() {
  const [activeSection, setActiveSection] = useState<SectionType>('contact-info');
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<any>({});
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const sections = [
    { id: 'contact-info', label: 'Contact Info', icon: Phone, endpoint: 'contact-info' },
    { id: 'social-links', label: 'Social Links', icon: Link2, endpoint: 'social-links' },
    { id: 'messages', label: 'Messages', icon: MessageCircle, endpoint: 'messages' },
    { id: 'faq', label: 'FAQ', icon: Globe, endpoint: 'faq' },
  ];

  useEffect(() => {
    fetchItems();
  }, [activeSection]);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const section = sections.find(s => s.id === activeSection);
      const res = await fetch(`/api/admin/contact/${section?.endpoint}`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setItems(data);
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
        ? `/api/admin/contact/${section?.endpoint}/${currentItem._id}`
        : `/api/admin/contact/${section?.endpoint}`;
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
      const res = await fetch(`/api/admin/contact/${section?.endpoint}/${deleteId}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const text = await res.text();
        let parsed: any = null;
        try {
          parsed = JSON.parse(text);
        } catch (e) {
          parsed = text || null;
        }

        const contentType = res.headers.get('content-type');
        console.error('Delete failed', { status: res.status, statusText: res.statusText, contentType, body: parsed });

        const errorMessage = (typeof parsed === 'object' && parsed)?.error
          || (typeof parsed === 'object' && parsed)?.message
          || (typeof parsed === 'string' && parsed)
          || `Status ${res.status}`;

        toast.error(`Delete failed: ${errorMessage}`, { id: loadingToast });
        return;
      }

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

  const markMessageAsRead = async (messageId: string) => {
    try {
      const res = await fetch(`/api/admin/contact/messages/${messageId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isRead: true }),
      });

      if (!res.ok) throw new Error('Failed to update');
      toast.success('Marked as read! ✅');
      fetchItems();
    } catch (error) {
      toast.error('Failed to update');
    }
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
                Contact Page
                <Sparkles className="text-[#B7AEA3]" size={24} />
              </h1>
              <p className="text-[#FFFFFF]/70 font-semibold mt-1 text-sm sm:text-base">
                Manage contact information and messages
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
        {/* Section Tabs */}
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

        {/* Content Section */}
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
              {activeSection !== 'messages' && (
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
              )}
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
              <p className="text-[#000000]/60 text-sm sm:text-base">
                {activeSection === 'messages' ? 'No messages received yet' : 'Click "Add New" to create one'}
              </p>
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
                      {/* Contact Info */}
                      {activeSection === 'contact-info' && (
                        <>
                          <div className="flex items-center gap-2 mb-2">
                            {item.type === 'email' && <Mail className="w-5 h-5" />}
                            {item.type === 'phone' && <Phone className="w-5 h-5" />}
                            {item.type === 'location' && <MapPin className="w-5 h-5" />}
                            {item.type === 'whatsapp' && <MessageCircle className="w-5 h-5" />}
                            <h3 className="text-lg sm:text-xl font-black text-[#000000]">
                              {item.label}
                            </h3>
                          </div>
                          <p className="text-[#000000]/70 text-sm sm:text-base">{item.value}</p>
                        </>
                      )}

                      {/* Social Links */}
                      {activeSection === 'social-links' && (
                        <>
                          <div className="flex items-center gap-2 mb-2">
                            {item.platform === 'github' && <Github className="w-5 h-5" />}
                            {item.platform === 'linkedin' && <Linkedin className="w-5 h-5" />}
                            {item.platform === 'instagram' && <Instagram className="w-5 h-5" />}
                            <h3 className="text-lg sm:text-xl font-black text-[#000000] capitalize">
                              {item.platform}
                            </h3>
                          </div>
                          <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-[#000000]/70 text-sm sm:text-base hover:underline break-all">
                            {item.url}
                          </a>
                        </>
                      )}

                      {/* Messages */}
                      {activeSection === 'messages' && (
                        <>
                          <div className="flex items-start justify-between gap-2 mb-3">
                            <div className="flex-1">
                              <h3 className="text-lg sm:text-xl font-black text-[#000000] mb-1">
                                {item.name}
                              </h3>
                              <p className="text-[#000000]/70 text-sm">{item.email}</p>
                            </div>
                            {item.isRead ? (
                              <span className="flex items-center gap-1 text-green-600 text-xs bg-green-100 px-2 py-1 rounded">
                                <Check size={14} /> Read
                              </span>
                            ) : (
                              <span className="flex items-center gap-1 text-orange-600 text-xs bg-orange-100 px-2 py-1 rounded">
                                <Clock size={14} /> Unread
                              </span>
                            )}
                          </div>
                          <p className="text-[#000000]/80 text-sm sm:text-base mb-2 line-clamp-2">
                            {item.message}
                          </p>
                          <p className="text-[#000000]/50 text-xs">
                            {new Date(item.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </>
                      )}

                      {/* FAQ */}
                      {activeSection === 'faq' && (
                        <>
                          <h3 className="text-lg sm:text-xl font-black text-[#000000] mb-2">
                            {item.question}
                          </h3>
                          <p className="text-[#000000]/70 text-sm sm:text-base line-clamp-2">
                            {item.answer}
                          </p>
                        </>
                      )}
                    </div>

                    <div className="flex sm:flex-col gap-2 w-full sm:w-auto">
                      {activeSection === 'messages' && !item.isRead && (
                        <button
                          onClick={() => markMessageAsRead(item._id)}
                          className="flex-1 sm:flex-initial p-2 bg-green-600 hover:bg-green-700 text-[#FFFFFF] transition-all flex items-center justify-center"
                          title="Mark as read"
                        >
                          <Check size={16} />
                        </button>
                      )}
                      {activeSection !== 'messages' && (
                        <button
                          onClick={() => {
                            setCurrentItem(item);
                            setEditDialogOpen(true);
                          }}
                          className="flex-1 sm:flex-initial p-2 bg-[#000000] hover:bg-[#1A1A1A] text-[#FFFFFF] transition-all flex items-center justify-center"
                        >
                          <Edit size={16} />
                        </button>
                      )}
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

      {/* Edit Dialog */}
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
              {/* Contact Info Form */}
              {activeSection === 'contact-info' && (
                <>
                  <div>
                    <label className="block text-sm font-bold mb-2 text-[#000000]">Type</label>
                    <select
                      value={currentItem.type || ''}
                      onChange={(e) => setCurrentItem({ ...currentItem, type: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-[#000000]/20 focus:border-[#000000] outline-none rounded-md"
                    >
                      <option value="">Select type</option>
                      <option value="email">Email</option>
                      <option value="phone">Phone</option>
                      <option value="location">Location</option>
                      <option value="whatsapp">WhatsApp</option>
                    </select>
                  </div>
                  <input
                    type="text"
                    placeholder="Label (e.g., Email, Phone)"
                    value={currentItem.label || ''}
                    onChange={(e) => setCurrentItem({ ...currentItem, label: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-[#000000]/20 focus:border-[#000000] outline-none rounded-md"
                  />
                  <input
                    type="text"
                    placeholder="Value (e.g., hello@example.com, +1234567890)"
                    value={currentItem.value || ''}
                    onChange={(e) => setCurrentItem({ ...currentItem, value: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-[#000000]/20 focus:border-[#000000] outline-none rounded-md"
                  />
                </>
              )}

              {/* Social Links Form */}
              {activeSection === 'social-links' && (
                <>
                  <div>
                    <label className="block text-sm font-bold mb-2 text-[#000000]">Platform</label>
                    <select
                      value={currentItem.platform || ''}
                      onChange={(e) => setCurrentItem({ ...currentItem, platform: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-[#000000]/20 focus:border-[#000000] outline-none rounded-md"
                    >
                      <option value="">Select platform</option>
                      <option value="github">GitHub</option>
                      <option value="linkedin">LinkedIn</option>
                      <option value="instagram">Instagram</option>
                      <option value="twitter">Twitter</option>
                      <option value="facebook">Facebook</option>
                    </select>
                  </div>
                  <input
                    type="url"
                    placeholder="URL (e.g., https://github.com/username)"
                    value={currentItem.url || ''}
                    onChange={(e) => setCurrentItem({ ...currentItem, url: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-[#000000]/20 focus:border-[#000000] outline-none rounded-md"
                  />
                </>
              )}

              {/* FAQ Form */}
              {activeSection === 'faq' && (
                <>
                  <input
                    type="text"
                    placeholder="Question"
                    value={currentItem.question || ''}
                    onChange={(e) => setCurrentItem({ ...currentItem, question: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-[#000000]/20 focus:border-[#000000] outline-none rounded-md"
                  />
                  <textarea
                    placeholder="Answer"
                    value={currentItem.answer || ''}
                    onChange={(e) => setCurrentItem({ ...currentItem, answer: e.target.value })}
                    rows={6}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-[#000000]/20 focus:border-[#000000] outline-none rounded-md"
                  />
                </>
              )}

              {/* Action Buttons */}
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

      {/* Delete Dialog */}
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