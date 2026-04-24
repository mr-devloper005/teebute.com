"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Camera, CheckCircle2, ChevronRight, ImagePlus, Info, Lightbulb, Lock, Plus, Save, ShieldCheck, Tag } from "lucide-react";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { Footer } from "@/components/shared/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/lib/auth-context";
import { CATEGORY_OPTIONS } from "@/lib/categories";
import { SITE_CONFIG, type TaskKey } from "@/lib/site-config";
import { addLocalPost } from "@/lib/local-posts";

type Field = {
  key: string;
  label: string;
  type:
    | "text"
    | "textarea"
    | "url"
    | "number"
    | "tags"
    | "images"
    | "highlights"
    | "category"
    | "file";
  placeholder?: string;
  required?: boolean;
};

const FORM_CONFIG: Record<TaskKey, { title: string; description: string; fields: Field[] }> = {
  listing: {
    title: "Create Business Listing",
    description: "Add a local-only listing with business details.",
    fields: [
      { key: "title", label: "Listing title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Full description", type: "textarea", required: true },
      { key: "category", label: "Category", type: "category", required: true },
      { key: "location", label: "Location", type: "text" },
      { key: "address", label: "Address", type: "text" },
      { key: "website", label: "Website URL", type: "url" },
      { key: "email", label: "Business email", type: "text" },
      { key: "phone", label: "Phone", type: "text" },
      { key: "logo", label: "Logo URL", type: "url" },
      { key: "images", label: "Gallery images", type: "images" },
      { key: "highlights", label: "Highlights", type: "highlights" },
    ],
  },
  classified: {
    title: "Create Classified",
    description: "Add a local-only classified ad.",
    fields: [
      { key: "title", label: "Ad title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Ad details", type: "textarea", required: true },
      { key: "category", label: "Category", type: "category", required: true },
      { key: "location", label: "Location", type: "text" },
      { key: "address", label: "Address", type: "text" },
      { key: "website", label: "Website URL", type: "url" },
      { key: "email", label: "Business email", type: "text" },
      { key: "phone", label: "Phone", type: "text" },
      { key: "images", label: "Images", type: "images" },
      { key: "highlights", label: "Highlights", type: "highlights" },
    ],
  },
  article: {
    title: "Create Article",
    description: "Write a local-only article post.",
    fields: [
      { key: "title", label: "Article title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Article content (HTML allowed)", type: "textarea", required: true },
      { key: "category", label: "Category", type: "category", required: true },
      { key: "images", label: "Cover images", type: "images" },
      { key: "tags", label: "Tags", type: "tags" },
    ],
  },
  image: {
    title: "Create Image Share",
    description: "Share image-only content locally.",
    fields: [
      { key: "title", label: "Image title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Caption", type: "textarea" },
      { key: "category", label: "Category", type: "category" },
      { key: "images", label: "Images", type: "images", required: true },
      { key: "tags", label: "Tags", type: "tags" },
    ],
  },
  profile: {
    title: "Create Profile",
    description: "Create a local-only business profile.",
    fields: [
      { key: "brandName", label: "Brand name", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "About the brand", type: "textarea" },
      { key: "website", label: "Website URL", type: "url", required: true },
      { key: "logo", label: "Logo URL", type: "url", required: true },
    ],
  },
  social: {
    title: "Create Social Post",
    description: "Publish a local-only social update.",
    fields: [
      { key: "title", label: "Post title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Post content", type: "textarea", required: true },
      { key: "category", label: "Category", type: "category" },
      { key: "images", label: "Images", type: "images" },
      { key: "tags", label: "Tags", type: "tags" },
    ],
  },
  sbm: {
    title: "Create Bookmark",
    description: "Submit a local-only social bookmark.",
    fields: [
      { key: "title", label: "Bookmark title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Why it’s useful", type: "textarea" },
      { key: "website", label: "Target URL", type: "url", required: true },
      { key: "category", label: "Category", type: "category" },
      { key: "tags", label: "Tags", type: "tags" },
    ],
  },
  pdf: {
    title: "Create PDF Entry",
    description: "Add a local-only PDF resource.",
    fields: [
      { key: "title", label: "PDF title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Description", type: "textarea" },
      { key: "fileUrl", label: "PDF file URL", type: "file", required: true },
      { key: "category", label: "Category", type: "category", required: true },
      { key: "images", label: "Cover image", type: "images" },
    ],
  },
  org: {
    title: "Create Organization",
    description: "Create a local-only organization profile.",
    fields: [
      { key: "brandName", label: "Organization name", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "About the organization", type: "textarea" },
      { key: "website", label: "Website URL", type: "url" },
      { key: "logo", label: "Logo URL", type: "url" },
    ],
  },
  comment: {
    title: "Create Blog Comment",
    description: "Store a local-only blog comment entry.",
    fields: [
      { key: "title", label: "Comment title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Comment body", type: "textarea", required: true },
      { key: "website", label: "Target post URL", type: "url", required: true },
      { key: "category", label: "Category", type: "category" },
    ],
  },
};

