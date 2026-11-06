
import { useRef, useState } from "react";

import {
  UploadCloud,
  FileText,
  X,
  CheckCircle,
  AlertCircle,
  LoaderCircle,
  Brain,
  Code,
  FileSearch,
  Sparkles,
  Lightbulb,
  Target,
} from "lucide-react";

import api from "../services/api";

function Resume() {
  const fileInputRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  const [error, setError] = useState("");
  const [aiError, setAiError] = useState("");

  const [analysis, setAnalysis] = useState(null);
  const [aiAnalysis, setAiAnalysis] = useState(null);

  // Validate the selected PDF file
  const validateFile = (file) => {
    if (!file) return false;

    if (
      file.type !== "application/pdf" &&
      !file.name.toLowerCase().endsWith(".pdf")
    ) {
      setError("Please select a PDF file.");
      return false;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("File size cannot exceed 5 MB.");
      return false;
    }

    setError("");
    setAiError("");
    setAnalysis(null);
    setAiAnalysis(null);
    setSelectedFile(file);

    return true;
  };

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (file) {
      validateFile(file);
    }

    // Allows selecting the same file again
    event.target.value = "";
  };

  // Handle drag and drop
  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files?.[0];

    if (file) {
      validateFile(file);
    }
  };

  // Remove selected file
  const removeFile = () => {
    setSelectedFile(null);
    setAnalysis(null);
    setAiAnalysis(null);
    setError("");
    setAiError("");
    setAiLoading(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Send extracted resume text to Gemini
  const runAIAnalysis = async (extractedText) => {
    if (!extractedText || typeof extractedText !== "string") {
      setAiError(
        "Resume text was not extracted correctly. Please upload your PDF again."
      );
      return;
    }

    try {
      setAiLoading(true);
      setAiError("");
      setAiAnalysis(null);

      const response = await api.post("/resume/ai-analyze", {
        extractedText,
      });

      if (!response.data.success || !response.data.analysis) {
        throw new Error(
          response.data.message || "AI resume analysis failed."
        );
      }

      setAiAnalysis(response.data.analysis);
    } catch (err) {
      console.error("AI resume analysis error:", err);

      setAiError(
        err.response?.data?.message ||
          err.message ||
          "Unable to analyze your resume with AI. Please try again."
      );
    } finally {
      setAiLoading(false);
    }
  };

  // Upload PDF and automatically start Gemini analysis
  const uploadResume = async () => {
    if (!selectedFile) {
      setError("Please select your resume first.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setAiError("");
      setAnalysis(null);
      setAiAnalysis(null);

      const formData = new FormData();
      formData.append("resume", selectedFile);

      // Step 1: Upload PDF and extract text
      const response = await api.post(
        "/resume/analyze",
        formData
      );

      if (!response.data.success) {
        throw new Error(
          response.data.message || "Resume extraction failed."
        );
      }

      // Support both direct response and nested resume response formats
      const resumeData = response.data.resume || response.data;

      if (resumeData.extractedText) {
        localStorage.setItem(
          "careerpilot_resume_text",
          resumeData.extractedText
        );
      }

      setAnalysis(resumeData);

      // Step 2: Send extracted text to Gemini
      await runAIAnalysis(resumeData.extractedText);
    } catch (err) {
      console.error("Resume upload error:", err);

      setError(
        err.response?.data?.message ||
          err.message ||
          "Unable to connect to the server. Please check that your backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (!bytes) return "0 KB";
    return `${(bytes / 1024).toFixed(1)} KB`;
  };

  // Reusable list renderer
  const renderList = (items, emptyMessage = "No information available.") => {
    if (!items || items.length === 0) {
      return (
        <p className="text-sm text-slate-500">{emptyMessage}</p>
      );
    }

    return (
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex items-start gap-3 text-sm leading-6 text-slate-600"
          >
            <CheckCircle className="mt-1 h-4 w-4 shrink-0 text-green-600" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">

      {/* Page heading */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          My Resume
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Upload your resume and let CareerPilot AI analyze your
          professional profile.
        </p>
      </div>

      {/* Upload card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Upload your resume
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Upload a PDF file up to 5 MB.
          </p>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf,.pdf"
          onChange={handleFileChange}
          className="hidden"
        />

        {!selectedFile ? (
          <div
            onDragOver={(event) => {
              event.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition sm:p-12 ${
              isDragging
                ? "border-indigo-500 bg-indigo-50"
                : "border-slate-300 bg-slate-50 hover:border-indigo-400 hover:bg-indigo-50/50"
            }`}
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100">
              <UploadCloud className="h-7 w-7 text-indigo-600" />
            </div>

            <h3 className="mt-4 font-semibold text-slate-800">
              Drag and drop your resume here
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              or click to browse your files
            </p>

            <p className="mt-3 text-xs text-slate-400">
              PDF only · Maximum file size 5 MB
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-red-100">
                <FileText className="h-6 w-6 text-red-600" />
              </div>

              <div className="min-w-0">
                <p className="truncate font-medium text-slate-800">
                  {selectedFile.name}
                </p>

                <p className="text-sm text-slate-500">
                  {formatFileSize(selectedFile.size)}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={removeFile}
              disabled={loading}
              className="flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-600 hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              <X size={16} />
              Remove
            </button>
          </div>
        )}

        {/* Upload error */}
        {error && (
          <div className="mt-4 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {/* Upload button */}
        <div className="mt-6">
          <button
            type="button"
            onClick={uploadResume}
            disabled={!selectedFile || loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300 sm:w-auto"
          >
            {loading ? (
              <>
                <LoaderCircle className="h-5 w-5 animate-spin" />
                {aiLoading
                  ? "Gemini is analyzing..."
                  : "Processing Resume..."}
              </>
            ) : (
              <>
                <Brain className="h-5 w-5" />
                Analyze Resume
              </>
            )}
          </button>
        </div>
      </div>

      {/* PDF extraction results */}
      {analysis && (
        <div className="space-y-6">

          <div className="rounded-2xl border border-green-200 bg-green-50 p-5">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-6 w-6 text-green-600" />

              <div>
                <h2 className="font-semibold text-green-800">
                  Resume processed successfully!
                </h2>

                <p className="text-sm text-green-700">
                  CareerPilot AI extracted your resume information.
                </p>
              </div>
            </div>
          </div>

          {/* Resume overview */}
          <div className="grid gap-4 sm:grid-cols-3">

            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <FileText className="mb-3 h-6 w-6 text-indigo-600" />
              <p className="text-sm text-slate-500">Pages</p>

              <p className="mt-1 text-2xl font-bold text-slate-900">
                {analysis.totalPages ?? 0}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <Code className="mb-3 h-6 w-6 text-indigo-600" />
              <p className="text-sm text-slate-500">Detected skills</p>

              <p className="mt-1 text-2xl font-bold text-slate-900">
                {analysis.detectedSkills?.length ?? 0}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <FileSearch className="mb-3 h-6 w-6 text-indigo-600" />
              <p className="text-sm text-slate-500">Extracted text</p>

              <p className="mt-1 text-2xl font-bold text-slate-900">
                {analysis.extractedText?.length?.toLocaleString() ?? 0}
              </p>

              <p className="text-xs text-slate-400">Characters</p>
            </div>
          </div>

          {/* Detected skills */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-slate-900">
              Detected technical skills
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Skills identified using the current backend skill-matching list.
            </p>

            {analysis.detectedSkills?.length > 0 ? (
              <div className="mt-5 flex flex-wrap gap-2">
                {analysis.detectedSkills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-sm font-medium text-indigo-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-sm text-slate-500">
                No skills from the current detection list were found.
              </p>
            )}
          </div>

          {/* Extracted resume text */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-slate-900">
              Extracted resume text
            </h2>

            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-indigo-600 hover:text-indigo-700">
                View extracted text
              </summary>

              <pre className="mt-4 max-h-96 overflow-auto whitespace-pre-wrap break-words rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                {analysis.extractedText}
              </pre>
            </details>
          </div>
        </div>
      )}

      {/* Gemini loading */}
      {aiLoading && (
        <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-6">
          <div className="flex items-center gap-4">
            <LoaderCircle className="h-7 w-7 animate-spin text-indigo-600" />

            <div>
              <h2 className="font-semibold text-slate-900">
                Gemini is analyzing your resume...
              </h2>

              <p className="mt-1 text-sm text-slate-600">
                Evaluating your experience, skills, ATS compatibility,
                and career opportunities.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Gemini error */}
      {aiError && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />

            <div>
              <h3 className="font-semibold text-red-800">
                AI analysis could not be completed
              </h3>

              <p className="mt-1 text-sm text-red-700">
                {aiError}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Gemini AI analysis */}
      {aiAnalysis && (
        <div className="space-y-6">

          {/* AI heading */}
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100">
              <Sparkles className="h-6 w-6 text-indigo-600" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900">
                AI Resume Analysis
              </h2>

              <p className="text-sm text-slate-500">
                Powered by Google Gemini
              </p>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h3 className="mb-3 font-semibold text-slate-900">
              Professional Summary
            </h3>

            <p className="text-sm leading-7 text-slate-600">
              {aiAnalysis.professionalSummary}
            </p>

            <div className="mt-4">
              <span className="rounded-full bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700">
                {aiAnalysis.experienceLevel}
              </span>
            </div>
          </div>

          {/* Key Strengths */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h3 className="mb-4 flex items-center gap-2 font-semibold text-slate-900">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Key Strengths
            </h3>

            {renderList(aiAnalysis.keyStrengths)}
          </div>

          {/* Technical Skills */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h3 className="mb-4 flex items-center gap-2 font-semibold text-slate-900">
              <Code className="h-5 w-5 text-indigo-600" />
              Technical Skills
            </h3>

            {aiAnalysis.technicalSkills?.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {aiAnalysis.technicalSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500">
                No technical skills were identified.
              </p>
            )}
          </div>

          {/* Resume Improvements */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h3 className="mb-5 flex items-center gap-2 font-semibold text-slate-900">
              <Lightbulb className="h-5 w-5 text-amber-500" />
              Resume Improvements
            </h3>

            {aiAnalysis.resumeImprovements?.length > 0 ? (
              <div className="space-y-5">
                {aiAnalysis.resumeImprovements.map((item, index) => (
                  <div
                    key={index}
                    className="border-b border-slate-100 pb-5 last:border-0 last:pb-0"
                  >
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                      <h4 className="font-semibold text-slate-800">
                        {item.section}
                      </h4>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          item.priority?.toLowerCase() === "high"
                            ? "bg-red-50 text-red-700"
                            : item.priority?.toLowerCase() === "medium"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {item.priority} Priority
                      </span>
                    </div>

                    <p className="text-sm leading-6 text-slate-600">
                      <strong>Issue:</strong> {item.issue}
                    </p>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      <strong>Recommendation:</strong>{" "}
                      {item.recommendation}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500">
                No resume improvements were returned.
              </p>
            )}
          </div>

          {/* Missing Information */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h3 className="mb-4 font-semibold text-slate-900">
              Missing or Unclear Information
            </h3>

            {renderList(
              aiAnalysis.missingOrUnclearInformation
            )}
          </div>

          {/* ATS Suggestions */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h3 className="mb-4 flex items-center gap-2 font-semibold text-slate-900">
              <Target className="h-5 w-5 text-indigo-600" />
              ATS Optimization Suggestions
            </h3>

            {renderList(aiAnalysis.atsSuggestions)}
          </div>

          {/* Career Recommendations */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h3 className="mb-4 font-semibold text-slate-900">
              Career Recommendations
            </h3>

            {renderList(aiAnalysis.careerRecommendations)}
          </div>

          {/* Overall Assessment */}
          <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-6">
            <h3 className="mb-3 font-semibold text-slate-900">
              Overall Assessment
            </h3>

            <p className="text-sm leading-7 text-slate-700">
              {aiAnalysis.overallAssessment}
            </p>
          </div>
        </div>
      )}

      {/* Feature information */}
      {!analysis && (
        <div className="rounded-2xl border border-indigo-100 bg-indigo-50/60 p-6">
          <div className="flex items-center gap-3">
            <Brain className="h-6 w-6 text-indigo-600" />

            <h2 className="font-semibold text-slate-900">
              What CareerPilot AI will analyze
            </h2>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {[
              "Technical skills and technologies",
              "Professional experience",
              "Education and certifications",
              "Resume-to-job compatibility",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 text-sm text-slate-600"
              >
                <CheckCircle className="h-4 w-4 shrink-0 text-indigo-600" />
                {item}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Resume;
