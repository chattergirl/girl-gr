import { useState, useRef } from 'react'
import { Plus, Play, Eye, DollarSign, Trash2, X, Image, Film, Loader2 } from 'lucide-react'
import { uploadToCloudinary, isCloudinaryConfigured } from '../../lib/cloudinary'
import type { Profile, Content } from '../../types'

interface StudioPageProps {
  profile: Profile
}

// Mock recent content (last 48 hours)
const mockRecentContent: Content[] = [
  { id: '1', creator_id: '1', media_url: '', preview_url: '', thumbnail_url: '', media_type: 'image', caption: 'New exclusive drop', price: 10, is_free: false, views_count: 245, likes_count: 45, unlocks_count: 18, created_at: new Date().toISOString() },
  { id: '2', creator_id: '1', media_url: '', preview_url: '', thumbnail_url: '', media_type: 'video', caption: 'Behind the scenes', price: 15, is_free: false, views_count: 189, likes_count: 32, unlocks_count: 12, created_at: new Date(Date.now() - 3600000).toISOString() },
  { id: '3', creator_id: '1', media_url: '', preview_url: '', thumbnail_url: '', media_type: 'image', caption: 'Free preview', price: 0, is_free: true, views_count: 567, likes_count: 89, unlocks_count: 0, created_at: new Date(Date.now() - 7200000).toISOString() },
]

export function StudioPage({ profile }: StudioPageProps) {
  const [content, setContent] = useState<Content[]>(mockRecentContent)
  const [showUploadModal, setShowUploadModal] = useState(false)

  const totalEarnings = content.reduce((sum, c) => sum + (c.price * c.unlocks_count), 0)
  const totalViews = content.reduce((sum, c) => sum + c.views_count, 0)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-lg border-b border-border">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground">Studio</h1>
            <p className="text-sm text-muted-foreground">Last 48 hours</p>
          </div>
          <button
            onClick={() => setShowUploadModal(true)}
            className="px-4 py-2 bg-primary text-primary-foreground font-medium rounded-xl flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Upload
          </button>
        </div>
      </header>

      <div className="max-w-lg mx-auto p-4 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 bg-card rounded-xl border border-border">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className="w-4 h-4 text-green-400" />
              <span className="text-sm text-muted-foreground">Earnings</span>
            </div>
            <p className="text-xl font-bold text-foreground">${totalEarnings.toFixed(2)}</p>
          </div>
          <div className="p-4 bg-card rounded-xl border border-border">
            <div className="flex items-center gap-2 mb-1">
              <Eye className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Views</span>
            </div>
            <p className="text-xl font-bold text-foreground">{totalViews.toLocaleString()}</p>
          </div>
        </div>

        {/* Content Grid */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">Recent Content</h2>
          
          {content.length === 0 ? (
            <div className="py-16 text-center">
              <div className="w-16 h-16 rounded-full bg-secondary mx-auto mb-4 flex items-center justify-center">
                <Film className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">No recent content</h3>
              <p className="text-muted-foreground mb-4">Upload your first post to start earning</p>
              <button
                onClick={() => setShowUploadModal(true)}
                className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-xl"
              >
                Upload Now
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {content.map((item) => (
                <ContentCard key={item.id} content={item} />
              ))}
            </div>
          )}
        </div>

        <p className="text-center text-sm text-muted-foreground">
          Content older than 48 hours is removed from Studio but remains available to fans.
        </p>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <UploadModal
          profile={profile}
          onClose={() => setShowUploadModal(false)}
          onSuccess={(newContent) => {
            setContent(prev => [newContent, ...prev])
            setShowUploadModal(false)
          }}
        />
      )}
    </div>
  )
}

interface ContentCardProps {
  content: Content
}

