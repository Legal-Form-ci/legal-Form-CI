import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, ArrowLeft, User, Eye, Share2, ThumbsUp } from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { useToast } from "@/hooks/use-toast";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image: string | null;
  category: string | null;
  tags: string[] | null;
  published_at: string | null;
  author_name: string | null;
  views_count: number | null;
}

const defaultImages = [
  '/src/assets/blog/article-1-creation-sarl.jpg',
  '/src/assets/blog/article-2-fiscalite.jpg',
  '/src/assets/blog/article-3-formalites.jpg',
  '/src/assets/blog/article-4-paiement-mobile.jpg',
  '/src/assets/blog/article-5-entrepreneuriat.jpg',
  '/src/assets/blog/article-6-artisans.jpg',
];

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (slug) {
      loadPost();
    }
  }, [slug]);

  const loadPost = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .single();

      if (error) throw error;
      setPost(data as BlogPost);
      
      // Increment views
      if (data) {
        supabase.rpc('increment_blog_views', { post_id: data.id }).then(() => {});
        document.title = `${data.title} | Legal Form SARL`;
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription && data.excerpt) {
          metaDescription.setAttribute('content', data.excerpt);
        }
      }
    } catch (error) {
      console.error('Error loading post:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-muted rounded w-1/4" />
              <div className="h-12 bg-muted rounded w-3/4" />
              <div className="h-64 bg-muted rounded" />
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded" />
                <div className="h-4 bg-muted rounded" />
                <div className="h-4 bg-muted rounded w-5/6" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
            <h1 className="text-4xl font-bold mb-4">Article non trouvé</h1>
            <Link to="/actualites">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour aux actualités
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const coverImage = post.cover_image || defaultImages[Math.abs(post.title.length) % defaultImages.length];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <article className="pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <Link to="/actualites">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour aux actualités
            </Button>
          </Link>

          <header className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              {post.category && <Badge className="bg-primary text-primary-foreground">{post.category}</Badge>}
              {post.published_at && (
                <span className="text-muted-foreground flex items-center gap-1 text-sm">
                  <Calendar className="h-4 w-4" />
                  {new Date(post.published_at).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </span>
              )}
              {post.author_name && (
                <span className="text-muted-foreground flex items-center gap-1 text-sm">
                  <User className="h-4 w-4" />
                  {post.author_name}
                </span>
              )}
              {post.views_count != null && (
                <span className="text-muted-foreground flex items-center gap-1 text-sm">
                  <Eye className="h-4 w-4" />
                  {post.views_count} vue{post.views_count > 1 ? 's' : ''}
                </span>
              )}
            </div>

            {/* Share bar */}
            <div className="flex gap-2 mb-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  toast({ title: "Lien copié !", description: "Le lien de l'article a été copié dans le presse-papier." });
                }}
              >
                <Share2 className="h-4 w-4 mr-1" />
                Partager
              </Button>
            </div>
            
            <h1 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-4 leading-tight">
              {post.title}
            </h1>
            
            {post.excerpt && (
              <p className="text-lg text-muted-foreground italic leading-relaxed">{post.excerpt}</p>
            )}

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {post.tags.map((tag, i) => (
                  <Badge key={i} variant="outline">{tag}</Badge>
                ))}
              </div>
            )}
          </header>

          {/* Cover Image - always shown */}
          <div className="mb-10 rounded-xl overflow-hidden shadow-lg">
            <img
              src={coverImage}
              alt={post.title}
              className="w-full h-auto max-h-[500px] object-cover"
              onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }}
            />
          </div>

          {/* Article Content - Rendered as Markdown with proper WYSIWYG styling */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <ReactMarkdown
              rehypePlugins={[rehypeRaw]}
              components={{
                h1: ({children}) => <h1 className="text-3xl font-bold text-primary mb-6 mt-8 border-b-2 border-primary/30 pb-3">{children}</h1>,
                h2: ({children}) => <h2 className="text-2xl font-semibold text-foreground mb-4 mt-7">{children}</h2>,
                h3: ({children}) => <h3 className="text-xl font-medium text-foreground mb-3 mt-6">{children}</h3>,
                p: ({children}) => <p className="mb-5 leading-relaxed text-foreground/90 text-base">{children}</p>,
                ul: ({children}) => <ul className="list-disc list-inside mb-5 space-y-2 pl-2">{children}</ul>,
                ol: ({children}) => <ol className="list-decimal list-inside mb-5 space-y-2 pl-2">{children}</ol>,
                li: ({children}) => <li className="text-foreground/90">{children}</li>,
                blockquote: ({children}) => (
                  <blockquote className="border-l-4 border-primary pl-5 italic my-6 bg-primary/5 py-4 pr-4 rounded-r-lg">
                    {children}
                  </blockquote>
                ),
                table: ({children}) => (
                  <div className="overflow-x-auto my-6">
                    <table className="w-full border-collapse border border-border rounded-lg">{children}</table>
                  </div>
                ),
                th: ({children}) => <th className="border border-border p-3 bg-muted font-semibold text-left">{children}</th>,
                td: ({children}) => <td className="border border-border p-3">{children}</td>,
                code: ({children, className}) => className ? (
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto my-5">
                    <code className="text-sm font-mono">{children}</code>
                  </pre>
                ) : (
                  <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-primary">{children}</code>
                ),
                hr: () => <hr className="my-8 border-t-2 border-muted" />,
                a: ({href, children}) => (
                  <a href={href} className="text-primary underline hover:text-primary/80 transition-colors" target="_blank" rel="noopener noreferrer">
                    {children}
                  </a>
                ),
                img: ({src, alt}) => (
                  <img src={src} alt={alt || ''} className="max-w-full h-auto rounded-lg my-6 shadow-md" />
                ),
                strong: ({children}) => <strong className="font-bold text-foreground">{children}</strong>,
                em: ({children}) => <em className="italic">{children}</em>,
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPostPage;
