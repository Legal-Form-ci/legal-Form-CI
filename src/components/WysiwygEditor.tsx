import { useEffect, useRef } from "react";
import "react-quill/dist/quill.snow.css";

interface Props {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  className?: string;
}

// Lazy-load react-quill so it doesn't break SSR/test envs
let QuillCmp: any = null;

const WysiwygEditor = ({ value, onChange, placeholder, className }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<any>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!QuillCmp) {
        const mod = await import("react-quill");
        QuillCmp = mod.default;
      }
      if (!mounted || !containerRef.current) return;

      const Quill = (await import("quill")).default;
      if (quillRef.current) return;

      const editor = new Quill(containerRef.current, {
        theme: "snow",
        placeholder: placeholder || "Composez votre email…",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }, { background: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ align: [] }],
            ["link", "image", "blockquote"],
            ["clean"],
          ],
        },
      });

      editor.clipboard.dangerouslyPasteHTML(value || "");
      editor.on("text-change", () => {
        const html = (containerRef.current?.querySelector(".ql-editor") as HTMLElement)?.innerHTML || "";
        onChange(html);
      });
      quillRef.current = editor;
    })();
    return () => { mounted = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync external value updates
  useEffect(() => {
    if (!quillRef.current || !containerRef.current) return;
    const current = (containerRef.current.querySelector(".ql-editor") as HTMLElement)?.innerHTML;
    if (current !== value) {
      quillRef.current.clipboard.dangerouslyPasteHTML(value || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div className={className}>
      <div ref={containerRef} style={{ minHeight: 320, background: "white", color: "black" }} />
    </div>
  );
};

export default WysiwygEditor;
