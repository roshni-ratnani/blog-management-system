import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import styled from 'styled-components';

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

const EditorWrapper = styled.div`
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  overflow: hidden;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus-within {
    border-color: var(--color-black);
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.06);
  }
`;

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  gap: 0.15rem;
  padding: 0.45rem 0.6rem;
  border-bottom: 1px solid var(--color-border);
  background: #fafafa;
  flex-wrap: wrap;
`;

const ToolbarBtn = styled.button<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 28px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 0.82rem;
  font-weight: 700;
  font-family: var(--font-sans);
  background: ${({ $active }) => ($active ? '#e0e0e0' : 'transparent')};
  color: ${({ $active }) => ($active ? 'var(--color-black)' : 'var(--color-text-secondary)')};
  transition: background 0.15s, color 0.15s;

  &:hover {
    background: #e8e8e8;
    color: var(--color-black);
  }

  svg {
    width: 14px;
    height: 14px;
    stroke: currentColor;
    fill: none;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
`;

const Divider = styled.div`
  width: 1px;
  height: 18px;
  background: var(--color-border);
  margin: 0 0.25rem;
`;

const StyledEditorContent = styled(EditorContent)`
  .ProseMirror {
    min-height: 220px;
    padding: 0.9rem 1rem;
    font-size: 0.9rem;
    line-height: 1.7;
    color: var(--color-text-primary);
    outline: none;

    p {
      margin-bottom: 0.75rem;
    }

    strong { font-weight: 700; }
    em { font-style: italic; }

    h1, h2, h3 {
      font-family: var(--font-serif);
      font-weight: 700;
      margin-bottom: 0.6rem;
      color: var(--color-text-primary);
    }

    h1 { font-size: 1.6rem; }
    h2 { font-size: 1.3rem; }
    h3 { font-size: 1.1rem; }

    ul, ol {
      padding-left: 1.4rem;
      margin-bottom: 0.75rem;
    }

    li { margin-bottom: 0.25rem; }

    blockquote {
      border-left: 3px solid var(--color-border);
      margin: 0.5rem 0;
      padding: 0.4rem 0.9rem;
      color: var(--color-text-secondary);
      font-style: italic;
    }

    code {
      background: #f3f4f6;
      border-radius: 3px;
      padding: 0.1rem 0.4rem;
      font-family: 'Courier New', monospace;
      font-size: 0.85em;
    }

    pre {
      background: #1e1e1e;
      color: #d4d4d4;
      padding: 0.75rem 1rem;
      border-radius: var(--radius-sm);
      overflow-x: auto;
      margin-bottom: 0.75rem;

      code {
        background: none;
        padding: 0;
        color: inherit;
      }
    }

    /* Placeholder */
    p.is-editor-empty:first-child::before {
      color: var(--color-text-muted);
      content: attr(data-placeholder);
      float: left;
      height: 0;
      pointer-events: none;
    }
  }
`;

/**
 * RichTextEditor wraps TipTap's editor with a custom toolbar.
 * Outputs HTML that is stored as the post content and rendered with dangerouslySetInnerHTML.
 */
function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: { keepMarks: true },
        orderedList: { keepMarks: true },
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        'data-placeholder': placeholder || 'Write your full article content here...',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <EditorWrapper>
      <Toolbar>
        {/* Text style */}
        <ToolbarBtn
          type="button"
          $active={editor.isActive('bold')}
          onClick={() => editor.chain().focus().toggleBold().run()}
          title="Bold (Ctrl+B)"
        >
          <strong>B</strong>
        </ToolbarBtn>

        <ToolbarBtn
          type="button"
          $active={editor.isActive('italic')}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          title="Italic (Ctrl+I)"
        >
          <em>I</em>
        </ToolbarBtn>

        <Divider />

        {/* Headings */}
        <ToolbarBtn
          type="button"
          $active={editor.isActive('heading', { level: 1 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          title="Heading 1"
        >
          H1
        </ToolbarBtn>

        <ToolbarBtn
          type="button"
          $active={editor.isActive('heading', { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          title="Heading 2"
        >
          H2
        </ToolbarBtn>

        <ToolbarBtn
          type="button"
          $active={editor.isActive('heading', { level: 3 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          title="Heading 3"
        >
          H3
        </ToolbarBtn>

        <Divider />

        {/* Lists */}
        <ToolbarBtn
          type="button"
          $active={editor.isActive('bulletList')}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          title="Bullet list"
        >
          <svg viewBox="0 0 24 24"><line x1="9" y1="6" x2="20" y2="6" /><line x1="9" y1="12" x2="20" y2="12" /><line x1="9" y1="18" x2="20" y2="18" /><circle cx="4" cy="6" r="1.5" fill="currentColor" stroke="none" /><circle cx="4" cy="12" r="1.5" fill="currentColor" stroke="none" /><circle cx="4" cy="18" r="1.5" fill="currentColor" stroke="none" /></svg>
        </ToolbarBtn>

        <ToolbarBtn
          type="button"
          $active={editor.isActive('orderedList')}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          title="Numbered list"
        >
          <svg viewBox="0 0 24 24"><line x1="10" y1="6" x2="21" y2="6" /><line x1="10" y1="12" x2="21" y2="12" /><line x1="10" y1="18" x2="21" y2="18" /><path d="M4 6h1v4M4 10h2M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" strokeWidth="1.5" /></svg>
        </ToolbarBtn>

        <Divider />

        {/* Blockquote & Code */}
        <ToolbarBtn
          type="button"
          $active={editor.isActive('blockquote')}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          title="Blockquote"
        >
          ❝
        </ToolbarBtn>

        <ToolbarBtn
          type="button"
          $active={editor.isActive('code')}
          onClick={() => editor.chain().focus().toggleCode().run()}
          title="Inline code"
        >
          {'</>'}
        </ToolbarBtn>

        <Divider />

        {/* Undo / Redo */}
        <ToolbarBtn
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          title="Undo (Ctrl+Z)"
        >
          ↩
        </ToolbarBtn>

        <ToolbarBtn
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          title="Redo (Ctrl+Y)"
        >
          ↪
        </ToolbarBtn>
      </Toolbar>

      <StyledEditorContent editor={editor} />
    </EditorWrapper>
  );
}

export default RichTextEditor;
