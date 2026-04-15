const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || ''
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || ''

export const isCloudinaryConfigured = Boolean(cloudName && uploadPreset)

export interface UploadResult {
  secure_url: string
  public_id: string
  resource_type: string
  format: string
  width: number
  height: number
  duration?: number
}

export async function uploadToCloudinary(file: File): Promise<UploadResult> {
  if (!isCloudinaryConfigured) {
    throw new Error('Cloudinary is not configured')
  }

  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', uploadPreset)

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
    {
      method: 'POST',
      body: formData,
    }
  )

  if (!response.ok) {
    throw new Error('Upload failed')
  }

  return response.json()
}

export function getPreviewUrl(url: string, options: { width?: number; height?: number; blur?: boolean } = {}): string {
  if (!url.includes('cloudinary.com')) return url

  const { width = 400, height = 400, blur = false } = options
  const transforms = [`w_${width}`, `h_${height}`, 'c_fill', 'q_auto', 'f_auto']
  
  if (blur) {
    transforms.push('e_blur:1000')
  }

  // Insert transforms into cloudinary URL
  const parts = url.split('/upload/')
  if (parts.length === 2) {
    return `${parts[0]}/upload/${transforms.join(',')}/${parts[1]}`
  }

  return url
}

export function getVideoPreview(url: string): string {
  if (!url.includes('cloudinary.com')) return url

  // Convert video URL to preview (first 5 seconds, low quality)
  const parts = url.split('/upload/')
  if (parts.length === 2) {
    return `${parts[0]}/upload/so_0,eo_5,w_400,h_400,c_fill,q_auto/${parts[1]}`
  }

  return url
}

export function getThumbnail(url: string): string {
  if (!url.includes('cloudinary.com')) return url

  // Get video thumbnail
  const parts = url.split('/upload/')
  if (parts.length === 2) {
    const videoPath = parts[1].replace(/\.[^.]+$/, '.jpg')
    return `${parts[0]}/upload/w_400,h_400,c_fill,q_auto,so_0/${videoPath}`
  }

  return url
}
