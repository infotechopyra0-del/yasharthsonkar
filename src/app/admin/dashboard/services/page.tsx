'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Plus, Edit, Trash2, Save, X, RefreshCw, Sparkles,
  BarChart3, Zap, Image, Upload, Loader2
} from 'lucide-react';
import { toast } from 'sonner';
import { uploadToCloudinary, deleteFromCloudinary } from '@/lib/cloudinary';

interface Service {
  _id?: string;
  name: string;
  description: string;
  serviceImage?: string;
  serviceImagePublicId?: string;
  gradientStartColor?: string;
  gradientEndColor?: string;
  features?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export default function ServicesAdminPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentService, setCurrentService] = useState<Service>({
    name: '',
    description: '',
    features: [],
    gradientStartColor: '#1A1A1A',
    gradientEndColor: '#B7AEA3'
  });
  const [featureInput, setFeatureInput] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/services');
      if (!res.ok) throw new Error('Failed to fetch services');
      const data = await res.json();
      setServices(data.services || []);
    } catch (error) {
      console.error('Error fetching services:', error);
      toast.error('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  // using shared cloudinary helpers from src/lib/cloudinary.ts

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      // Delete old image if exists
      if (currentService.serviceImagePublicId) {
        await deleteFromCloudinary(currentService.serviceImagePublicId);
      }

      // Upload new image
      const { url, publicId } = await uploadToCloudinary(file);
      setCurrentService({
        ...currentService,
        serviceImage: url,
        serviceImagePublicId: publicId
      });
      toast.success('Image uploaded successfully!');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    try {
      const isEdit = !!currentService._id;
      const url = isEdit
        ? `/api/admin/services/${currentService._id}`
        : '/api/admin/services';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentService)
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.error);

      toast.success(isEdit ? 'Service updated successfully! ✅' : 'Service created successfully! 🎉');
      setEditDialogOpen(false);
      fetchServices();
    } catch (error: any) {
      console.error('Save error:', error);
      toast.error(error.message || 'Failed to save service');
    }
  };

  const handleDelete = async (serviceId: string) => {
    setDeleteId(serviceId);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;

    try {
      const serviceToDelete = services.find(s => s._id === deleteId);
      
      // Delete image from Cloudinary if exists
      if (serviceToDelete?.serviceImagePublicId) {
        await deleteFromCloudinary(serviceToDelete.serviceImagePublicId);
      }

      const res = await fetch(`/api/admin/services/${deleteId}`, {
        method: 'DELETE'
      });

      if (!res.ok) throw new Error('Failed to delete');

      toast.success('Service deleted successfully! 🗑️');
      fetchServices();
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete service');
    } finally {
      setDeleteId(null);
      setIsDeleteDialogOpen(false);
    }
  };

  const addFeature = () => {
    if (!featureInput.trim()) return;
    setCurrentService({
      ...currentService,
      features: [...(currentService.features || []), featureInput.trim()]
    });
    setFeatureInput('');
  };

  const removeFeature = (feature: string) => {
    setCurrentService({
      ...currentService,
      features: (currentService.features || []).filter(f => f !== feature)
    });
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
                Services
                <Sparkles className="text-[#B7AEA3]" size={24} />
              </h1>
              <p className="text-[#FFFFFF]/70 font-semibold mt-1 text-sm sm:text-base">
                Manage your service offerings
              </p>
            </motion.div>
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              onClick={fetchServices}
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
                  All Services
                </h2>
                <p className="text-[#000000]/60 font-semibold text-xs sm:text-sm">
                  Create and manage services
                </p>
              </div>
            </div>
            <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
              <div className="inline-flex items-center gap-1 sm:gap-2 bg-[#D9D2C9] px-3 sm:px-4 py-2 rounded-xl sm:rounded-2xl flex-1 sm:flex-initial justify-center">
                <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-[#000000]" />
                <span className="text-[#000000] font-bold text-xs sm:text-sm">
                  {services.length} Services
                </span>
              </div>
              <button
                onClick={() => {
                  setCurrentService({
                    name: '',
                    description: '',
                    features: [],
                    gradientStartColor: '#1A1A1A',
                    gradientEndColor: '#B7AEA3'
                  });
                  setEditDialogOpen(true);
                }}
                className="flex items-center justify-center gap-1 sm:gap-2 bg-[#000000] hover:bg-[#1A1A1A] text-[#FFFFFF] px-4 sm:px-6 py-2 sm:py-3 font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 rounded-xl sm:rounded-2xl text-xs sm:text-sm flex-1 sm:flex-initial"
              >
                <Plus size={16} />
                <span className="hidden sm:inline">Add Service</span>
                <span className="sm:hidden">Add</span>
              </button>
            </div>
          </div>

          {/* Services List */}
          {loading ? (
            <div className="text-center py-8 sm:py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-4 border-[#000000] border-t-transparent"></div>
              <p className="mt-4 text-[#000000] font-bold text-sm sm:text-base">Loading services...</p>
            </div>
          ) : services.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <Image className="w-16 h-16 mx-auto mb-4 text-[#000000]/30" />
              <p className="text-lg sm:text-xl font-black text-[#000000]">No services found</p>
              <p className="text-[#000000]/60 text-sm sm:text-base">Click "Add Service" to create your first service</p>
            </div>
          ) : (
            <div className="grid gap-3 sm:gap-4">
              {services.map((service, index) => (
                <motion.div
                  key={service._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  className="p-4 sm:p-6 bg-[#D9D2C9] hover:bg-[#B7AEA3] transition-colors duration-200 border-2 border-[#000000]/10 rounded-xl sm:rounded-2xl"
                >
                  <div className="flex flex-col sm:flex-row items-start gap-4">
                    {/* Service Image */}
                    {service.serviceImage && (
                      <div className="w-full sm:w-32 h-32 shrink-0 overflow-hidden rounded-lg border-2 border-[#000000]">
                        <img
                          src={service.serviceImage}
                          alt={service.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    
                    {/* Service Content */}
                    <div className="flex-1 min-w-0 w-full">
                      <h3 className="text-lg sm:text-xl font-black text-[#000000] mb-2 wrap-break-words">
                        {service.name}
                      </h3>
                      <p className="text-[#000000]/70 mb-3 text-sm sm:text-base line-clamp-2">
                        {service.description}
                      </p>
                      
                      {/* Features */}
                      {service.features && service.features.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {service.features.slice(0, 3).map((feature, i) => (
                            <span
                              key={i}
                              className="px-2 sm:px-3 py-1 bg-[#000000] text-[#FFFFFF] text-xs font-bold rounded"
                            >
                              {feature}
                            </span>
                          ))}
                          {service.features.length > 3 && (
                            <span className="px-2 sm:px-3 py-1 bg-[#000000]/50 text-[#FFFFFF] text-xs font-bold rounded">
                              +{service.features.length - 3} more
                            </span>
                          )}
                        </div>
                      )}

                      {/* Gradient Colors */}
                      {service.gradientStartColor && service.gradientEndColor && (
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xs text-[#000000]/60">Gradient:</span>
                          <div className="flex gap-1">
                            <div
                              className="w-6 h-6 rounded border border-[#000000]"
                              style={{ backgroundColor: service.gradientStartColor }}
                            />
                            <div
                              className="w-6 h-6 rounded border border-[#000000]"
                              style={{ backgroundColor: service.gradientEndColor }}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex sm:flex-col gap-2 w-full sm:w-auto">
                      <button
                        onClick={() => {
                          setCurrentService(service);
                          setEditDialogOpen(true);
                        }}
                        className="flex-1 sm:flex-initial p-2 bg-[#000000] hover:bg-[#1A1A1A] text-[#FFFFFF] transition-all flex items-center justify-center rounded"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(service._id!)}
                        className="flex-1 sm:flex-initial p-2 bg-[#000000] hover:bg-red-600 text-[#FFFFFF] transition-all flex items-center justify-center rounded"
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
                {currentService._id ? 'Edit Service' : 'Add New Service'}
              </h2>
              <button
                onClick={() => setEditDialogOpen(false)}
                className="p-2 hover:bg-[#FFFFFF]/10 transition-colors rounded"
              >
                <X size={20} className="text-[#FFFFFF]" />
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-4">
              {/* Service Name */}
              <div>
                <label className="block text-sm font-bold mb-2 text-[#000000]">
                  Service Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g., Web Development"
                  value={currentService.name}
                  onChange={(e) => setCurrentService({ ...currentService, name: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-[#000000]/20 focus:border-[#000000] outline-none rounded-md"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-bold mb-2 text-[#000000]">
                  Description *
                </label>
                <textarea
                  placeholder="Describe your service..."
                  value={currentService.description}
                  onChange={(e) => setCurrentService({ ...currentService, description: e.target.value })}
                  rows={4}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-[#000000]/20 focus:border-[#000000] outline-none rounded-md"
                />
              </div>

              {/* Service Image Upload */}
              <div>
                <label className="block text-sm font-bold mb-2 text-[#000000]">
                  Service Image
                </label>
                <div className="space-y-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-[#000000]/20 bg-white outline-none cursor-pointer rounded-md disabled:opacity-50"
                  />
                  
                  {uploading && (
                    <div className="flex items-center gap-2 text-[#000000]">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-sm">Uploading to Cloudinary...</span>
                    </div>
                  )}

                  {currentService.serviceImage && (
                    <div className="relative inline-block">
                      <img
                        src={currentService.serviceImage}
                        alt="Service preview"
                        className="w-full max-w-xs h-48 object-cover rounded-md border-2 border-[#000000]"
                      />
                      <button
                        onClick={async () => {
                          if (confirm('Remove this image?')) {
                            if (currentService.serviceImagePublicId) {
                              await deleteFromCloudinary(currentService.serviceImagePublicId);
                            }
                            setCurrentService({
                              ...currentService,
                              serviceImage: '',
                              serviceImagePublicId: ''
                            });
                          }
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 font-bold"
                      >
                        ×
                      </button>
                    </div>
                  )}
                </div>
              </div>

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
                  disabled={!currentService.name || !currentService.description}
                  className="w-full sm:flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-[#000000] hover:bg-[#1A1A1A] text-[#FFFFFF] font-bold transition-all flex items-center justify-center gap-2 rounded-xl sm:rounded-2xl text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save size={18} />
                  Save Service
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {isDeleteDialogOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#FFFFFF] border-2 sm:border-4 border-[#000000] w-full max-w-md rounded-xl sm:rounded-2xl p-6"
          >
            <h3 className="text-xl font-black text-[#000000] mb-4">
              Confirm Deletion
            </h3>
            <p className="text-[#000000]/70 mb-6">
              Are you sure you want to delete this service? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setIsDeleteDialogOpen(false)}
                className="flex-1 px-4 py-2 bg-[#D9D2C9] hover:bg-[#B7AEA3] text-[#000000] font-bold rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-[#FFFFFF] font-bold rounded-md"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}