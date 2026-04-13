import React, { useState, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';

import FormFeedbackModal, { type FormFeedbackVariant } from '@/components/atoms/FormFeedbackModal';
import { EarthCanvas } from '@/components/canvas';
import { config } from '@/constants/config';
import SectionWrapper from './SectionWrapper';
import { slideIn } from '@/shared/animations';
import { Header } from '@/shared/ui';
import { useI18n } from '@/context/I18nContext';

const web3FormsAccessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
const web3FormsEndpoint = 'https://api.web3forms.com/submit';

function fillWeb3Template(template: string, vars: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => vars[key] ?? '');
}

const Contact = () => {
  const { catalog, locale } = useI18n();
  const formRef = useRef<HTMLFormElement | null>(null);
  const initialState = useMemo(
    () => ({
      name: '',
      email: '',
      message: '',
    }),
    []
  );
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{
    variant: FormFeedbackVariant;
    title: string;
    body: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined
  ) => {
    if (e === undefined) return;
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement> | undefined) => {
    if (e === undefined) return;
    e.preventDefault();

    if (!web3FormsAccessKey) {
      setFeedback({
        variant: 'warning',
        title: catalog.contact.feedback.titleConfig,
        body: catalog.contact.alerts.noKey,
      });
      return;
    }

    setLoading(true);

    try {
      const pageUrl = typeof window !== 'undefined' ? window.location.href : '—';
      const vars = {
        name: form.name.trim() || '—',
        email: form.email.trim(),
        message: form.message.trim() || '—',
        pageUrl,
      };
      const { emailNotify } = catalog.contact;
      const mailBody = fillWeb3Template(emailNotify.bodyTemplate, vars);
      const subject = fillWeb3Template(emailNotify.subjectTemplate, vars);

      const response = await fetch(web3FormsEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: web3FormsAccessKey,
          email: form.email,
          message: mailBody,
          subject,
          from_name: emailNotify.fromName,
          replyto: form.email,
        }),
      });

      const payload = (await response.json()) as { success?: boolean; message?: string };
      if (!response.ok || payload.success !== true) {
        throw new Error(payload.message ?? `HTTP ${response.status}`);
      }

      setFeedback({
        variant: 'success',
        title: catalog.contact.feedback.titleSuccess,
        body: catalog.contact.alerts.success,
      });
      setForm(initialState);
    } catch (error) {
      console.error(error);
      const hint = error instanceof Error ? error.message : '';
      setFeedback({
        variant: 'error',
        title: catalog.contact.feedback.titleError,
        body: hint ? `${catalog.contact.alerts.fail}\n\n${hint}` : catalog.contact.alerts.fail,
      });
    } finally {
      setLoading(false);
    }
  };

  const formFields = [
    { key: 'name' as const, ...catalog.contact.form.name },
    { key: 'email' as const, ...catalog.contact.form.email },
    { key: 'message' as const, ...catalog.contact.form.message },
  ];

  return (
    <>
      <FormFeedbackModal
        open={feedback !== null}
        onClose={() => setFeedback(null)}
        variant={feedback?.variant ?? 'success'}
        title={feedback?.title ?? ''}
        dismissLabel={catalog.contact.feedback.dismiss}
      >
        {feedback?.body ?? ''}
      </FormFeedbackModal>

      <div className="mb-12">
        <Header useMotion={false} h2={catalog.contact.h2} />
      </div>

      <div className="mx-auto flex w-full max-w-7xl flex-col-reverse items-stretch gap-10 overflow-hidden xl:mt-2 xl:flex-row xl:items-start">
        <motion.div
          variants={slideIn('left', 'tween', 0.2, 1)}
          className="w-full min-w-0 rounded-[1.75rem] border border-warm-border bg-warm-elevated p-9 shadow-[0_16px_44px_-30px_rgba(0,0,0,0.08)] dark:shadow-[0_18px_48px_-28px_rgba(0,0,0,0.45)] xl:flex-[1.2] xl:px-10"
        >
          <p className="mb-4 text-[15px] leading-relaxed text-warm-muted">{catalog.contact.quickLinksIntro}</p>
          <div className="mb-10 flex flex-wrap gap-3 text-sm">
            <a
              href={`mailto:${config.html.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-warm-studio px-5 py-2.5 font-medium text-warm-studio-fg shadow-sm transition hover:opacity-95"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 shrink-0"
                aria-hidden
              >
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>
              {config.html.email}
            </a>
            <a
              href="https://github.com/Little-Curry-Spicy"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-warm-border bg-warm-page px-5 py-2.5 text-warm-soft transition hover:border-warm-muted hover:text-warm-fg dark:border-warm-border dark:bg-warm-subtle/40 dark:hover:text-warm-fg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 shrink-0"
                aria-hidden
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
              {catalog.hero.githubLabel}
            </a>
            <a
              href={config.links.twitterUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-warm-border bg-warm-page px-5 py-2.5 text-warm-soft transition hover:border-warm-muted hover:text-warm-fg dark:border-warm-border dark:bg-warm-subtle/40 dark:hover:text-warm-fg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4 shrink-0"
                aria-hidden
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              {config.links.twitterLabel}
            </a>
            <span
              className="inline-flex items-center gap-2 rounded-full border border-warm-border bg-warm-page px-5 py-2.5 text-warm-soft dark:border-warm-border dark:bg-warm-subtle/40"
              title={locale === 'zh' ? '加好友请注明来意' : 'Add on WeChat — a short note helps'}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4 shrink-0"
                aria-hidden
              >
                <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.288-8.615-6.288zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 7.105 4.229.896 0 1.74-.104 2.524-.294a.716.716 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.01-.27-.027-.407-.03zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982z" />
              </svg>
              {catalog.hero.wechatLabel}
            </span>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-7">
            {formFields.map(field => {
              const Component = field.key === 'message' ? 'textarea' : 'input';

              return (
                <label key={field.key} className="flex flex-col">
                  <span className="mb-4 font-medium text-warm-soft">{field.span}</span>
                  <Component
                    type={field.key === 'email' ? 'email' : 'text'}
                    name={field.key}
                    value={form[field.key]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className="rounded-2xl border border-warm-border bg-warm-page px-6 py-4 font-medium text-warm-fg outline-hidden placeholder:text-warm-wash focus:border-warm-studio/80"
                    {...(field.key === 'message' && { rows: 7 })}
                  />
                </label>
              );
            })}
            <button
              type="submit"
              className="w-fit rounded-full bg-warm-studio px-8 py-3 font-semibold text-warm-studio-fg shadow-sm outline-hidden transition hover:opacity-95"
            >
              {loading ? catalog.contact.submitting : catalog.contact.submit}
            </button>
          </form>
        </motion.div>

        <motion.div
          variants={slideIn('right', 'tween', 0.2, 1)}
          className="flex w-full min-w-0 items-center justify-center xl:flex-1 xl:justify-center"
        >
          {/* 大屏用接近 1:1 的视口画地球，避免右侧栏过窄、过高时画面像被横向压扁 */}
          <div className="relative mx-auto h-[330px] w-full max-w-[640px] md:h-[520px] xl:aspect-square xl:h-auto xl:w-full xl:max-w-[min(100%,720px)]">
            <EarthCanvas />
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default SectionWrapper(Contact, 'contact');
