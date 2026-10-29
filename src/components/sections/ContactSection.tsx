
"use client";

import React, { useState } from "react";
import { useForm, ValidationError } from "@formspree/react";
import {
  Mail,
  Phone,
  Copy,
  Check,
  Send,
  Download,
  FileText,
  Clock,
  Globe,
  ExternalLink,
} from "lucide-react";
import { LinkedInIcon, GitHubIcon } from "@/components/ui/BrandIcons";
import { PersonalInfo } from "@/types/portfolio";
import { getAssetPath } from "@/utils/basePath";

interface ContactSectionProps {
  onOpenCoverLetter?: () => void;
  personalInfo?: PersonalInfo;
}

interface ContactFormProps {
  formKey: number;
  onClear: () => void;
}

/**
 * Separate form component in the same file.
 * Remounting this component resets Formspree's success state.
 */
function FormspreeContactForm({
  formKey,
  onClear,
}: ContactFormProps) {
  const [state, handleSubmit] = useForm("xqpppedy");

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  if (state.succeeded) {
    return (
      <div
        role="status"
        className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-6 text-center space-y-3"
      >
        <Check className="w-9 h-9 text-emerald-500 mx-auto" />

        <h4 className="font-bold text-zinc-900 dark:text-white">
          Message Sent Successfully!
        </h4>

        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Thank you for reaching out. I will get back to you soon.
        </p>

        <button
          type="button"
          onClick={onClear}
          className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
        >
          Clear form
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor={`contact-name-${formKey}`}
            className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5"
          >
            Your Name
          </label>

          <input
            id={`contact-name-${formKey}`}
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Sarah Jenkins"
            autoComplete="name"
            required
            className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div>
          <label
            htmlFor={`contact-company-${formKey}`}
            className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5"
          >
            Company / Organization
          </label>

          <input
            id={`contact-company-${formKey}`}
            type="text"
            name="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="e.g. Careem or Tech Corp"
            autoComplete="organization"
            className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor={`contact-email-${formKey}`}
          className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5"
        >
          Email Address
        </label>

        <input
          id={`contact-email-${formKey}`}
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          autoComplete="email"
          required
          className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-emerald-500"
        />

        <ValidationError
          prefix="Email"
          field="email"
          errors={state.errors}
          className="mt-1 text-xs text-red-500"
        />
      </div>

      <div>
        <label
          htmlFor={`contact-message-${formKey}`}
          className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5"
        >
          Opportunity or Message
        </label>

        <textarea
          id={`contact-message-${formKey}`}
          name="message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell me about the role, project, or collaboration..."
          required
          className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-emerald-500 resize-none"
        />

        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
          className="mt-1 text-xs text-red-500"
        />
      </div>

      <input
        type="hidden"
        name="_subject"
        value={`Portfolio inquiry from ${name.trim().length > 0 ? name : "a visitor"}${company ? ` at ${company}` : ""}`}
      />

      <ValidationError
        errors={state.errors}
        className="text-sm text-red-500"
      />

      <button
        type="submit"
        disabled={state.submitting}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 transition-all"
      >
        {state.submitting ? (
          <>
            <Clock className="w-4 h-4 animate-spin" />
            <span>Sending Message...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            <span>Send Message to Hammad</span>
          </>
        )}
      </button>

      <p className="text-[11px] text-zinc-500 dark:text-zinc-400 text-center">
        Your message will be submitted through Formspree.
      </p>
    </form>
  );
}

export function ContactSection({
  onOpenCoverLetter,
  personalInfo,
}: ContactSectionProps) {
  if (!personalInfo) return null;
  const info = personalInfo;
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formKey, setFormKey] = useState(0);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(info.email);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2000);
    } catch (error) {
      console.error("Failed to copy email:", error);
    }
  };

  const handleCopyPhone = async () => {
    try {
      await navigator.clipboard.writeText(info.phone);
      setCopiedPhone(true);
      window.setTimeout(() => setCopiedPhone(false), 2000);
    } catch (error) {
      console.error("Failed to copy phone:", error);
    }
  };

  const handleClearForm = () => {
    setFormKey((previousKey) => previousKey + 1);
  };

  return (
    <section
      id="contact"
      className="py-20 relative bg-zinc-50/50 dark:bg-zinc-900/30 border-t border-zinc-200 dark:border-zinc-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
            <Mail className="w-3.5 h-3.5" />
            <span>Ready to Connect</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 dark:text-white">
            Let&apos;s Build Something Exceptional
          </h2>

          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            Currently interviewing for Senior Android Engineer roles.
            Available for remote positions with global timezone flexibility
            (GMT+3 / GMT+5 / EU / US).
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Contact Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                Contact Channels
              </h3>

              {/* Email */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                    <Mail className="w-4 h-4" />
                  </div>

                  <div>
                    <div className="text-[10px] text-zinc-400 uppercase font-mono">
                      Email Address
                    </div>

                    <a
                      href={`mailto:${info.email}`}
                      className="text-xs sm:text-sm font-semibold text-zinc-800 dark:text-zinc-200 hover:text-emerald-500 transition break-all"
                    >
                      {info.email}
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-500 transition"
                  title="Copy email"
                  aria-label="Copy email address"
                >
                  {copiedEmail ? (
                    <Check className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Phone / WhatsApp */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                    <Phone className="w-4 h-4" />
                  </div>

                  <div>
                    <div className="text-[10px] text-zinc-400 uppercase font-mono">
                      Phone / WhatsApp
                    </div>

                    <a
                      href={info.whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs sm:text-sm font-semibold text-zinc-800 dark:text-zinc-200 hover:text-emerald-500 transition"
                    >
                      {info.phoneDisplay}
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyPhone}
                  className="p-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-500 transition"
                  title="Copy phone"
                  aria-label="Copy phone number"
                >
                  {copiedPhone ? (
                    <Check className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* LinkedIn and GitHub */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <a
                  href={info.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 hover:border-blue-500/50 flex items-center justify-between group transition"
                >
                  <div className="flex items-center gap-2">
                    <LinkedInIcon className="w-4 h-4 text-blue-500" />
                    <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                      LinkedIn
                    </span>
                  </div>

                  <ExternalLink className="w-3.5 h-3.5 text-zinc-400 group-hover:text-blue-500" />
                </a>

                <a
                  href={info.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 hover:border-zinc-400 flex items-center justify-between group transition"
                >
                  <div className="flex items-center gap-2">
                    <GitHubIcon className="w-4 h-4 text-zinc-700 dark:text-zinc-200" />
                    <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                      GitHub
                    </span>
                  </div>

                  <ExternalLink className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-200" />
                </a>
              </div>

              {/* Timezone */}
              <div className="p-3.5 rounded-xl bg-emerald-500/5 dark:bg-emerald-950/20 border border-emerald-500/20 space-y-1 text-xs">
                <div className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5" />
                  <span>Timezone Compatibility</span>
                </div>

                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-[11px]">
                  Based in Islamabad (GMT+5). Excellent overlap with Saudi
                  Arabia / GCC (GMT+3, only 2h diff), UK / Europe (4 to 5h
                  diff), and flexible for US East early syncs.
                </p>
              </div>

              {/* Resume & Documents */}
              <div className="pt-2 space-y-2">
                {info.resumeDriveLink && (
                  <a
                    href={info.resumeDriveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition shadow-md shadow-emerald-600/20"
                  >
                    <FileText className="w-4 h-4" />
                    <span>View CV (PDF)</span>
                  </a>
                )}
                {onOpenCoverLetter && (
                  <button
                    type="button"
                    onClick={onOpenCoverLetter}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800 font-semibold text-xs transition cursor-pointer"
                  >
                    <FileText className="w-4 h-4 text-emerald-500" />
                    <span>Read Cover Letter</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-5">
              <div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                  Send an Inquiry or Schedule an Interview
                </h3>

                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                  Fill in your details below to send a message directly
                  through this contact form.
                </p>
              </div>

              <FormspreeContactForm
                key={formKey}
                formKey={formKey}
                onClear={handleClearForm}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
