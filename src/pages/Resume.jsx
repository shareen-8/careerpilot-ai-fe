
import { useRef, useState } from "react";
import {
  FileText,
  UploadCloud,
  FileCheck2,
  Trash2,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

function Resume() {
  const fileInputRef = useRef(null);
  const [resume, setResume] = useState(null);
  const [error, setError] = useState("");

  const handleFile = (file) => {
    setError("");

    if (!file) return;

    if (file.type !== "application/pdf") {
      setError("Please select a PDF file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("File size must not exceed 5 MB.");
      return;
    }

    setResume(file);
  };

  const handleFileChange = (event) => {
    handleFile(event.target.files[0]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    handleFile(event.dataTransfer.files[0]);
  };

  const removeResume = () => {
    setResume(null);
    setError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatFileSize = (bytes) => {
    return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      {/* Heading */}
      <section>
        <div className="flex items-center gap-2">
          <Sparkles size={19} className="text-indigo-600" />
          <span className="text-sm font-semibold text-indigo-600">
            AI Resume Analyzer
          </span>
        </div>

        <h1 className="mt-2 text-2xl font-bold text-slate-900">
          My Resume
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Upload your resume to prepare for AI-powered career analysis.
        </p>
      </section>

      {/* Upload section */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-slate-900">
            Upload Your Resume
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Upload your latest resume in PDF format.
          </p>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,application/pdf"
          onChange={handleFileChange}
          className="hidden"
        />

        {!resume ? (
          <div
            onDragOver={(event) => event.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className="cursor-pointer rounded-2xl border-2 border-dashed border-indigo-200 bg-indigo-50/40 px-5 py-12 text-center transition hover:border-indigo-400 hover:bg-indigo-50"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
              <UploadCloud size={30} />
            </div>

            <h3 className="mt-5 font-semibold text-slate-800">
              Drag and drop your resume here
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Or click to browse files from your computer
            </p>

            <span className="mt-5 inline-flex rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white">
              Choose PDF File
            </span>

            <p className="mt-4 text-xs text-slate-400">
              PDF format only · Maximum file size 5 MB
            </p>
          </div>
        ) : (
          <div className="flex flex-col justify-between gap-4 rounded-2xl border border-green-200 bg-green-50 p-5 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-green-600">
                <FileCheck2 size={25} />
              </div>

              <div className="min-w-0">
                <p className="break-all text-sm font-semibold text-slate-800">
                  {resume.name}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {formatFileSize(resume.size)} · PDF document
                </p>

                <p className="mt-1 flex items-center gap-1 text-xs font-medium text-green-700">
                  <CheckCircle2 size={13} />
                  File selected successfully
                </p>
              </div>
            </div>

            <button
              onClick={removeResume}
              className="flex items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
            >
              <Trash2 size={16} />
              Remove
            </button>
          </div>
        )}

        {error && (
          <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {error}
          </p>
        )}

        <div className="mt-6 flex items-start gap-3 rounded-xl bg-slate-50 p-4">
          <ShieldCheck
            size={20}
            className="mt-0.5 shrink-0 text-indigo-600"
          />

          <p className="text-xs leading-5 text-slate-600">
            Your resume will be processed by our application after
            backend integration. Do not upload sensitive documents
            until the secure upload workflow is implemented.
          </p>
        </div>
      </section>

      {/* Analysis features */}
      <section>
        <h2 className="mb-4 text-lg font-bold text-slate-900">
          What CareerPilot AI Will Analyze
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {[
            {
              title: "Skills Identification",
              description:
                "Extract technical and professional skills from your resume.",
              icon: Sparkles,
            },
            {
              title: "Experience Analysis",
              description:
                "Identify your work history, responsibilities, and experience.",
              icon: FileText,
            },
            {
              title: "Education & Projects",
              description:
                "Recognize your qualifications, certifications, and projects.",
              icon: FileCheck2,
            },
            {
              title: "Job Compatibility",
              description:
                "Compare your profile against job requirements.",
              icon: CheckCircle2,
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-white p-5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <Icon size={21} />
                </div>

                <h3 className="mt-4 font-semibold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Current development status */}
      <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
        <div className="flex items-center gap-2">
          <Sparkles size={19} className="text-amber-700" />
          <h3 className="font-semibold text-amber-900">
            Resume Analyzer – Development Status
          </h3>
        </div>

        <p className="mt-2 text-sm leading-6 text-amber-800">
          The PDF selection interface is ready. Uploading, extracting
          resume text, and AI analysis will be implemented in the
          backend integration steps.
        </p>
      </section>
    </div>
  );
}

export default Resume;
