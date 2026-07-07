import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { useNavigate, useBlocker } from 'react-router-dom';
import styled from 'styled-components';
import { useCreatePost } from '../../hooks/useCreatePost';
import RichTextEditor from '../../components/RichTextEditor';

const CATEGORIES = ['Technology', 'Lifestyle', 'Travel', 'Business', 'Economy', 'Sports', 'General'];

const Wrapper = styled.div`
  max-width: 860px;
  margin: 0 auto;
  padding: 2.5rem 1.5rem 5rem;
`;

const PageHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 2rem;
  gap: 1rem;

  @media (max-width: 560px) {
    flex-direction: column;
  }
`;

const PageTitle = styled.h1`
  font-family: var(--font-serif);
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 700;
  color: var(--color-text-primary);
  letter-spacing: -0.02em;
`;

const PageSubtitle = styled.p`
  font-size: 0.875rem;
  color: var(--color-text-muted);
  margin-top: 0.25rem;
`;

const FormGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text-primary);
`;

const Required = styled.span`
  color: #EF4444;
  margin-left: 2px;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.7rem 0.9rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-size: 0.9rem;
  color: var(--color-text-primary);
  background: var(--color-white);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  outline: none;

  &::placeholder { color: var(--color-text-muted); }

  &:focus {
    border-color: var(--color-black);
    box-shadow: 0 0 0 3px rgba(0,0,0,0.06);
  }
`;

const SlugPreview = styled.div`
  padding: 0.6rem 0.9rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-size: 0.8rem;
  color: var(--color-text-muted);
  background: #fafafa;
}`;

const ImageUploadZone = styled.div`
  border: 1.5px dashed var(--color-border);
  border-radius: var(--radius-md);
  padding: 2.5rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s;
  text-align: center;

  &:hover {
    border-color: var(--color-black);
    background: #fafafa;
  }
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const UploadIcon = styled.div`
  font-size: 1.8rem;
  color: var(--color-text-muted);
`;

const UploadLabel = styled.p`
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--color-text-secondary);
`;

const UploadHint = styled.p`
  font-size: 0.75rem;
  color: var(--color-text-muted);
`;

const ImagePreviewWrapper = styled.div`
  position: relative;
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 1px solid var(--color-border);
`;

const ImagePreview = styled.img`
  width: 100%;
  max-height: 260px;
  object-fit: cover;
  display: block;
`;

const RemoveImageBtn = styled.button`
  position: absolute;
  top: 0.6rem;
  right: 0.6rem;
  background: rgba(0, 0, 0, 0.65);
  color: white;
  border: none;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  cursor: pointer;
  font-size: 1rem;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;

  &:hover {
    background: rgba(239, 68, 68, 0.85);
  }
`;

const SectionHeading = styled.h2`
  font-family: var(--font-serif);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-top: 0.5rem;
  margin-bottom: 0.25rem;
`;

const TwoCol = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.7rem 0.9rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-size: 0.9rem;
  color: var(--color-text-primary);
  background: var(--color-white);
  outline: none;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;

  &:focus {
    border-color: var(--color-black);
    box-shadow: 0 0 0 3px rgba(0,0,0,0.06);
  }
`;

const TagsInput = styled.div`
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: 0.5rem 0.75rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  align-items: center;
  background: var(--color-white);
  cursor: text;

  &:focus-within {
    border-color: var(--color-black);
    box-shadow: 0 0 0 3px rgba(0,0,0,0.06);
  }
`;

const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 2px;
  padding: 0.2rem 0.5rem;
  font-size: 0.78rem;
  color: var(--color-text-secondary);
`;

const TagRemove = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-text-muted);
  font-size: 0.8rem;
  line-height: 1;
  padding: 0;

  &:hover { color: #EF4444; }
`;

const TagsInputField = styled.input`
  border: none;
  outline: none;
  flex: 1;
  min-width: 120px;
  font-size: 0.85rem;
  background: transparent;

  &::placeholder { color: var(--color-text-muted); }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
  animation: fadeIn 0.2s ease;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  transform: translateY(0);
  animation: slideUp 0.2s ease;

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const ModalTitle = styled.h3`
  font-family: var(--font-serif);
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
  color: var(--color-black);
`;

const ModalText = styled.p`
  color: var(--color-text-secondary);
  margin-bottom: 1.5rem;
  line-height: 1.5;
  font-size: 0.95rem;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const ModalButton = styled.button<{ $primary?: boolean }>`
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  border: none;
  background: ${props => props.$primary ? '#EF4444' : '#F3F4F6'};
  color: ${props => props.$primary ? 'white' : 'var(--color-black)'};
  transition: opacity 0.2s;

  &:hover {
    background: ${props => props.$primary ? '#DC2626' : '#E5E7EB'};
  }
`;

const AddTagHint = styled.span`
  font-size: 0.75rem;
  color: var(--color-text-muted);
`;

const PublishButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: var(--color-black);
  color: var(--color-white);
  border: none;
  border-radius: var(--radius-sm);
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  transition: opacity 0.2s ease;
  margin-top: 1rem;

  &:hover:not(:disabled) { opacity: 0.85; }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

const ErrorMsg = styled.p`
  font-size: 0.85rem;
  color: #EF4444;
  background: #FEF2F2;
  border: 1px solid #FECACA;
  padding: 0.6rem 0.9rem;
  border-radius: var(--radius-sm);
`;

