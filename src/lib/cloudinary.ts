import axios from "axios";

export const uploadToCloudinary = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    // Request a server-side signature for signed upload
    const sigRes = await fetch('/api/cloudinary/signature', { method: 'POST' });
    if (!sigRes.ok) {
      const text = await sigRes.text().catch(() => '');
      throw new Error(`Failed to get Cloudinary signature: ${sigRes.status} ${text}`);
    }

    const { signature, timestamp, apiKey } = await sigRes.json();
    if (!signature || !timestamp || !apiKey) {
      throw new Error('Invalid signature response from server');
    }
    formData.append('api_key', apiKey);
    formData.append('timestamp', String(timestamp));
    formData.append('signature', signature);

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData
    );

    return {
      url: response.data.secure_url,
      publicId: response.data.public_id
    };
  } catch (err: any) {
    if (err?.response) {
      throw new Error(`Cloudinary upload error: ${err.response?.data?.error?.message || JSON.stringify(err.response.data)}`);
    }
    throw err;
  }
};

export const deleteFromCloudinary = async (publicId: string) => {
  try {
    await axios.delete('/api/cloudinary/delete', {
      data: { publicId }
    });
    return true;
  } catch (error) {
    return false;
  }
};

export const getPublicIdFromUrl = (url: string): string => {
  const parts = url.split('/');
  const filename = parts[parts.length - 1];
  return filename.split('.')[0];
};