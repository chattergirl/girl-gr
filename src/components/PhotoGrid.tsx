import { useState, useRef } from 'react'
import { Plus, X, Loader2, Play, Lock, Trash2 } from 'lucide-react'
import { uploadToCloudinary, isCloudinaryConfigured, getPreviewUrl } from '../lib/cloudinary'
import type { Content } from '../types'

interface PhotoGridProps {
  items: Content[]
  onItemClick?: (item: Content) => void
  onUpload?: (file: File) => Promise<void>
  isOwner?: boolean
  showUploadButton?: boolean
}

export function PhotoGrid({ 
  items, 
  onItemClick, 
  onUpload,
  isOwner = false,
  showUploadButton = false,
}: PhotoGridProps) {
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !onUpload) return

    setUploading(true)
    setUploadProgress(0)

    // Simulate progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => Math.min(prev + 10, 90))
    }, 200)

    try {
      await onUpload(file)
      setUploadProgress(100)
    } finally {
      clearInterval(progressInterval)
      setTimeout(() => {
        setUploading(false)
        setUploadProgress(0)
      }, 500)
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="grid grid-cols-3 gap-0.5">
      {/* Upload Button */}
      {showUploadButton && isOwner && (
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="aspect-square bg-card border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 hover:border-primary/50 transition-colors disabled:opacity-50"
        >
          {uploading ? (
            <>
              <Loader2 className="w-6 h-6 text-primary animate-spin" />
              <span className="text-xs text-muted-foreground">{uploadProgress}%</span>
            </>
          ) : (
            <>
              <Plus className="w-6 h-6 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Add</span>
            </>
          )}
        </button>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Grid Items */}
      {items.map((item) => (
        <GridItem 
          key={item.id} 
          item={item} 
          onClick={() => onItemClick?.(item)}
          isOwner={isOwner}
        />
      ))}
    </div>
  )
}

interface GridItemProps {
  item: Content
  onClick?: () => void
  isOwner?: boolean
}

function GridItem({ item, onClick, isOwner }: GridItemProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  const isLocked = !item.is_free
  const hasMedia = item.media_url || item.thumbnail_url

  // Get optimized preview URL
  const previewUrl = item.thumbnail_url 
    ? getPreviewUrl(item.thumbnail_url, { width: 300, height: 300 })
    : item.media_url 
      ? getPreviewUrl(item.media_url, { width: 300, height: 300 })
      : null

  return (
    <button
      onClick={onClick}
      className="relative aspect-square bg-card overflow-hidden group"
    >
      {/* Background/Placeholder */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/10" />

      {/* Image */}
      {hasMedia && previewUrl && !imageError && (
        <img
          src={previewUrl}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
        />
      )}

      {/* Loading state */}
      {hasMedia && !imageLoaded && !imageError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="w-6 h-6 text-muted-foreground animate-spin" />
        </div>
      )}

      {/* Video indicator */}
      {item.media_type === 'video' && (
        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/50 flex items-center justify-center">
          <Play className="w-3 h-3 text-white" />
        </div>
      )}

      {/* Lock indicator */}
      {isLocked && !isOwner && (
        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/50 flex items-center justify-center">
          <Lock className="w-3 h-3 text-white" />
        </div>
      )}

      {/* Price tag */}
      {isLocked && (
        <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/60 rounded text-xs text-white font-medium">
          ${item.price}
        </div>
      )}

      {/* Free badge */}
      {item.is_free && (
        <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-green-500/90 rounded text-xs text-white font-medium">
          FREE
        </div>
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
        <div className="flex items-center gap-4 text-white text-sm">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            {item.likes_count}
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            {item.views_count}
          </span>
        </div>
      </div>

      {/* Owner controls */}
      {isOwner && (
        <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={(e) => {
              e.stopPropagation()
              // Handle delete
            }}
            className="w-6 h-6 rounded-full bg-destructive/80 flex items-center justify-center text-white"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      )}
    </button>
  )
}

// Multi-select photo grid for uploads
interface MultiPhotoUploadProps {
  onFilesSelected: (files: File[]) => void
  maxFiles?: number
}

export function MultiPhotoUpload({ onFilesSelected, maxFiles = 10 }: MultiPhotoUploadProps) {
  const [selectedFiles, setSelectedFiles] = useState<{ file: File; preview: string }[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    const newFiles = files.slice(0, maxFiles - selectedFiles.length).map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }))

    setSelectedFiles(prev => [...prev, ...newFiles])
    onFilesSelected([...selectedFiles.map(f => f.file), ...newFiles.map(f => f.file)])

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const removeFile = (index: number) => {
    setSelectedFiles(prev => {
      const newFiles = [...prev]
      URL.revokeObjectURL(newFiles[index].preview)
      newFiles.splice(index, 1)
      onFilesSelected(newFiles.map(f => f.file))
      return newFiles
    })
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2">
        {selectedFiles.map((item, index) => (
          <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
            <img src={item.preview} alt="" className="w-full h-full object-cover" />
            <button
              onClick={() => removeFile(index)}
              className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/60 flex items-center justify-center text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}

        {selectedFiles.length < maxFiles && (
          <button
            onClick={() => fileInputRef.current?.click()}
            className="aspect-square rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center gap-1 hover:border-primary/50 transition-colors"
          >
            <Plus className="w-6 h-6 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Add</span>
          </button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*"
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />

      <p className="text-xs text-muted-foreground text-center">
        {selectedFiles.length}/{maxFiles} files selected
      </p>
    </div>
  )
}