function CreatePost() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('General');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [imageBase64, setImageBase64] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
 
  const isPublishing = useRef(false);

  /**
   * Converts the selected image file to a Base64 string.
   * The Base64 data URI is stored in MongoDB as the imageUrl field,
   * allowing images to be stored and retrieved without a dedicated file server.
   */
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Guard: only allow images under 5MB
    if (file.size > 5 * 1024 * 1024) {
      alert('Image must be under 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageBase64(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const { submitPost, loading, error } = useCreatePost(() => navigate('/'));

  // Auto-generate a preview slug from the title
  const previewSlug = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');

  const addTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags((prev) => [...prev, trimmed]);
    }
    setTagInput('');
  };

  const handleTagKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    }
  };

  const removeTag = (tag: string) => setTags((prev) => prev.filter((t) => t !== tag));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !content || !author) return;
    
    isPublishing.current = true;
    submitPost({ title, description, content, author, category, tags, imageUrl: imageBase64 || undefined });
  };

  const isValid = title && description && content && author;
  const isDirty = title !== '' || description !== '' || content !== '' || author !== '' || imageBase64 !== '';

  // Block client-side navigation
  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      isDirty && !isPublishing.current && currentLocation.pathname !== nextLocation.pathname
  );

  // Block browser refresh/close 
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty && !isPublishing.current) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  return (
    <Wrapper>
      <PageHeader>
        <div>
          <PageTitle>Create New Blog Post</PageTitle>
          <PageSubtitle>Write and publish content for the blog</PageSubtitle>
        </div>
      </PageHeader>

      <form onSubmit={handleSubmit}>
        <FormGrid>
          {/* Blog Title */}
          <FormGroup>
            <Label htmlFor="title">Blog Title<Required>*</Required></Label>
            <Input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your blog post title..."
              required
            />
          </FormGroup>

          {/* URL Slug */}
          <FormGroup>
            <Label htmlFor="slug">URL Slug<Required>*</Required></Label>
            <Input
              id="slug"
              type="text"
              value={previewSlug}
              readOnly
              placeholder="Your-blog-post-url"
              style={{ background: '#fafafa', color: 'var(--color-text-muted)' }}
            />
            {previewSlug && (
              <SlugPreview>
                Full URL: {window.location.origin}/post/<strong>{previewSlug}-...</strong>
              </SlugPreview>
            )}
          </FormGroup>

          {/* Short Description */}
          <FormGroup>
            <Label htmlFor="description">Short Description<Required>*</Required></Label>
            <Input
              id="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A brief summary of your post"
              required
            />
          </FormGroup>

          {/* Content */}
          <FormGroup>
            <Label>Content<Required>*</Required></Label>
            <RichTextEditor
              value={content}
              onChange={setContent}
              placeholder="Write your full article content here..."
            />
          </FormGroup>

          {/* Image Upload — converts to Base64 and stores in MongoDB */}
          <FormGroup>
            <HiddenFileInput
              ref={fileInputRef}
              type="file"
              accept="image/png, image/jpeg, image/webp"
              onChange={handleImageChange}
            />

            {imageBase64 ? (
              <ImagePreviewWrapper>
                <ImagePreview src={imageBase64} alt="Preview" />
                <RemoveImageBtn
                  type="button"
                  onClick={() => {
                    setImageBase64('');
                    if (fileInputRef.current) fileInputRef.current.value = '';
                  }}
                  aria-label="Remove image"
                >
                  ×
                </RemoveImageBtn>
              </ImagePreviewWrapper>
            ) : (
              <ImageUploadZone onClick={() => fileInputRef.current?.click()}>
                <UploadIcon>↑</UploadIcon>
                <UploadLabel>Upload Image</UploadLabel>
                <UploadHint>PNG, JPEG, WebP · Maximum File Size: 5MB</UploadHint>
                <UploadHint style={{ marginTop: '0.25rem', fontSize: '0.7rem' }}>
                  Click to browse · Leave empty for auto-generated image
                </UploadHint>
              </ImageUploadZone>
            )}
          </FormGroup>

          {/* Author Information */}
          <div>
            <SectionHeading>Author Information</SectionHeading>
          </div>

          <TwoCol>
            <FormGroup>
              <Label htmlFor="author">Author Name<Required>*</Required></Label>
              <Input
                id="author"
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Enter author name"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="category">Category<Required>*</Required></Label>
              <Select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </Select>
            </FormGroup>
          </TwoCol>

          {/* Tags */}
          <FormGroup>
            <Label>Tags</Label>
            <TagsInput>
              {tags.map((tag) => (
                <Tag key={tag}>
                  {tag}
                  <TagRemove type="button" onClick={() => removeTag(tag)}>×</TagRemove>
                </Tag>
              ))}
              <TagsInputField
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                onBlur={addTag}
                placeholder={tags.length === 0 ? 'Add a tag...' : ''}
              />
            </TagsInput>
            <AddTagHint>Press Enter or comma to add a tag</AddTagHint>
          </FormGroup>

          {error && <ErrorMsg>{error.message}</ErrorMsg>}

          <PublishButton type="submit" disabled={loading || !isValid}>
            {loading ? 'Publishing...' : 'Publish'}
          </PublishButton>
        </FormGrid>
      </form>

      {/* Custom Confirmation Modal */}
      {blocker.state === 'blocked' && (
        <ModalOverlay>
          <ModalContent>
            <ModalTitle>Unsaved Changes</ModalTitle>
            <ModalText>
              You have unsaved changes in your blog post. Are you sure you want to leave this page? All your progress will be lost.
            </ModalText>
            <ModalActions>
              <ModalButton onClick={() => blocker.reset()}>
                Keep Editing
              </ModalButton>
              <ModalButton $primary onClick={() => blocker.proceed()}>
                Leave Page
              </ModalButton>
            </ModalActions>
          </ModalContent>
        </ModalOverlay>
      )}
    </Wrapper>
  );
}

export default CreatePost;