function ContentCard({ content }: ContentCardProps) {
  const earnings = content.price * content.unlocks_count

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      {/* Thumbnail */}
      <div className="relative aspect-square bg-muted">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/10" />
        
        {content.media_type === 'video' && (
          <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center">
            <Play className="w-4 h-4 text-white" />
          </div>
        )}

        {content.is_free && (
          <div className="absolute top-2 left-2 px-2 py-0.5 bg-green-500 rounded text-xs text-white font-medium">
            FREE
          </div>
        )}

        {!content.is_free && (
          <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/50 rounded text-xs text-white font-medium">
            ${content.price}
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="p-3">
        <p className="text-sm text-foreground truncate mb-2">{content.caption || 'No caption'}</p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {content.views_count}
            </span>
            <span className="flex items-center gap-1">
              <DollarSign className="w-3 h-3" />
              {content.unlocks_count}
            </span>
          </div>
          {earnings > 0 && (
            <span className="text-green-400 font-medium">${earnings}</span>
          )}
        </div>
      </div>
    </div>
  )
}

interface UploadModalProps {
  profile: Profile
  onClose: () => void
  onSuccess: (content: Content) => void
}

function UploadModal({ profile, onClose, onSuccess }: UploadModalProps) {
  const [step, setStep] = useState(1)
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image')
  const [isFree, setIsFree] = useState(false)
  const [price, setPrice] = useState('5')
  const [caption, setCaption] = useState('')
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    setFile(selectedFile)
    setMediaType(selectedFile.type.startsWith('video') ? 'video' : 'image')
    
    // Create preview
    const url = URL.createObjectURL(selectedFile)
    setPreview(url)
    setStep(2)
  }

  const handleUpload = async () => {
    if (!file) return
    
    setUploading(true)
    setError(null)

    try {
      let mediaUrl = ''
      
      if (isCloudinaryConfigured) {
        const result = await uploadToCloudinary(file)
        mediaUrl = result.secure_url
      } else {
        // Simulate upload for demo
        await new Promise(resolve => setTimeout(resolve, 1500))
        mediaUrl = preview || ''
      }

      const newContent: Content = {
        id: Date.now().toString(),
        creator_id: profile.id,
        media_url: mediaUrl,
        preview_url: mediaUrl,
        thumbnail_url: mediaUrl,
        media_type: mediaType,
        caption,
        price: isFree ? 0 : parseFloat(price),
        is_free: isFree,
        views_count: 0,
        likes_count: 0,
        unlocks_count: 0,
        created_at: new Date().toISOString(),
      }

      onSuccess(newContent)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-background overflow-y-auto">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-lg border-b border-border">
        <div className="flex items-center justify-between p-4">
          <button onClick={onClose} className="text-foreground">
            <X className="w-6 h-6" />
          </button>
          <h1 className="font-semibold text-foreground">
            {step === 1 && 'Select Media'}
            {step === 2 && 'Content Type'}
            {step === 3 && 'Set Price'}
            {step === 4 && 'Add Details'}
          </h1>
          <div className="w-6" />
        </div>
        {/* Progress */}
        <div className="h-1 bg-secondary">
          <div 
            className="h-full bg-primary transition-all"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      </header>

      <div className="max-w-lg mx-auto p-6">
        {/* Step 1: Select Media */}
        {step === 1 && (
          <div className="space-y-6">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full aspect-square border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center gap-4 hover:border-primary/50 transition-colors"
            >
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                <Plus className="w-8 h-8 text-primary" />
              </div>
              <div className="text-center">
                <p className="font-semibold text-foreground">Tap to upload</p>
                <p className="text-sm text-muted-foreground">Photos or videos</p>
              </div>
            </button>

            <div className="flex items-center gap-4">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 p-4 bg-card border border-border rounded-xl flex items-center gap-3"
              >
                <Image className="w-6 h-6 text-primary" />
                <span className="text-foreground">Photo</span>
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 p-4 bg-card border border-border rounded-xl flex items-center gap-3"
              >
                <Film className="w-6 h-6 text-primary" />
                <span className="text-foreground">Video</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Content Type */}
        {step === 2 && (
          <div className="space-y-6">
            {/* Preview */}
            <div className="aspect-square rounded-2xl bg-card overflow-hidden relative">
              {preview && mediaType === 'image' && (
                <img src={preview} alt="" className="w-full h-full object-cover" />
              )}
              {preview && mediaType === 'video' && (
                <video src={preview} className="w-full h-full object-cover" />
              )}
            </div>

            <div className="space-y-3">
              <button
                onClick={() => { setIsFree(true); setStep(4) }}
                className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                  isFree ? 'border-primary bg-primary/10' : 'border-border'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Eye className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Free Content</p>
                    <p className="text-sm text-muted-foreground">Everyone can view</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => { setIsFree(false); setStep(3) }}
                className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                  !isFree ? 'border-primary bg-primary/10' : 'border-border'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Paid Content</p>
                    <p className="text-sm text-muted-foreground">Fans pay to unlock</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Set Price */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-muted-foreground mb-2">Set your price</p>
              <div className="relative inline-block">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-3xl text-muted-foreground">$</span>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-40 text-center text-4xl font-bold py-4 pl-10 pr-4 bg-card border border-border rounded-2xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  min="1"
                  max="100"
                />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {[3, 5, 10, 20].map((preset) => (
                <button
                  key={preset}
                  onClick={() => setPrice(preset.toString())}
                  className={`py-3 rounded-xl font-semibold transition-colors ${
                    price === preset.toString()
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground'
                  }`}
                >
                  ${preset}
                </button>
              ))}
            </div>

            <p className="text-center text-sm text-muted-foreground">
              You earn 65% (${((parseFloat(price) || 0) * 0.65).toFixed(2)}) per unlock
            </p>

            <button
              onClick={() => setStep(4)}
              className="w-full py-4 bg-primary text-primary-foreground font-semibold rounded-xl"
            >
              Continue
            </button>
          </div>
        )}

        {/* Step 4: Add Details */}
        {step === 4 && (
          <div className="space-y-6">
            {/* Preview */}
            <div className="aspect-video rounded-2xl bg-card overflow-hidden relative">
              {preview && mediaType === 'image' && (
                <img src={preview} alt="" className="w-full h-full object-cover" />
              )}
              {preview && mediaType === 'video' && (
                <video src={preview} className="w-full h-full object-cover" controls />
              )}
              <div className="absolute top-3 left-3">
                {isFree ? (
                  <span className="px-3 py-1 bg-green-500 rounded-full text-xs text-white font-medium">FREE</span>
                ) : (
                  <span className="px-3 py-1 bg-primary rounded-full text-xs text-white font-medium">${price}</span>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Caption</label>
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Write a caption..."
                rows={3}
                className="w-full px-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>

            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-sm text-destructive">
                {error}
              </div>
            )}

            <button
              onClick={handleUpload}
              disabled={uploading}
              className="w-full py-4 bg-primary text-primary-foreground font-semibold rounded-xl disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {uploading && <Loader2 className="w-5 h-5 animate-spin" />}
              {uploading ? 'Uploading...' : 'Post Content'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