export default function CreateTaskPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const params = useParams();
  const taskKey = params?.task as TaskKey;

  const taskConfig = useMemo(
    () => SITE_CONFIG.tasks.find((task) => task.key === taskKey && task.enabled),
    [taskKey]
  );
  const formConfig = FORM_CONFIG[taskKey];

  const [values, setValues] = useState<Record<string, string>>({});
  const [uploadingPdf, setUploadingPdf] = useState(false);

  if (!taskConfig || !formConfig) {
    return (
      <div className="min-h-screen bg-[#f2f4f5] text-[#002f34]">
        <NavbarShell />
        <main className="mx-auto max-w-3xl px-4 py-20 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">
            <Lock className="h-6 w-6 text-[#3a77ff]" />
          </div>
          <h1 className="mt-4 text-2xl font-extrabold">This option isn&apos;t available</h1>
          <p className="mt-2 text-[#406367]">
            The selected category isn&apos;t enabled on this site right now.
          </p>
          <Button className="mt-6 bg-[#3a77ff] hover:bg-[#2f65e0]" asChild>
            <Link href="/">Back to homepage</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const isClassified = taskKey === "classified";
  const requiredFields = formConfig.fields.filter((f) => f.required);
  const filledRequired = requiredFields.filter((f) => values[f.key]).length;
  const progress = requiredFields.length
    ? Math.round((filledRequired / requiredFields.length) * 100)
    : 100;
  const previewImages = (values.images || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 8);

  const sellingTips = isClassified
    ? [
        { icon: Camera, text: "Add at least 4 clear, well-lit photos." },
        { icon: Tag, text: "Use brand, model and year in the title." },
        { icon: Info, text: "Set a fair, realistic price with reason." },
        { icon: ShieldCheck, text: "Meet in safe public places to hand over." },
      ]
    : [
        { icon: Lightbulb, text: "Be specific in your title to stand out." },
        { icon: Camera, text: "Add a high quality cover image." },
        { icon: Info, text: "Keep your summary short and useful." },
        { icon: ShieldCheck, text: "Double-check links and contact details." },
      ];

  const updateValue = (key: string, value: string) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in before creating content.",
      });
      router.push("/login");
      return;
    }

    const missing = formConfig.fields.filter((field) => field.required && !values[field.key]);
    if (missing.length) {
      toast({
        title: "Missing fields",
        description: "Please fill all required fields before saving.",
      });
      return;
    }

    const title = values.title || values.brandName || "Untitled";
    const summary = values.summary || "";
    const contentType = taskConfig.contentType || taskKey;

    const content: Record<string, unknown> = {
      type: contentType,
    };

    if (values.category) content.category = values.category;
    if (values.description) content.description = values.description;
    if (values.website) content.website = values.website;
    if (values.email) content.email = values.email;
    if (values.phone) content.phone = values.phone;
    if (values.address) content.address = values.address;
    if (values.location) content.location = values.location;
    if (values.logo) content.logo = values.logo;
    if (values.fileUrl) content.fileUrl = values.fileUrl;
    if (values.brandName) content.brandName = values.brandName;

    const highlights = values.highlights
      ? values.highlights.split(",").map((item) => item.trim()).filter(Boolean)
      : [];
    if (highlights.length) content.highlights = highlights;

    const tags = values.tags
      ? values.tags.split(",").map((item) => item.trim()).filter(Boolean)
      : [];

    const images = values.images
      ? values.images.split(",").map((item) => item.trim()).filter(Boolean)
      : [];

    const post = addLocalPost({
      task: taskKey,
      title,
      summary,
      authorName: user.name,
      tags,
      content,
      media: images.map((url) => ({ url, type: "IMAGE" })),
      publishedAt: new Date().toISOString(),
    });

    toast({
      title: "Saved locally",
      description: "This post is stored only in your browser.",
    });

    router.push(`/local/${taskKey}/${post.slug}`);
  };

  const inputClass =
    "h-11 rounded-md border border-[#cdd2d3] bg-white text-sm text-[#002f34] placeholder:text-[#7a8989] focus-visible:border-[#3a77ff] focus-visible:ring-2 focus-visible:ring-[#3a77ff]/20";
  const textareaClass =
    "rounded-md border border-[#cdd2d3] bg-white text-sm text-[#002f34] placeholder:text-[#7a8989] focus-visible:border-[#3a77ff] focus-visible:ring-2 focus-visible:ring-[#3a77ff]/20";

  return (
    <div className="min-h-screen bg-[#f2f4f5] text-[#002f34]">
      <NavbarShell />

      <section className="border-b border-[#e0e0e0] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1 text-xs font-medium text-[#406367]">
            <Link href="/" className="hover:text-[#002f34] hover:underline">Home</Link>
            <ChevronRight className="h-3.5 w-3.5 text-[#a0aaab]" />
            <span className="text-[#002f34]">Post your ad</span>
          </nav>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#3a77ff]">
                {taskConfig.label}
              </p>
              <h1 className="mt-1 text-3xl font-extrabold tracking-tight sm:text-4xl">
                {isClassified ? "Post your free ad" : formConfig.title}
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-[#406367]">{formConfig.description}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild className="text-[#406367] hover:text-[#002f34]">
                <Link href="/">
                  <ArrowLeft className="mr-1.5 h-4 w-4" />
                  Cancel
                </Link>
              </Button>
            </div>
          </div>

          <div className="mt-5">
            <div className="flex items-center justify-between text-xs font-semibold text-[#406367]">
              <span>
                {filledRequired} of {requiredFields.length} required filled
              </span>
              <span>{progress}%</span>
            </div>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-[#ebeeef]">
              <div
                className="h-full rounded-full bg-[#3a77ff] transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            <div className="rounded-md border border-[#e0e0e0] bg-white p-6 shadow-sm sm:p-8">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="bg-[#3a77ff] text-white hover:bg-[#3a77ff]">{taskConfig.label}</Badge>
                <Badge variant="outline" className="border-[#cdd2d3] text-[#406367]">
                  Saved on this device
                </Badge>
              </div>

              <h2 className="mt-5 text-lg font-extrabold text-[#002f34]">Include some details</h2>
              <p className="text-sm text-[#406367]">Fields marked with <span className="text-red-500">*</span> are required.</p>

              <div className="mt-6 grid gap-5">
                {formConfig.fields.map((field) => {
                  const isLong = field.type === "textarea";
                  return (
                    <div key={field.key} className="grid gap-2">
                      <Label className="text-sm font-semibold text-[#002f34]">
                        {field.label} {field.required ? <span className="text-red-500">*</span> : null}
                      </Label>
                      {isLong ? (
                        <Textarea
                          rows={5}
                          placeholder={field.placeholder || "Add as much detail as you can…"}
                          value={values[field.key] || ""}
                          onChange={(event) => updateValue(field.key, event.target.value)}
                          className={textareaClass}
                        />
                      ) : field.type === "category" ? (
                        <select
                          value={values[field.key] || ""}
                          onChange={(event) => updateValue(field.key, event.target.value)}
                          className={`${inputClass} px-3`}
                        >
                          <option value="">Select category</option>
                          {CATEGORY_OPTIONS.map((option) => (
                            <option key={option.slug} value={option.slug}>
                              {option.name}
                            </option>
                          ))}
                        </select>
                      ) : field.type === "file" ? (
                        <div className="grid gap-3 rounded-md border border-dashed border-[#cdd2d3] bg-[#f8f9fa] p-4">
                          <Input
                            type="file"
                            accept="application/pdf"
                            onChange={(event) => {
                              const file = event.target.files?.[0];
                              if (!file) return;
                              if (file.type !== "application/pdf") {
                                toast({
                                  title: "Invalid file",
                                  description: "Please upload a PDF file.",
                                });
                                return;
                              }
                              const reader = new FileReader();
                              setUploadingPdf(true);
                              reader.onload = () => {
                                const result = typeof reader.result === "string" ? reader.result : "";
                                updateValue(field.key, result);
                                setUploadingPdf(false);
                                toast({
                                  title: "PDF uploaded",
                                  description: "File is stored locally.",
                                });
                              };
                              reader.readAsDataURL(file);
                            }}
                            className={inputClass}
                          />
                          <Input
                            type="text"
                            placeholder="Or paste a PDF URL"
                            value={values[field.key] || ""}
                            onChange={(event) => updateValue(field.key, event.target.value)}
                            className={inputClass}
                          />
                          {uploadingPdf ? (
                            <p className="text-xs text-[#406367]">Uploading PDF…</p>
                          ) : null}
                        </div>
                      ) : (
                        <Input
                          type={field.type === "number" ? "number" : "text"}
                          placeholder={
                            field.type === "images" || field.type === "tags" || field.type === "highlights"
                              ? "Separate multiple values with commas"
                              : field.placeholder
                          }
                          value={values[field.key] || ""}
                          onChange={(event) => updateValue(field.key, event.target.value)}
                          className={inputClass}
                        />
                      )}
                      {field.type === "images" ? (
                        <p className="text-xs text-[#406367]">
                          Paste image URLs separated by commas. The first image becomes your cover photo.
                        </p>
                      ) : null}
                    </div>
                  );
                })}
              </div>

              {previewImages.length ? (
                <div className="mt-6 rounded-md border border-[#e0e0e0] bg-[#f8f9fa] p-4">
                  <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#002f34]">
                    <ImagePlus className="h-4 w-4 text-[#3a77ff]" />
                    Photo preview ({previewImages.length})
                  </div>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {previewImages.map((url, i) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={`${url}-${i}`}
                        src={url}
                        alt={`Preview ${i + 1}`}
                        className="h-24 w-full rounded-md border border-[#e0e0e0] bg-white object-cover"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.opacity = "0.4";
                        }}
                      />
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            <div className="sticky bottom-0 z-10 -mx-4 border-t border-[#e0e0e0] bg-white px-4 py-4 shadow-[0_-4px_12px_rgba(0,0,0,0.04)] sm:rounded-md sm:border sm:px-6 sm:py-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-[#406367]">
                  By posting, you agree to our{" "}
                  <Link href="/terms" className="font-semibold text-[#3a77ff] hover:underline">
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="font-semibold text-[#3a77ff] hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" asChild className="border-[#cdd2d3] text-[#002f34] hover:bg-[#ebeeef]">
                    <Link href={taskConfig.route}>
                      View {taskConfig.label}
                      <Plus className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    className="bg-[#3a77ff] font-bold text-white hover:bg-[#2f65e0]"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    {isClassified ? "Post my ad" : "Save locally"}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-md border border-[#e0e0e0] bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-[#3a77ff]" />
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#406367]">
                  Tips for a great ad
                </h3>
              </div>
              <ul className="mt-4 space-y-3">
                {sellingTips.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-start gap-3 text-sm leading-6 text-[#002f34]">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#ebeeef] text-[#3a77ff]">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-md border border-[#bfe6d2] bg-[#f1faf6] p-5">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-5 w-5 text-[#1c8a55]" />
                <div>
                  <h3 className="text-sm font-bold text-[#0c5b39]">Safe selling</h3>
                  <p className="mt-1 text-sm leading-6 text-[#0c5b39]/80">
                    Never share OTPs or banking passwords. Real buyers never need them.
                  </p>
                  <Link href="/help" className="mt-3 inline-flex items-center text-sm font-bold text-[#0c5b39] hover:underline">
                    Read safety tips →
                  </Link>
                </div>
              </div>
            </div>

            <div className="rounded-md border border-[#e0e0e0] bg-[#002f34] p-5 text-white">
              <CheckCircle2 className="h-5 w-5 text-[#7fd0a8]" />
              <h3 className="mt-2 text-sm font-bold">Free to post</h3>
              <p className="mt-1 text-sm leading-6 text-white/80">
                There&apos;s no fee to publish a classified — pay only if you choose to feature your ad.
              </p>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
